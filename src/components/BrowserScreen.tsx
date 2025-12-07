import { useState } from 'react';
import { 
  Globe, 
  Search, 
  Clock, 
  TrendingUp,
  Zap,
  Shield,
  ExternalLink
} from 'lucide-react';
import { useBrowserContext } from '../context/BrowserContext';

const BrowserScreen = () => {
  const { openBrowser } = useBrowserContext();
  const [searchQuery, setSearchQuery] = useState('');

  const quickLinks = [
    { name: 'Helix', url: 'https://helixapp.com', icon: TrendingUp, color: '#00F2FE', description: 'Premier DEX' },
    { name: 'Injective Hub', url: 'https://hub.injective.network', icon: Shield, color: '#9E7FFF', description: 'Governance' },
    { name: 'Bridge', url: 'https://bridge.injective.network', icon: Zap, color: '#10b981', description: 'Cross-chain' },
    { name: 'Explorer', url: 'https://explorer.injective.network', icon: Globe, color: '#f472b6', description: 'Blockchain' },
  ];

  const recentSites = [
    { name: 'Injective Blog', url: 'https://blog.injective.com', time: '2 hours ago' },
    { name: 'Helix DEX', url: 'https://helixapp.com', time: '5 hours ago' },
    { name: 'Talis NFT', url: 'https://injective.talis.art', time: '1 day ago' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      openBrowser(searchQuery.trim());
    }
  };

  const handleQuickLink = (url: string) => {
    openBrowser(url);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>BROWSER</h1>
      </header>

      {/* Search Bar */}
      <form onSubmit={handleSearch} style={styles.searchBar}>
        <Search size={20} color="rgba(255, 255, 255, 0.4)" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search or enter URL"
          style={styles.searchInput}
        />
      </form>

      {/* Quick Links */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <Zap size={16} color="#00F2FE" />
          QUICK ACCESS
        </h2>
        <div style={styles.quickLinksGrid}>
          {quickLinks.map((link) => (
            <div
              key={link.name}
              style={styles.quickLink}
              onClick={() => handleQuickLink(link.url)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${link.color}15`;
                e.currentTarget.style.borderColor = `${link.color}40`;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                ...styles.quickLinkIcon,
                background: `${link.color}20`,
              }}>
                <link.icon size={24} color={link.color} />
              </div>
              <p style={styles.quickLinkName}>{link.name}</p>
              <p style={styles.quickLinkDesc}>{link.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Sites */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <Clock size={16} color="#9E7FFF" />
          RECENT
        </h2>
        {recentSites.map((site) => (
          <div
            key={site.url}
            style={styles.recentItem}
            onClick={() => handleQuickLink(site.url)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(0, 242, 254, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            }}
          >
            <div style={styles.recentIcon}>
              <Globe size={18} color="#00F2FE" />
            </div>
            <div style={styles.recentInfo}>
              <p style={styles.recentName}>{site.name}</p>
              <p style={styles.recentTime}>{site.time}</p>
            </div>
            <ExternalLink size={16} color="rgba(255, 255, 255, 0.3)" />
          </div>
        ))}
      </section>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '60px 20px 100px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '28px',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #00F2FE 0%, #9E7FFF 50%, #f472b6 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '0.05em',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 18px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    marginBottom: '30px',
  },
  searchInput: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#fff',
    fontSize: '15px',
    fontFamily: "'Inter', sans-serif",
  },
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: '0.15em',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  quickLinksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  quickLink: {
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center',
  },
  quickLinkIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 12px',
  },
  quickLinkName: {
    color: '#fff',
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '4px',
  },
  quickLinkDesc: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: '11px',
  },
  recentItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    marginBottom: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  recentIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: 'rgba(0, 242, 254, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentInfo: {
    flex: 1,
  },
  recentName: {
    color: '#fff',
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '2px',
  },
  recentTime: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: '11px',
  },
};

export default BrowserScreen;
