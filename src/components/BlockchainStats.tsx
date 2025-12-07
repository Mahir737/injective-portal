import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Blocks, 
  CircleDollarSign, 
  Flame,
  Network,
  Wallet
} from 'lucide-react';
import GlassCard from './GlassCard';
import { useBlockchainStats } from '../hooks/useBlockchainStats';

const styles = {
  container: {
    padding: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  statCard: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    padding: '15px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  label: {
    fontSize: '0.9rem',
    color: '#A3A3A3',
    marginBottom: '5px',
  },
  value: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
};

const BlockchainStats = () => {
  const { stats, loading } = useBlockchainStats();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimate(prev => !prev);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const statItems = [
    {
      icon: CircleDollarSign,
      label: 'Market Cap',
      value: stats.marketCap.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }),
      color: '#00F2FE'
    },
    {
      icon: Network,
      label: 'Transactions',
      value: stats.totalTransactions,
      color: '#9E7FFF',
      live: true
    },
    {
      icon: Blocks,
      label: 'Block Height',
      value: stats.blockHeight,
      color: '#f472b6',
      live: true
    },
    {
      icon: BarChart3,
      label: 'Total Value',
      value: stats.totalAssetValue.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }),
      color: '#10b981'
    },
    {
      icon: Wallet,
      label: 'Total Staked',
      value: stats.totalStaked.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }),
      color: '#f59e0b'
    },
    {
      icon: Flame,
      label: 'Total Burned',
      value: stats.totalBurned,
      color: '#ef4444'
    }
  ];

  return (
    <GlassCard style={styles.container}>
      <div style={styles.grid}>
        {statItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} style={styles.statCard}>
              <div style={styles.iconContainer}>
                <Icon size={24} color={item.color} style={{
                  transform: item.live && animate ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.3s ease'
                }} />
              </div>
              <div style={styles.label}>{item.label}</div>
              <div style={styles.value}>{loading ? '...' : item.value}</div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};

export default BlockchainStats;
