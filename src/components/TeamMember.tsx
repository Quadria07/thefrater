import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

interface TeamMemberProps {
  member: {
    name: string;
    role: string;
    image: string;
  };
  position: 'left' | 'right' | 'center';
  index: number;
}

export const TeamMember: React.FC<TeamMemberProps> = ({ member, position, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current || !infoRef.current) return;

    const container = containerRef.current;
    const image = imageRef.current;
    const info = infoRef.current;

    // Initial state
    gsap.set(container, {
      opacity: 0,
      scale: 0.8,
      rotation: position === 'left' ? -10 : position === 'right' ? 10 : 0
    });

    gsap.set(info, {
      opacity: 0,
      y: 20
    });

    // Scroll-triggered entrance
    ScrollTrigger.create({
      trigger: container,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(container, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: 'power3.out'
        });
      }
    });

    // Hover effects
    const handleMouseEnter = () => {
      const state = Flip.getState(info);
      
      gsap.to(image, {
        scale: 1.1,
        filter: 'grayscale(0%)',
        duration: 0.6,
        ease: 'power2.out'
      });

      gsap.to(info, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      });

      // Flip animation for info positioning
      Flip.from(state, {
        duration: 0.4,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        scale: 1,
        filter: 'grayscale(100%)',
        duration: 0.6,
        ease: 'power2.out'
      });

      gsap.to(info, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    // Parallax effect
    ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: self => {
        const progress = self.progress;
        gsap.to(image, {
          y: (progress - 0.5) * 30,
          rotation: (progress - 0.5) * 5,
          duration: 0.1
        });
      }
    });

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [member, position, index]);

  return (
    <div
      ref={containerRef}
      className={`
        relative w-64 md:w-80 lg:w-96 transform-gpu cursor-pointer
        ${position === 'left' ? 'mr-auto' : ''}
        ${position === 'right' ? 'ml-auto' : ''}
        ${position === 'center' ? 'mx-auto' : ''}
      `}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        <img
          ref={imageRef}
          src={member.image}
          alt={member.name}
          className="w-full h-96 object-cover filter grayscale-100 transition-all duration-300"
        />
        
        <div
          ref={infoRef}
          className="absolute inset-0 bg-black bg-opacity-60 flex items-end p-6"
        >
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
            <p className="text-lg opacity-90">{member.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};