import { useState } from 'react';
import { 
  MessageCircle, 
  Twitter, 
  Github, 
  Youtube, 
  Send, 
  Globe,
  Users,
  X
} from 'lucide-react';

interface SocialLink {
  name: string;
  icon: React.ElementType;
  url: string;
  color: string;
}

const SocialBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const socialLinks: SocialLink[] = [
    { name: 'Discord', icon: MessageCircle, url: 'https://discord.com/invite/NK4qdbv', color: '#5865F2' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/Injective', color: '#1DA1F2' },
    { name: 'GitHub', icon: Github, url: 'https://github.com/InjectiveLabs', color: '#fff' },
    { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/channel/UCN99m0dicoMjNmJV9mxioqQ', color: '#FF0000' },
    { name: 'Telegram', icon: Send, url: 'https://t.me/joininjective', color: '#0088cc' },
    { name: 'Website', icon: Globe, url: 'https://injective.com/', color: '#00F2FE' },
  ];

  const toggleButtonStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: `linear-gradient(135deg, rgba(0, 242, 254, 0.2) 0%, rgba(158, 127, 255, 0.2) 100%)`,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: isExpanded ? '0 8px 30px rgba(0, 242, 254, 0.4)' : '0 4px 20px rgba(0, 242, 254, 0.2)',
    transform: isExpanded ? 'scale(1.05) rotate(90deg)' : 'scale(1) rotate(0deg)',
    position: 'relative',
    padding: '2px',
  };

  const socialButtonStyle = (index: number, link: SocialLink): React.CSSProperties => ({
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: hoveredIndex === index 
      ? `linear-gradient(135deg, ${link.color}30 0%, ${link.color}15 100%)`
      : 'rgba(255, 255, 255, 0.05)',
    border: `1px solid ${hoveredIndex === index ? `${link.color}50` : 'rgba(255, 255, 255, 0.08)'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    transform: hoveredIndex === index ? 'scale(1.15)' : 'scale(1)',
    boxShadow: hoveredIndex === index ? `0 0 20px ${link.color}40` : 'none',
    textDecoration: 'none',
    animation: isExpanded ? `fade-in-up 0.3s ease-out forwards ${index * 0.05}s` : 'none',
    opacity: isExpanded ? 1 : 0,
    padding: '4px',
  });

  const socialContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    padding: isExpanded ? '10px' : '0',
    background: isExpanded 
      ? `linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)`
      : 'transparent',
    backdropFilter: isExpanded ? 'blur(20px)' : 'none',
    WebkitBackdropFilter: isExpanded ? 'blur(20px)' : 'none',
    borderRadius: '20px',
    border: isExpanded ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
    maxHeight: isExpanded ? '350px' : '0',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    opacity: isExpanded ? 1 : 0,
    transform: isExpanded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
    marginBottom: '6px',
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '100px',
      right: '20px',
      zIndex: 90,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '6px',
    }}>
      <div style={socialContainerStyle}>
        {socialLinks.map((link, index) => (
          <div 
            key={link.name}
            style={{ position: 'relative' }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={socialButtonStyle(index, link)}
              title={link.name}
            >
              <link.icon 
                size={16}
                color={hoveredIndex === index ? link.color : 'rgba(255, 255, 255, 0.6)'} 
              />
            </a>
          </div>
        ))}
      </div>
      
      <button
        style={toggleButtonStyle}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? 'Close socials' : 'Open socials'}
      >
        {isExpanded ? (
          <X size={18} color="#00F2FE" style={{ transform: 'rotate(-90deg)' }} />
        ) : (
          <Users size={16} color="#00F2FE" />
        )}
      </button>
    </div>
  );
};

export default SocialBar;
