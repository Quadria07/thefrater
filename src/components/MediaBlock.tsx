import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface MediaBlockProps {
  media: {
    type: 'gif' | 'video';
    src: string;
    id: string;
  };
  position: 'left' | 'right' | 'center';
  index: number;
}

export const MediaBlock: React.FC<MediaBlockProps> = ({ media, position, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);

  useEffect(() => {
    if (!containerRef.current || !mediaRef.current) return;

    const element = containerRef.current;
    const mediaElement = mediaRef.current;

    // Initial animation
    gsap.set(element, {
      opacity: 0,
      scale: 0.8,
      rotation: position === 'left' ? -15 : position === 'right' ? 15 : 0
    });

    // Scroll-triggered animation
    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: 'power3.out'
        });
      },
      onLeave: () => {
        gsap.to(element, {
          opacity: 0.3,
          scale: 0.9,
          duration: 1,
          ease: 'power2.out'
        });
      },
      onEnterBack: () => {
        gsap.to(element, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out'
        });
      }
    });

    // Parallax effect
    ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: self => {
        const progress = self.progress;
        gsap.to(mediaElement, {
          y: (progress - 0.5) * 100,
          duration: 0.1
        });
      }
    });

    // Video-specific animations
    if (media.type === 'video' && mediaElement instanceof HTMLVideoElement) {
      ScrollTrigger.create({
        trigger: element,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => mediaElement.play().catch(() => {}),
        onLeave: () => mediaElement.pause(),
        onEnterBack: () => mediaElement.play().catch(() => {}),
        onLeaveBack: () => mediaElement.pause()
      });

      // Scrub video based on scroll
      ScrollTrigger.create({
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: self => {
          if (mediaElement.duration) {
            mediaElement.currentTime = self.progress * mediaElement.duration;
          }
        }
      });
    }

    // Hover effects
    const handleMouseEnter = () => {
      gsap.to(mediaElement, {
        scale: 1.1,
        duration: 0.6,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(mediaElement, {
        scale: 1,
        duration: 0.6,
        ease: 'power2.out'
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [media, position, index]);

  const getSize = () => {
    if (index === 0) return 'w-full max-w-6xl';
    return 'w-full max-w-2xl md:max-w-3xl lg:max-w-4xl';
  };

  return (
    <div
      ref={containerRef}
      className={`
        ${getSize()}
        transform-gpu cursor-pointer
        ${position === 'left' ? 'mr-auto' : ''}
        ${position === 'right' ? 'ml-auto' : ''}
        ${position === 'center' ? 'mx-auto' : ''}
      `}
    >
      {media.type === 'video' ? (
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          src={media.src}
          className="w-full h-auto rounded-2xl shadow-2xl"
          muted
          loop
          playsInline
        />
      ) : (
        <img
          ref={mediaRef as React.RefObject<HTMLImageElement>}
          src={media.src}
          alt={`Animation ${index}`}
          className="w-full h-auto rounded-2xl shadow-2xl"
        />
      )}
    </div>
  );
};