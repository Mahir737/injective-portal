import { useState } from 'react';
import { 
  Wallet, 
  Send, 
  Download, 
  History, 
  Copy,
  ExternalLink,
  RefreshCw,
  Check,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import { useWalletContext } from '../context/WalletContext';
import WalletModal from './WalletModal';
import GlassCard from './GlassCard';

const WalletScreen = () => {
  const {
    isConnected,
    injectiveAddress,
    balance,
    refreshBalance,
  } = useWalletContext();

  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const transactions = [
    { type: 'send', amount: '5.00 INJ', to: 'inj1abc...xyz', time: '2 hours ago', status: 'confirmed' },
    { type: 'receive', amount: '10.50 INJ', from: 'inj1def...uvw', time: '5 hours ago', status: 'confirmed' },
    { type: 'send', amount: '2.25 INJ', to: 'inj1ghi...rst', time: '1 day ago', status: 'confirmed' },
  ];

  const copyAddress = async () => {
    await navigator.clipboard.writeText(injectiveAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  const balanceCardStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.1) 0%, rgba(158, 127, 255, 0.1) 100%)',
    border: '1px solid rgba(0, 242, 254, 0.2)',
    borderRadius: '24px',
    padding: '30px',
    marginBottom: '24px',
    textAlign: 'center'
  };

  const actionButtonStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: '0.15em',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const transactionItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    marginBottom: '10px'
  };

  if (!isConnected) {
    return (
      <div style={scrollContainerStyle}>
        <header style={headerStyle}>
          <h1 style={titleStyle}>WALLET</h1>
        </header>

        <GlassCard delay={0.2}>
          <div style={{ padding: '40px 20px', textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.2) 0%, rgba(158, 127, 255, 0.2) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              <Wallet size={40} color="#00F2FE" />
            </div>
            <h2 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '20px',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '12px'
            }}>
              Connect Your Wallet
            </h2>
            <p style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '14px',
              marginBottom: '24px',
              lineHeight: 1.6
            }}>
              Connect your wallet to view balance, send transactions, and manage your assets
            </p>
            <button
              onClick={() => setWalletModalOpen(true)}
              style={{
                padding: '14px 32px',
                background: 'linear-gradient(135deg, #00F2FE 0%, #9E7FFF 100%)',
                border: 'none',
                borderRadius: '14px',
                color: '#000',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Connect Wallet
            </button>
          </div>
        </GlassCard>

        <WalletModal isOpen={walletModalOpen} onClose={() => setWalletModalOpen(false)} />
      </div>
    );
  }

  return (
    <div style={scrollContainerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>WALLET</h1>
      </header>

      {/* Balance Card */}
      <div style={balanceCardStyle}>
        <p style={{
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '12px',
          letterSpacing: '0.1em',
          marginBottom: '8px'
        }}>TOTAL BALANCE</p>
        <p style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '42px',
          fontWeight: 700,
          color: '#fff',
          marginBottom: '8px'
        }}>{balance} INJ</p>
        <p style={{
          color: 'rgba(255, 255, 255, 0.4)',
          fontSize: '14px',
          marginBottom: '16px'
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
          margin: '0 auto'
        }}>
          <span style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.5)',
            fontFamily: 'monospace'
          }}>
            {injectiveAddress.slice(0, 10)}...{injectiveAddress.slice(-8)}
          </span>
          <button
            onClick={copyAddress}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex'
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
      <div style={{ display: 'flex', gap: '12px', marginBottom: '30px' }}>
        <div style={actionButtonStyle}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(0, 242, 254, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Send size={20} color="#00F2FE" />
          </div>
          <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>Send</span>
        </div>
        
        <div style={actionButtonStyle}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(158, 127, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Download size={20} color="#9E7FFF" />
          </div>
          <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>Receive</span>
        </div>
        
        <div style={actionButtonStyle} onClick={refreshBalance}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <RefreshCw size={20} color="#10b981" />
          </div>
          <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>Refresh</span>
        </div>
      </div>

      {/* Recent Transactions */}
      <section>
        <h2 style={sectionTitleStyle}>
          <History size={16} color="#f472b6" />
          RECENT ACTIVITY
        </h2>
        {transactions.map((tx, index) => (
          <div key={index} style={transactionItemStyle}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: tx.type === 'send' 
                ? 'rgba(239, 68, 68, 0.15)' 
                : 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
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
                marginBottom: '2px'
              }}>
                {tx.type === 'send' ? 'Sent' : 'Received'} {tx.amount}
              </p>
              <p style={{
                color: 'rgba(255, 255, 255, 0.4)',
                fontSize: '11px'
              }}>
                {tx.type === 'send' ? `To ${tx.to}` : `From ${tx.from}`} • {tx.time}
              </p>
            </div>
            <ExternalLink size={16} color="rgba(255, 255, 255, 0.3)" />
          </div>
        ))}
      </section>

      <WalletModal isOpen={walletModalOpen} onClose={() => setWalletModalOpen(false)} />
    </div>
  );
};

export default WalletScreen;
