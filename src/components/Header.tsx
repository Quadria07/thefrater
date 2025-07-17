import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const Header: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!headerRef.current) return;

    // Animate header appearance
    gsap.fromTo(headerRef.current, 
      { y: -100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        ease: 'power3.out',
        delay: 0.5
      }
    );

    // Header background change on scroll
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top -100',
      end: 'bottom bottom',
      onToggle: self => {
        if (self.isActive) {
          gsap.to(headerRef.current, {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            duration: 0.3
          });
        } else {
          gsap.to(headerRef.current, {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(0px)',
            duration: 0.3
          });
        }
      }
    });

  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 2,
        scrollTo: { y: element, offsetY: 100 },
        ease: 'power3.inOut'
      });
    }
  };

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-16 py-4 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img 
            src="https://www.artheistlabs.com/wp-content/uploads/2025/04/ARTHEIST-LOGO-ANI2.gif"
            alt="Artheist Labs"
            className="h-8 md:h-10 w-auto"
          />
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <button 
            onClick={() => scrollToSection('about')}
            className="text-black hover:opacity-70 transition-opacity duration-300 font-medium tracking-wide"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('team')}
            className="text-black hover:opacity-70 transition-opacity duration-300 font-medium tracking-wide"
          >
            Team
          </button>
        </nav>
      </div>
    </header>
  );
};