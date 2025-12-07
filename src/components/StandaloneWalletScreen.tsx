import { useState } from 'react';
import {
  Lock,
  Unlock,
  Send,
  Download,
  History,
  Copy,
  Check,
  RefreshCw,
  Eye,
  Key,
  Trash2,
  ArrowUpRight,
  ArrowDownLeft,
  ExternalLink,
} from 'lucide-react';
import { useStandaloneWallet } from '../hooks/useStandaloneWallet';
import WalletSetup from './WalletSetup';

const StandaloneWalletScreen = () => {
  const {
    isUnlocked,
    hasWallet,
    injectiveAddress,
    balance,
    isLoading,
    error,
    createWallet,
    importWallet,
    unlockWallet,
    lockWallet,
    deleteWallet,
    exportMnemonic,
    exportPrivateKey,
    refreshBalance,
  } = useStandaloneWallet();

  const [unlockPassword, setUnlockPassword] = useState('');
  const [showExport, setShowExport] = useState(false);
  const [exportType, setExportType] = useState<'mnemonic' | 'privateKey'>('mnemonic');
  const [exportedData, setExportedData] = useState('');
  const [copied, setCopied] = useState(false);
  const [unlockError, setUnlockError] = useState('');

  const transactions = [
    { type: 'send', amount: '5.00 INJ', to: 'inj1abc...xyz', time: '2 hours ago', status: 'confirmed' },
    { type: 'receive', amount: '10.50 INJ', from: 'inj1def...uvw', time: '5 hours ago', status: 'confirmed' },
    { type: 'send', amount: '2.25 INJ', to: 'inj1ghi...rst', time: '1 day ago', status: 'confirmed' },
  ];

  const handleUnlock = async () => {
    setUnlockError('');
    try {
      await unlockWallet(unlockPassword);
      setUnlockPassword('');
    } catch (err) {
      setUnlockError(err instanceof Error ? err.message : 'Failed to unlock wallet');
    }
  };

  const handleExport = () => {
    try {
      const data = exportType === 'mnemonic' ? exportMnemonic() : exportPrivateKey();
      setExportedData(data);
      setShowExport(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to export');
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollContainerStyle: React.CSSProperties = {
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '60px 20px 100px',
    scrollBehavior: 'smooth',
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '30px',
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
    letterSpacing: '0.05em',
  };

  const cardStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '24px',
    backdropFilter: 'blur(10px)',
    marginBottom: '20px',
  };

  // Show wallet setup if no wallet exists
  if (!hasWallet) {
    return (
      <div style={scrollContainerStyle}>
        <header style={headerStyle}>
          <h1 style={titleStyle}>WALLET</h1>
        </header>
        <WalletSetup onCreateWallet={createWallet} onImportWallet={importWallet} />
      </div>
    );
  }

  // Show unlock screen if wallet exists but is locked
  if (!isUnlocked) {
    return (
      <div style={scrollContainerStyle}>
        <header style={headerStyle}>
          <h1 style={titleStyle}>WALLET</h1>
        </header>

        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div style={cardStyle}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.2) 0%, rgba(158, 127, 255, 0.2) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}>
              <Lock size={40} color="#00F2FE" />
            </div>

            <h2 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '20px',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '12px',
              textAlign: 'center',
            }}>
              Unlock Your Wallet
            </h2>

            <p style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '14px',
              marginBottom: '24px',
              textAlign: 'center',
            }}>
              Enter your password to access your wallet
            </p>

            <input
              type="password"
              placeholder="Enter password"
              value={unlockPassword}
              onChange={(e) => setUnlockPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
              style={{
                width: '100%',
                padding: '14px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '14px',
                marginBottom: '12px',
              }}
            />

            {unlockError && (
              <div style={{
                padding: '12px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                color: '#ef4444',
                fontSize: '13px',
                marginBottom: '12px',
              }}>
                {unlockError}
              </div>
            )}

            <button
              onClick={handleUnlock}
              disabled={isLoading || !unlockPassword}
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, #00F2FE 0%, #9E7FFF 100%)',
                border: 'none',
                borderRadius: '14px',
                color: '#000',
                fontSize: '15px',
                fontWeight: 600,
                cursor: unlockPassword ? 'pointer' : 'not-allowed',
                opacity: unlockPassword ? 1 : 0.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Unlock size={18} />
              {isLoading ? 'Unlocking...' : 'Unlock Wallet'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show main wallet interface when unlocked
  return (
    <div style={scrollContainerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>WALLET</h1>
      </header>

      {/* Balance Card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.1) 0%, rgba(158, 127, 255, 0.1) 100%)',
        border: '1px solid rgba(0, 242, 254, 0.2)',
        borderRadius: '24px',
        padding: '30px',
        marginBottom: '24px',
        textAlign: 'center',
      }}>
        <p style={{
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '12px',
          letterSpacing: '0.1em',
          marginBottom: '8px',
        }}>TOTAL BALANCE</p>
        <p style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '42px',
          fontWeight: 700,
          color: '#fff',
          marginBottom: '8px',
        }}>{balance} INJ</p>
        <p style={{
          color: 'rgba(255, 255, 255, 0.4)',
          fontSize: '14px',
          marginBottom: '16px',
        }}>≈ ${(parseFloat(balance) * 24.87).toFixed(2)} USD</p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '8px 16px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          width: 'fit-content',
          margin: '0 auto',
        }}>
          <span style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.5)',
            fontFamily: 'monospace',
          }}>
            {injectiveAddress.slice(0, 10)}...{injectiveAddress.slice(-8)}
          </span>
          <button
            onClick={() => copyToClipboard(injectiveAddress)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
            }}
          >
            {copied ? (
              <Check size={14} color="#10b981" />
            ) : (
              <Copy size={14} color="rgba(255, 255, 255, 0.5)" />
            )}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '30px' }}>
        {[
          { icon: Send, label: 'Send', color: '#00F2FE' },
          { icon: Download, label: 'Receive', color: '#9E7FFF' },
          { icon: RefreshCw, label: 'Refresh', color: '#10b981', onClick: refreshBalance },
          { icon: Lock, label: 'Lock', color: '#f59e0b', onClick: lockWallet },
        ].map((action, index) => (
          <div
            key={index}
            onClick={action.onClick}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: `rgba(${action.color === '#00F2FE' ? '0, 242, 254' : action.color === '#9E7FFF' ? '158, 127, 255' : action.color === '#10b981' ? '16, 185, 129' : '245, 158, 11'}, 0.15)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <action.icon size={20} color={action.color} />
            </div>
            <span style={{ color: '#fff', fontSize: '12px', fontWeight: 500 }}>{action.label}</span>
          </div>
        ))}
      </div>

      {/* Security & Export */}
      <div style={cardStyle}>
        <h3 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '14px',
          fontWeight: 600,
          color: 'rgba(255, 255, 255, 0.7)',
          letterSpacing: '0.15em',
          marginBottom: '16px',
        }}>SECURITY & BACKUP</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={() => { setExportType('mnemonic'); handleExport(); }}
            style={{
              padding: '14px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Eye size={18} color="#9E7FFF" />
            Export Seed Phrase
          </button>

          <button
            onClick={() => { setExportType('privateKey'); handleExport(); }}
            style={{
              padding: '14px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Key size={18} color="#00F2FE" />
            Export Private Key
          </button>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this wallet? This action cannot be undone!')) {
                deleteWallet();
              }
            }}
            style={{
              padding: '14px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px',
              color: '#ef4444',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Trash2 size={18} />
            Delete Wallet
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <h3 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '14px',
          fontWeight: 600,
          color: 'rgba(255, 255, 255, 0.7)',
          letterSpacing: '0.15em',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <History size={16} color="#f472b6" />
          RECENT ACTIVITY
        </h3>
        {transactions.map((tx, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              marginBottom: '10px',
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: tx.type === 'send' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {tx.type === 'send' ? (
                <ArrowUpRight size={20} color="#ef4444" />
              ) : (
                <ArrowDownLeft size={20} color="#10b981" />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{
                color: '#fff',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '2px',
              }}>
                {tx.type === 'send' ? 'Sent' : 'Received'} {tx.amount}
              </p>
              <p style={{
                color: 'rgba(255, 255, 255, 0.4)',
                fontSize: '11px',
              }}>
                {tx.type === 'send' ? `To ${tx.to}` : `From ${tx.from}`} • {tx.time}
              </p>
            </div>
            <ExternalLink size={16} color="rgba(255, 255, 255, 0.3)" />
          </div>
        ))}
      </div>

      {/* Export Modal */}
      {showExport && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px',
        }}>
          <div style={{
            background: 'rgba(23, 23, 23, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '30px',
            maxWidth: '500px',
            width: '100%',
            backdropFilter: 'blur(20px)',
          }}>
            <h3 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '18px',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '16px',
            }}>
              {exportType === 'mnemonic' ? 'Seed Phrase' : 'Private Key'}
            </h3>

            <div style={{
              padding: '16px',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              marginBottom: '16px',
              wordBreak: 'break-all',
              fontFamily: 'monospace',
              fontSize: '13px',
              color: '#fff',
              lineHeight: 1.6,
            }}>
              {exportedData}
            </div>

            <button
              onClick={() => copyToClipboard(exportedData)}
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, #00F2FE 0%, #9E7FFF 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#000',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '12px',
              }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>

            <button
              onClick={() => { setShowExport(false); setExportedData(''); }}
              style={{
                width: '100%',
                padding: '14px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StandaloneWalletScreen;
