import { 
  Moon, 
  Bell, 
  Shield, 
  Globe, 
  HelpCircle, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import GlassCard from './GlassCard';
import { useAppStore } from '../store/appStore';

const Settings = () => {
  const { wallet, setCurrentView, navigateTo } = useAppStore();

  const settingsGroups = [
    {
      title: 'PREFERENCES',
      items: [
        { icon: Moon, label: 'Dark Mode', value: 'On', action: 'toggle' },
        { icon: Bell, label: 'Notifications', value: 'Enabled', action: 'toggle' },
        { icon: Globe, label: 'Language', value: 'English', action: 'select' },
      ]
    },
    {
      title: 'SECURITY',
      items: [
        { icon: Shield, label: 'Security Settings', action: 'navigate' },
      ]
    },
    {
      title: 'ABOUT',
      items: [
        { icon: HelpCircle, label: 'Help Center', url: 'https://docs.injective.network/', action: 'link' },
        { icon: FileText, label: 'Terms of Service', url: 'https://injective.com/terms', action: 'link' },
        { icon: Info, label: 'About Injective', url: 'https://injective.com/', action: 'link' },
      ]
    }
  ];

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(180deg, #0a0a12 0%, #0d0d18 100%)',
    padding: '60px 20px 100px',
    overflowY: 'auto',
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '30px',
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '24px',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '8px',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '12px',
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: '0.15em',
    marginBottom: '12px',
    marginTop: '24px',
  };

  const handleItemClick = (item: any) => {
    if (item.url) {
      navigateTo(item.url);
      setCurrentView('browser');
    }
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Settings</h1>
        <p style={{
          fontSize: '13px',
          color: 'rgba(255, 255, 255, 0.5)',
        }}>
          Customize your experience
        </p>
      </header>

      {/* Wallet Status */}
      <GlassCard delay={0} style={{ marginBottom: '20px', opacity: 1 }}>
        <div style={{
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <p style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.5)',
              marginBottom: '4px',
            }}>
              WALLET STATUS
            </p>
            <p style={{
              fontSize: '14px',
              fontWeight: 600,
              color: wallet.isConnected ? '#10b981' : 'rgba(255, 255, 255, 0.6)',
            }}>
              {wallet.isConnected ? 'Connected' : 'Not Connected'}
            </p>
          </div>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: wallet.isConnected ? '#10b981' : 'rgba(255, 255, 255, 0.3)',
            boxShadow: wallet.isConnected ? '0 0 10px #10b981' : 'none',
          }} />
        </div>
      </GlassCard>

      {settingsGroups.map((group) => (
        <div key={group.title}>
          <h3 style={sectionTitleStyle}>{group.title}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {group.items.map((item) => (
              <GlassCard 
                key={item.label} 
                delay={0} 
                onClick={() => handleItemClick(item)}
                style={{ opacity: 1 }}
              >
                <div style={{
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}>
                    <item.icon size={18} color="rgba(255, 255, 255, 0.6)" />
                    <span style={{
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.8)',
                    }}>
                      {item.label}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    {item.value && (
                      <span style={{
                        fontSize: '13px',
                        color: 'rgba(255, 255, 255, 0.4)',
                      }}>
                        {item.value}
                      </span>
                    )}
                    {item.url ? (
                      <ExternalLink size={14} color="rgba(255, 255, 255, 0.3)" />
                    ) : (
                      <ChevronRight size={16} color="rgba(255, 255, 255, 0.3)" />
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      ))}

      {/* App Version */}
      <div style={{
        marginTop: '40px',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.3)',
        }}>
          Injective App v1.0.0
        </p>
        <p style={{
          fontSize: '11px',
          color: 'rgba(255, 255, 255, 0.2)',
          marginTop: '4px',
        }}>
          Built with ❤️ for the Injective community
        </p>
      </div>
    </div>
  );
};

export default Settings;
