import { ExternalLink, Star } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import GlassCard from './GlassCard';

interface DappCardProps {
  id: string;
  name: string;
  url: string;
  color: string;
  description: string;
}

const DappCard = ({ id, name, url, color, description }: DappCardProps) => {
  const { togglePinDapp, isPinned } = useAppStore();
  const pinned = isPinned(id);

  const handlePinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    togglePinDapp(id);
  };

  return (
    <GlassCard
      onClick={() => window.open(url, '_blank')}
      style={{
        padding: '16px',
        position: 'relative',
        borderLeft: `3px solid ${color}`,
      }}
    >
      <button
        onClick={handlePinClick}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <Star
          size={16}
          color={pinned ? '#fbbf24' : 'rgba(255, 255, 255, 0.3)'}
          fill={pinned ? '#fbbf24' : 'none'}
        />
      </button>

      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        background: `linear-gradient(135deg, ${color}40 0%, ${color}20 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '12px',
      }}>
        <ExternalLink size={20} color={color} />
      </div>

      <h3 style={{
        fontSize: '1rem',
        fontWeight: 700,
        color: '#fff',
        marginBottom: '4px',
        textAlign: 'left',
      }}>
        {name}
      </h3>

      <p style={{
        fontSize: '0.75rem',
        color: 'rgba(255, 255, 255, 0.6)',
        textAlign: 'left',
        lineHeight: 1.4,
      }}>
        {description}
      </p>
    </GlassCard>
  );
};

export default DappCard;
