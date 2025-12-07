import { ReactNode } from 'react';
import GlassCard from './GlassCard';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  change?: number;
}

const StatCard = ({ icon, label, value, change }: StatCardProps) => {
  return (
    <GlassCard style={{ padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.2) 0%, rgba(158, 127, 255, 0.2) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {icon}
        </div>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
            {label}
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
            {value}
          </div>
        </div>
      </div>
      {change !== undefined && (
        <div style={{
          fontSize: '0.85rem',
          color: change >= 0 ? '#10b981' : '#ef4444',
          fontWeight: 600,
        }}>
          {change >= 0 ? '+' : ''}{change.toFixed(2)}%
        </div>
      )}
    </GlassCard>
  );
};

export default StatCard;
