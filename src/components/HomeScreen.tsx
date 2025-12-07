import { DollarSign, TrendingUp, Activity, Star } from 'lucide-react';
import { useInjectiveStats } from '../hooks/useInjectiveStats';
import { useAppStore } from '../store/appStore';
import StatCard from './StatCard';
import DappCard from './DappCard';
import PointsWidget from './PointsWidget';

const HomeScreen = () => {
  const stats = useInjectiveStats();
  const { pinnedDapps } = useAppStore();

  const dapps = [
    { id: 'hub', name: 'Injective Hub', url: 'https://hub.injective.network', color: '#00F2FE', description: 'Governance & Staking' },
    { id: 'explorer', name: 'Explorer', url: 'https://explorer.injective.network', color: '#9E7FFF', description: 'Blockchain Explorer' },
    { id: 'bridge', name: 'Bridge', url: 'https://bridge.injective.network', color: '#f472b6', description: 'Cross-chain Bridge' },
    { id: 'helix', name: 'Helix', url: 'https://helixapp.com', color: '#10b981', description: 'DEX Trading' },
    { id: 'mito', name: 'Mito Finance', url: 'https://mito.fi', color: '#f59e0b', description: 'Vault Strategies' },
    { id: 'hydro', name: 'Hydro Protocol', url: 'https://hydro.injective.network', color: '#3b82f6', description: 'Liquidity Layer' },
    { id: 'astroport', name: 'Astroport', url: 'https://astroport.fi', color: '#8b5cf6', description: 'AMM DEX' },
    { id: 'white-whale', name: 'White Whale', url: 'https://whitewhale.money', color: '#06b6d4', description: 'Arbitrage Vaults' },
    { id: 'talis', name: 'Talis Protocol', url: 'https://talis.art', color: '#ec4899', description: 'NFT Marketplace' },
    { id: 'frontrunner', name: 'Frontrunner', url: 'https://frontrunner.io', color: '#14b8a6', description: 'Sports Betting' },
    { id: 'neptune', name: 'Neptune Finance', url: 'https://neptune.finance', color: '#6366f1', description: 'Lending Protocol' },
    { id: 'levana', name: 'Levana Protocol', url: 'https://levana.finance', color: '#f97316', description: 'Perpetuals DEX' },
    { id: 'docs', name: 'Documentation', url: 'https://docs.injective.network', color: '#64748b', description: 'Developer Docs' },
  ];

  const pinnedDappsList = dapps.filter(dapp => pinnedDapps.includes(dapp.id));
  const unpinnedDappsList = dapps.filter(dapp => !pinnedDapps.includes(dapp.id));

  return (
    <div style={{ padding: '20px' }}>
      <PointsWidget />
      
      <h1 style={{
        fontSize: '2rem',
        fontWeight: 900,
        background: 'linear-gradient(135deg, #00F2FE 0%, #9E7FFF 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '20px',
        textAlign: 'left',
      }}>
        Injective Ecosystem
      </h1>

      {stats.loading ? (
        <div style={{ color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center', padding: '40px' }}>
          Loading stats...
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          marginBottom: '30px',
        }}>
          <StatCard
            icon={<DollarSign size={20} color="#00F2FE" />}
            label="Price"
            value={`$${stats.price.toFixed(2)}`}
            change={stats.priceChange24h}
          />
          <StatCard
            icon={<TrendingUp size={20} color="#9E7FFF" />}
            label="Market Cap"
            value={`$${(stats.marketCap / 1e9).toFixed(2)}B`}
          />
          <StatCard
            icon={<Activity size={20} color="#f472b6" />}
            label="24h Volume"
            value={`$${(stats.volume24h / 1e6).toFixed(2)}M`}
          />
          <StatCard
            icon={<Star size={20} color="#10b981" />}
            label="24h Change"
            value={`${stats.priceChange24h >= 0 ? '+' : ''}${stats.priceChange24h.toFixed(2)}%`}
          />
        </div>
      )}

      {pinnedDappsList.length > 0 && (
        <>
          <h2 style={{
            fontSize: '1.3rem',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '16px',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <Star size={20} color="#fbbf24" fill="#fbbf24" />
            Pinned dApps
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            marginBottom: '30px',
          }}>
            {pinnedDappsList.map((dapp) => (
              <DappCard key={dapp.id} {...dapp} />
            ))}
          </div>
        </>
      )}

      <h2 style={{
        fontSize: '1.3rem',
        fontWeight: 700,
        color: '#fff',
        marginBottom: '16px',
        textAlign: 'left',
      }}>
        Ecosystem dApps
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
      }}>
        {unpinnedDappsList.map((dapp) => (
          <DappCard key={dapp.id} {...dapp} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
