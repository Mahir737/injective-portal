import React from 'react';
import { Zap, Globe, Activity } from 'lucide-react';
import { useSettings, Network } from '../../contexts/SettingsContext';

const NetworkSettings: React.FC = () => {
  const { settings, updateNetwork } = useSettings();

  const networks: { value: Network; label: string; rpc: string; status: string }[] = [
    { 
      value: 'mainnet', 
      label: 'Mainnet', 
      rpc: 'https://sentry.tm.injective.network:443',
      status: 'Active'
    },
    { 
      value: 'testnet', 
      label: 'Testnet', 
      rpc: 'https://testnet.sentry.tm.injective.network:443',
      status: 'Active'
    },
    { 
      value: 'devnet', 
      label: 'Devnet', 
      rpc: 'https://devnet.sentry.tm.injective.network:443',
      status: 'Active'
    },
  ];

  const networkCardStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '16px',
    background: isActive 
      ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.1) 0%, rgba(158, 127, 255, 0.1) 100%)'
      : 'rgba(255, 255, 255, 0.03)',
    border: `1px solid ${isActive ? 'rgba(0, 242, 254, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
    borderRadius: '12px',
    marginBottom: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  });

  const networkHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px',
  };

  const networkTitleStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 600,
  };

  const statusBadgeStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '4px 8px',
    background: isActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.1)',
    border: `1px solid ${isActive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.2)'}`,
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 600,
    color: isActive ? '#10b981' : 'rgba(255, 255, 255, 0.5)',
  });

  const rpcStyle: React.CSSProperties = {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.5)',
    fontFamily: 'monospace',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
    marginBottom: '12px',
    marginTop: '24px',
  };

  const infoBoxStyle: React.CSSProperties = {
    padding: '12px',
    background: 'rgba(0, 242, 254, 0.05)',
    border: '1px solid rgba(0, 242, 254, 0.2)',
    borderRadius: '8px',
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: '1.5',
  };

  return (
    <div>
      <h3 style={sectionTitleStyle}>
        <Globe size={16} style={{ display: 'inline', marginRight: '8px' }} />
        Select Network
      </h3>

      {networks.map(network => (
        <div
          key={network.value}
          style={networkCardStyle(settings.network === network.value)}
          onClick={() => updateNetwork(network.value)}
        >
          <div style={networkHeaderStyle}>
            <div style={networkTitleStyle}>
              <Zap size={18} color={settings.network === network.value ? '#00F2FE' : '#fff'} />
              {network.label}
            </div>
            <div style={statusBadgeStyle(settings.network === network.value)}>
              <Activity size={10} style={{ display: 'inline', marginRight: '4px' }} />
              {network.status}
            </div>
          </div>
          <div style={rpcStyle}>{network.rpc}</div>
        </div>
      ))}

      <div style={infoBoxStyle}>
        ℹ️ Changing networks will disconnect your current session and reconnect to the selected network. 
        Make sure you're using the correct network for your transactions.
      </div>
    </div>
  );
};

export default NetworkSettings;
