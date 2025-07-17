import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

interface TextBlockProps {
  text: {
    id: string;
    content: string;
    subtitle?: string;
    size?: 'hero' | 'normal';
  };
  position: 'left' | 'right' | 'center';
  index: number;
}

export const TextBlock: React.FC<TextBlockProps> = ({ text, position, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current || !titleRef.current) return;

    const container = containerRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;

    // SplitText for title
    let titleSplit: SplitText | null = null;
    let subtitleSplit: SplitText | null = null;

    try {
      titleSplit = new SplitText(title, { type: 'chars,words' });
      if (subtitle) {
        subtitleSplit = new SplitText(subtitle, { type: 'chars,words' });
      }

      // Initial state
      gsap.set(titleSplit.chars, { opacity: 0, y: 100, rotation: 10 });
      if (subtitleSplit) {
        gsap.set(subtitleSplit.chars, { opacity: 0, y: 50, rotation: 5 });
      }

      // Scroll-triggered animation
      ScrollTrigger.create({
        trigger: container,
        start: 'top 70%',
        end: 'bottom 30%',
        onEnter: () => {
          gsap.to(titleSplit!.chars, {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 1.2,
            stagger: {
              amount: 0.8,
              from: 'start'
            },
            ease: 'power3.out'
          });

          if (subtitleSplit) {
            gsap.to(subtitleSplit.chars, {
              opacity: 1,
              y: 0,
              rotation: 0,
              duration: 1,
              stagger: {
                amount: 0.6,
                from: 'start'
              },
              ease: 'power2.out',
              delay: 0.3
            });
          }
        }
      });

      // Parallax effect for text
      ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: self => {
          const progress = self.progress;
          gsap.to(container, {
            y: (progress - 0.5) * 50,
            duration: 0.1
          });
        }
      });

    } catch (error) {
      console.warn('SplitText not available, using fallback animation');
      
      // Fallback animation without SplitText
      gsap.set(container, { opacity: 0, y: 50 });
      
      ScrollTrigger.create({
        trigger: container,
        start: 'top 70%',
        onEnter: () => {
          gsap.to(container, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out'
          });
        }
      });
    }

    return () => {
      if (titleSplit) titleSplit.revert();
      if (subtitleSplit) subtitleSplit.revert();
    };
  }, [text, position, index]);

  const getTextAlign = () => {
    return position === 'center' ? 'text-center' : 
           position === 'right' ? 'text-right' : 'text-left';
  };

  const getMaxWidth = () => {
    return text.size === 'hero' ? 'max-w-6xl' : 'max-w-4xl';
  };

  return (
    <div
      ref={containerRef}
      className={`
        ${getMaxWidth()} w-full px-4 md:px-8 transform-gpu
        ${position === 'left' ? 'mr-auto' : ''}
        ${position === 'right' ? 'ml-auto' : ''}
        ${position === 'center' ? 'mx-auto' : ''}
      `}
    >
      <div className={getTextAlign()}>
        <h2
          ref={titleRef}
          className={`
            font-bold mb-4 leading-tight
            ${text.size === 'hero' 
              ? 'text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-playfair' 
              : 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl'
            }
          `}
        >
          {text.content}
        </h2>
        
        {text.subtitle && (
          <p
            ref={subtitleRef}
            className={`
              opacity-70 leading-relaxed font-light
              ${text.size === 'hero' 
                ? 'text-xl md:text-2xl lg:text-3xl' 
                : 'text-lg md:text-xl lg:text-2xl'
              }
            `}
          >
            {text.subtitle}
          </p>
        )}
      </div>
    </div>
  );
};