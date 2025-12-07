import { Trophy, TrendingUp } from 'lucide-react';
import { usePointsStore } from '../store/pointsStore';
import GlassCard from './GlassCard';

const PointsWidget = () => {
  const { points, level } = usePointsStore();
  const pointsToNextLevel = (level * 1000) - points;
  const progress = ((points % 1000) / 1000) * 100;

  return (
    <GlassCard style={{ marginBottom: '20px', padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Trophy size={24} color="#fbbf24" />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>Level {level}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>{points.toLocaleString()} pts</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>Next Level</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#00F2FE', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={14} />
            {pointsToNextLevel} pts
          </div>
        </div>
      </div>
      
      <div style={{
        width: '100%',
        height: '8px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '4px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #00F2FE 0%, #9E7FFF 100%)',
          transition: 'width 0.3s ease',
        }} />
      </div>
    </GlassCard>
  );
};

export default PointsWidget;
