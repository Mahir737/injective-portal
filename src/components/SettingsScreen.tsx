import { useState } from 'react';
import { 
  Bell, 
  Shield, 
  Globe, 
  Moon,
  ChevronRight,
  Info,
  HelpCircle,
  LogOut,
  Palette,
  Zap,
  FileText
} from 'lucide-react';
import { useWalletContext } from '../context/WalletContext';
import { useStandaloneWallet } from '../hooks/useStandaloneWallet';
import SettingsModal from './modals/SettingsModal';
import SecuritySettings from './settings/SecuritySettings';
import NotificationSettings from './settings/NotificationSettings';
import NetworkSettings from './settings/NetworkSettings';
import ThemeSettings from './settings/ThemeSettings';
import LanguageSettings from './settings/LanguageSettings';
import { useBrowserContext } from '../context/BrowserContext';

type ModalType = 'security' | 'notifications' | 'network' | 'theme' | 'language' | 'support' | 'about' | 'legal' | null;

const SettingsScreen = () => {
  const { isConnected, disconnect } = useWalletContext();
  const { isUnlocked, lockWallet } = useStandaloneWallet();
  const { openBrowser } = useBrowserContext();
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const handleDisconnect = () => {
    if (isConnected) {
      disconnect();
    }
    if (isUnlocked) {
      lockWallet();
    }
  };

  const handleSupport = () => {
    openBrowser('https://injective.com/support');
  };

  const handleAbout = () => {
    setActiveModal('about');
  };

  const handleLegal = () => {
    setActiveModal('legal');
  };

  const scrollContainerStyle: React.CSSProperties = {
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '60px 20px 100px',
    scrollBehavior: 'smooth'
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '30px'
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '28px',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #00F2FE 0%, #9E7FFF 50%, #f472b6 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '8px',
    letterSpacing: '0.05em'
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '12px',
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: '0.15em',
    marginBottom: '12px',
    marginTop: '24px'
  };

  const settingItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '14px',
    marginBottom: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={scrollContainerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>SETTINGS</h1>
      </header>

      {/* Preferences Section */}
      <section>
        <h2 style={sectionTitleStyle}>PREFERENCES</h2>
        
        <div style={settingItemStyle} onClick={() => setActiveModal('notifications')}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'rgba(0, 242, 254, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bell size={20} color="#00F2FE" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{
              color: '#fff',
              fontSize: '15px',
              fontWeight: 500,
              marginBottom: '2px'
            }}>Notifications</p>
            <p style={{
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: '12px'
            }}>Manage notification preferences</p>
          </div>
          <ChevronRight size={20} color="rgba(255, 255, 255, 0.3)" />
        </div>

        <div style={settingItemStyle} onClick={() => setActiveModal('theme')}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'rgba(158, 127, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Moon size={20} color="#9E7FFF" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{
              color: '#fff',
              fontSize: '15px',
              fontWeight: 500,
              marginBottom: '2px'
            }}>Theme</p>
            <p style={{
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: '12px'
            }}>Customize app appearance</p>
          </div>
          <ChevronRight size={20} color="rgba(255, 255, 255, 0.3)" />
        </div>

        <div style={settingItemStyle} onClick={() => setActiveModal('language')}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'rgba(244, 114, 182, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Palette size={20} color="#f472b6" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{
              color: '#fff',
              fontSize: '15px',
              fontWeight: 500,
              marginBottom: '2px'
            }}>Language</p>
            <p style={{
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: '12px'
            }}>Select your preferred language</p>
          </div>
          <ChevronRight size={20} color="rgba(255, 255, 255, 0.3)" />
        </div>
      </section>

      {/* Security Section */}
      <section>
        <h2 style={sectionTitleStyle}>SECURITY</h2>
        
        <div style={settingItemStyle} onClick={() => setActiveModal('security')}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Shield size={20} color="#10b981" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{
              color: '#fff',
              fontSize: '15px',
              fontWeight: 500,
              marginBottom: '2px'
            }}>Security Settings</p>
            <p style={{
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: '12px'
            }}>Manage wallet security</p>
          </div>
          <ChevronRight size={20} color="rgba(255, 255, 255, 0.3)" />
        </div>

        <div style={settingItemStyle} onClick={() => setActiveModal('network')}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'rgba(245, 158, 11, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Zap size={20} color="#f59e0b" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{
              color: '#fff',
              fontSize: '15px',
              fontWeight: 500,
              marginBottom: '2px'
            }}>Network</p>
            <p style={{
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: '12px'
            }}>Switch between networks</p>
          </div>
          <ChevronRight size={20} color="rgba(255, 255, 255, 0.3)" />
        </div>
      </section>

      {/* About Section */}
      <section>
        <h2 style={sectionTitleStyle}>ABOUT</h2>
        
        <div style={settingItemStyle} onClick={handleAbout}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'rgba(59, 130, 246, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Info size={20} color="#3b82f6" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{
              color: '#fff',
              fontSize: '15px',
              fontWeight: 500,
              marginBottom: '2px'
            }}>About Injective</p>
            <p style={{
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: '12px'
            }}>Version 1.0.0</p>
          </div>
          <ChevronRight size={20} color="rgba(255, 255, 255, 0.3)" />
        </div>

        <div style={settingItemStyle} onClick={handleSupport}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'rgba(139, 92, 246, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <HelpCircle size={20} color="#8b5cf6" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{
              color: '#fff',
              fontSize: '15px',
              fontWeight: 500,
              marginBottom: '2px'
            }}>Help & Support</p>
            <p style={{
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: '12px'
            }}>Get help and documentation</p>
          </div>
          <ChevronRight size={20} color="rgba(255, 255, 255, 0.3)" />
        </div>

        <div style={settingItemStyle} onClick={handleLegal}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'rgba(107, 114, 128, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileText size={20} color="#6b7280" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{
              color: '#fff',
              fontSize: '15px',
              fontWeight: 500,
              marginBottom: '2px'
            }}>Legal</p>
            <p style={{
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: '12px'
            }}>Terms, Privacy & Licenses</p>
          </div>
          <ChevronRight size={20} color="rgba(255, 255, 255, 0.3)" />
        </div>
      </section>

      {/* Disconnect Wallet */}
      {(isConnected || isUnlocked) && (
        <section style={{ marginTop: '30px' }}>
          <div 
            style={{
              ...settingItemStyle,
              background: 'rgba(239, 68, 68, 0.1)',
              borderColor: 'rgba(239, 68, 68, 0.2)'
            }}
            onClick={handleDisconnect}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'rgba(239, 68, 68, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <LogOut size={20} color="#ef4444" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{
                color: '#ef4444',
                fontSize: '15px',
                fontWeight: 600
              }}>Disconnect Wallet</p>
            </div>
          </div>
        </section>
      )}

      {/* Modals */}
      <SettingsModal
        isOpen={activeModal === 'security'}
        onClose={() => setActiveModal(null)}
        title="Security Settings"
      >
        <SecuritySettings />
      </SettingsModal>

      <SettingsModal
        isOpen={activeModal === 'notifications'}
        onClose={() => setActiveModal(null)}
        title="Notification Settings"
      >
        <NotificationSettings />
      </SettingsModal>

      <SettingsModal
        isOpen={activeModal === 'network'}
        onClose={() => setActiveModal(null)}
        title="Network Settings"
      >
        <NetworkSettings />
      </SettingsModal>

      <SettingsModal
        isOpen={activeModal === 'theme'}
        onClose={() => setActiveModal(null)}
        title="Theme Settings"
      >
        <ThemeSettings />
      </SettingsModal>

      <SettingsModal
        isOpen={activeModal === 'language'}
        onClose={() => setActiveModal(null)}
        title="Language Settings"
      >
        <LanguageSettings />
      </SettingsModal>

      <SettingsModal
        isOpen={activeModal === 'about'}
        onClose={() => setActiveModal(null)}
        title="About Injective"
      >
        <div style={{ color: '#fff' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 16px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #00F2FE 0%, #9E7FFF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: 800,
            }}>
              INJ
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
              Injective App
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px' }}>
              Version 1.0.0
            </p>
          </div>
          <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.7)' }}>
            <p style={{ marginBottom: '12px' }}>
              A comprehensive portal for the Injective blockchain ecosystem with fully standalone self-custodial wallet.
            </p>
            <p style={{ marginBottom: '12px' }}>
              Built with React, TypeScript, and the Injective SDK.
            </p>
            <p>
              © 2025 Injective Labs. All rights reserved.
            </p>
          </div>
        </div>
      </SettingsModal>

      <SettingsModal
        isOpen={activeModal === 'legal'}
        onClose={() => setActiveModal(null)}
        title="Legal Information"
      >
        <div style={{ color: '#fff', fontSize: '14px', lineHeight: '1.6' }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
              Terms of Service
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              By using this application, you agree to our terms of service and privacy policy.
            </p>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
              Privacy Policy
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              We respect your privacy and handle your data with care. All wallet data is encrypted and stored locally.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
              Open Source Licenses
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              This application uses various open source libraries. View full license information on our GitHub repository.
            </p>
          </div>
        </div>
      </SettingsModal>
    </div>
  );
};

export default SettingsScreen;
