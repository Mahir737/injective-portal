import { useAppStore } from '../store/appStore';
import HomeScreen from './HomeScreen';
import BrowserScreen from './BrowserScreen';
import StandaloneWalletScreen from './StandaloneWalletScreen';
import SettingsScreen from './SettingsScreen';
import BottomNav from './BottomNav';
import SocialBar from './SocialBar';

const MobileApp = () => {
  const currentView = useAppStore((state) => state.currentView);

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        width: '100%',
        height: 'calc(100vh - 80px)',
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingBottom: '20px',
      }}>
        {currentView === 'home' && <HomeScreen />}
        {currentView === 'browser' && <BrowserScreen />}
        {currentView === 'wallet' && <StandaloneWalletScreen />}
        {currentView === 'settings' && <SettingsScreen />}
      </div>
      <SocialBar />
      <BottomNav />
    </div>
  );
};

export default MobileApp;
