import { Home, Globe, Wallet, Settings } from 'lucide-react';
import { useAppStore } from '../store/appStore';

const BottomNav = () => {
  const { currentView, setCurrentView } = useAppStore();

  const navItems = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'browser' as const, icon: Globe, label: 'Browser' },
    { id: 'wallet' as const, icon: Wallet, label: 'Wallet' },
    { id: 'settings' as const, icon: Settings, label: 'Settings' },
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '80px',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '0 20px',
      zIndex: 100,
    }}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 12px',
              transition: 'all 0.3s ease',
              color: isActive ? '#00F2FE' : 'rgba(255, 255, 255, 0.5)',
            }}
          >
            <Icon size={24} />
            <span style={{
              fontSize: '0.7rem',
              fontWeight: isActive ? 600 : 400,
            }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
