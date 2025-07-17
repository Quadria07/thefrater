import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const footer = footerRef.current;

    // Animate footer entrance
    gsap.set(footer, { opacity: 0, y: 50 });

    ScrollTrigger.create({
      trigger: footer,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(footer, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out'
        });
      }
    });

  }, []);

  const socialLinks = [
    { 
      name: 'X (Twitter)', 
      url: 'https://x.com/artheistlabs',
      icon: <ExternalLink size={16} />
    },
    { 
      name: 'Discord', 
      url: 'https://discord.gg/7rauUTmSYq',
      icon: <MessageCircle size={16} />
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/artheistlabs',
      icon: <ExternalLink size={16} />
    }
  ];

  return (
    <footer 
      ref={footerRef}
      className="py-16 px-4 md:px-8 lg:px-16 border-t border-black border-opacity-10"
    >
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <p className="text-sm opacity-70 mb-4">
            © 2025 artheistlabs all rights reserved.
          </p>
          
          <div className="flex justify-center space-x-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-black hover:opacity-70 transition-opacity duration-300"
              >
                {link.icon}
                <span className="text-sm font-medium">{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};