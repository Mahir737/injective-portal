import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface EcosystemCardProps {
  name: string;
  icon: LucideIcon;
  url: string;
  color: string;
  description: string;
  delay: number;
  large?: boolean;
  onClick?: () => void;
}

const EcosystemCard = ({ 
  name, 
  icon: Icon, 
  color, 
  description, 
  delay, 
  large,
  onClick 
}: EcosystemCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle: React.CSSProperties = {
    background: `
      linear-gradient(135deg, 
        rgba(255, 255, 255, 0.05) 0%, 
        rgba(255, 255, 255, 0.02) 100%
      )
    `,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: large ? '20px' : '16px',
    border: `1px solid ${isHovered ? `${color}40` : 'rgba(255, 255, 255, 0.08)'}`,
    padding: large ? '20px' : '16px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    animation: `fade-in-up 0.6s ease-out forwards`,
    animationDelay: `${delay}s`,
    opacity: 0,
    transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
    boxShadow: isHovered 
      ? `0 10px 40px ${color}20, 0 0 20px ${color}10`
      : '0 4px 20px rgba(0, 0, 0, 0.2)',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: large ? '12px' : '10px'
  };

  const iconContainerStyle: React.CSSProperties = {
    width: large ? '56px' : '44px',
    height: large ? '56px' : '44px',
    borderRadius: large ? '16px' : '12px',
    background: `linear-gradient(135deg, ${color}25 0%, ${color}10 100%)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: isHovered ? `0 0 30px ${color}30` : 'none'
  };

  const nameStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: large ? '14px' : '11px',
    fontWeight: 600,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 1.2
  };

  const descriptionStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: '10px',
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
    display: large ? 'block' : 'none'
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div style={iconContainerStyle}>
        <Icon size={large ? 28 : 22} color={color} />
      </div>
      <span style={nameStyle}>{name}</span>
      {large && <span style={descriptionStyle}>{description}</span>}
    </div>
  );
};

export default EcosystemCard;
