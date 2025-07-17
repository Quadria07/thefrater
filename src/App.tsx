import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { Flip } from 'gsap/Flip';
import { Header } from './components/Header';
import { ParticleSystem } from './components/ParticleSystem';
import { MediaBlock } from './components/MediaBlock';
import { TextBlock } from './components/TextBlock';
import { TeamMember } from './components/TeamMember';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, Flip);

const mediaAssets = [
  {
    type: 'gif',
    src: 'https://www.artheistlabs.com/wp-content/uploads/2025/04/Your-paragraph-text.gif',
    id: 'intro-gif'
  },
  {
    type: 'gif',
    src: 'https://www.artheistlabs.com/wp-content/uploads/2025/04/BALL-ROTATE.gif',
    id: 'ball-rotate'
  },
  {
    type: 'video',
    src: 'https://www.artheistlabs.com/wp-content/uploads/2025/02/Artheist-video.mp4',
    id: 'main-video'
  },
  {
    type: 'gif',
    src: 'https://www.artheistlabs.com/wp-content/uploads/2025/04/Follow-Us-4.gif',
    id: 'follow-us'
  },
  {
    type: 'gif',
    src: 'https://www.artheistlabs.com/wp-content/uploads/2025/04/WEBSITE-ANIMATIONS-13-1.gif',
    id: 'animation-13'
  },
  {
    type: 'gif',
    src: 'https://www.artheistlabs.com/wp-content/uploads/2025/04/WEBSITE-ANIMATIONS-3-1.gif',
    id: 'animation-3'
  },
  {
    type: 'video',
    src: 'https://www.artheistlabs.com/wp-content/uploads/2025/04/0429-3.mp4',
    id: 'video-2'
  },
  {
    type: 'gif',
    src: 'https://www.artheistlabs.com/wp-content/uploads/2025/04/WEBSITE-ANIMATIONS-4-2.gif',
    id: 'animation-4'
  }
];

const textBlocks = [
  {
    id: 'motto',
    content: 'Artheist Labs',
    subtitle: 'We Make Arry\'s NFT',
    size: 'hero'
  },
  {
    id: 'intro-1',
    content: 'Creative powerhouse behind Arry\'s NFT',
    subtitle: 'pioneering innovation at the intersection'
  },
  {
    id: 'intro-2',
    content: 'of art, technology, and blockchain',
    subtitle: 'pushing boundaries of digital experiences'
  },
  {
    id: 'vision-1',
    content: 'NFTs are more than digital assets',
    subtitle: 'they are gateways to creativity'
  },
  {
    id: 'vision-2',
    content: 'ownership, and digital transformation',
    subtitle: 'committed to pushing boundaries'
  },
  {
    id: 'vision-3',
    content: 'of NFT utilities and innovation',
    subtitle: 'at Artheist Labs'
  }
];

const teamMembers = [
  { name: 'Alex Chen', role: 'Creative Director', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Maya Rodriguez', role: 'Lead Developer', image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Jordan Kim', role: 'NFT Strategist', image: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Sam Foster', role: 'Blockchain Expert', image: 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Riley Park', role: 'Art Director', image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400' }
];

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize ScrollSmoother
    smootherRef.current = ScrollSmoother.create({
      wrapper: containerRef.current,
      content: '#smooth-content',
      smooth: 2,
      effects: true,
      normalizeScroll: true
    });

    // Cleanup
    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Create alternating layout with media, text, and team members
  const createLayout = () => {
    const layout = [];
    let mediaIndex = 0;
    let textIndex = 0;
    let teamIndex = 0;

    // Start with hero text
    layout.push({ type: 'text', data: textBlocks[textIndex++], position: 'center' });

    // Alternate between media, text, and team members
    for (let i = 0; i < 20; i++) {
      const rand = Math.random();
      
      if (rand < 0.4 && mediaIndex < mediaAssets.length) {
        // Add media
        layout.push({
          type: 'media',
          data: mediaAssets[mediaIndex++],
          position: i % 2 === 0 ? 'left' : 'right'
        });
      } else if (rand < 0.7 && textIndex < textBlocks.length) {
        // Add text
        layout.push({
          type: 'text',
          data: textBlocks[textIndex++],
          position: i % 3 === 0 ? 'center' : (i % 2 === 0 ? 'left' : 'right')
        });
      } else if (teamIndex < teamMembers.length) {
        // Add team member
        layout.push({
          type: 'team',
          data: teamMembers[teamIndex++],
          position: i % 2 === 0 ? 'right' : 'left'
        });
      }

      // Add remaining media if we've run out of other content
      if (textIndex >= textBlocks.length && teamIndex >= teamMembers.length && mediaIndex < mediaAssets.length) {
        layout.push({
          type: 'media',
          data: mediaAssets[mediaIndex++],
          position: i % 2 === 0 ? 'left' : 'right'
        });
      }
    }

    return layout;
  };

  const layout = createLayout();

  return (
    <div className="bg-white text-black overflow-hidden">
      <Header />
      <ParticleSystem />
      
      <div ref={containerRef} className="smooth-wrapper">
        <div id="smooth-content" className="smooth-content">
          <main className="relative">
            {layout.map((item, index) => (
              <div
                key={`${item.type}-${index}`}
                className={`
                  min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16
                  ${item.position === 'left' ? 'justify-start' : ''}
                  ${item.position === 'right' ? 'justify-end' : ''}
                  ${item.position === 'center' ? 'justify-center' : ''}
                `}
                data-speed={Math.random() * 0.5 + 0.5}
              >
                {item.type === 'media' && (
                  <MediaBlock
                    media={item.data}
                    position={item.position}
                    index={index}
                  />
                )}
                
                {item.type === 'text' && (
                  <TextBlock
                    text={item.data}
                    position={item.position}
                    index={index}
                  />
                )}
                
                {item.type === 'team' && (
                  <TeamMember
                    member={item.data}
                    position={item.position}
                    index={index}
                  />
                )}
              </div>
            ))}
          </main>
          
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;