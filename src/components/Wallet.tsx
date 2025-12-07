import { useState, useEffect } from 'react';
import { 
  Wallet as WalletIcon, 
  Send, 
  QrCode, 
  ArrowUpRight, 
  ArrowDownLeft,
  Copy,
  Check,
  RefreshCw,
  ChevronRight,
  Coins,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  X,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { useAppStore, WalletType } from '../store/appStore';
import GlassCard from './GlassCard';

const Wallet = () => {
  const { wallet, connectWallet, disconnectWallet, sendTokens, refreshBalance, error, isLoading } = useWallet();
  const { priceData, setBottomSheetOpen, setBottomSheetContent, isBottomSheetOpen, bottomSheetContent } = useAppStore();
  
  const [copied, setCopied] = useState(false);
  const [showWalletSelect, setShowWalletSelect] = useState(false);
  const [sendForm, setSendForm] = useState({ recipient: '', amount: '' });
  const [sendError, setSendError] = useState('');
  const [sendSuccess, setSendSuccess] = useState(false);

  const walletOptions: { type: WalletType; name: string; icon: string; color: string }[] = [
    { type: 'keplr', name: 'Keplr', icon: '🔮', color: '#7B3FE4' },
    { type: 'leap', name: 'Leap', icon: '🦘', color: '#32D583' },
    { type: 'metamask', name: 'MetaMask', icon: '🦊', color: '#F6851B' },
    { type: 'cosmostation', name: 'Cosmostation', icon: '🌌', color: '#9C6CFF' },
  ];

  const copyAddress = () => {
    navigator.clipboard.writeText(wallet.injectiveAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 10)}...${address.slice(-8)}`;
  };

  const handleConnect = async (type: WalletType) => {
    try {
      await connectWallet(type);
      setShowWalletSelect(false);
    } catch (err) {
      console.error('Connection failed:', err);
    }
  };

  const handleSend = async () => {
    setSendError('');
    setSendSuccess(false);

    if (!sendForm.recipient || !sendForm.amount) {
      setSendError('Please fill in all fields');
      return;
    }

    try {
      await sendTokens(sendForm.recipient, sendForm.amount);
      setSendSuccess(true);
      setSendForm({ recipient: '', amount: '' });
      setTimeout(() => {
        setBottomSheetOpen(false);
        setSendSuccess(false);
      }, 2000);
    } catch (err: any) {
      setSendError(err.message || 'Transaction failed');
    }
  };

  const usdValue = priceData 
    ? (parseFloat(wallet.balance) * priceData.price).toFixed(2)
    : '0.00';

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(180deg, #0a0a12 0%, #0d0d18 100%)',
    padding: '60px 20px 100px',
    overflowY: 'auto',
  };

  // Not connected state
  if (!wallet.isConnected) {
    return (
      <div style={containerStyle}>
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.2) 0%, rgba(158, 127, 255, 0.2) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            boxShadow: '0 0 40px rgba(0, 242, 254, 0.2)',
          }}>
            <WalletIcon size={36} color="#00F2FE" />
          </div>
          
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '24px',
            color: '#fff',
            marginBottom: '12px',
          }}>
            Connect Wallet
          </h2>
          
          <p style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.5)',
            marginBottom: '32px',
            maxWidth: '280px',
          }}>
            Connect your wallet to access the full Injective ecosystem
          </p>

          {error && (
            <div style={{
              padding: '12px 16px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <AlertCircle size={16} color="#ef4444" />
              <span style={{ color: '#ef4444', fontSize: '13px' }}>{error}</span>
            </div>
          )}

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            maxWidth: '300px',
          }}>
            {walletOptions.map((option) => (
              <GlassCard 
                key={option.type}
                onClick={() => handleConnect(option.type)}
                delay={0}
                style={{ opacity: 1 }}
              >
                <div style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}>
                    <span style={{ fontSize: '24px' }}>{option.icon}</span>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '15px',
                      fontWeight: 500,
                      color: '#fff',
                    }}>
                      {option.name}
                    </span>
                  </div>
                  <ChevronRight size={18} color="rgba(255, 255, 255, 0.4)" />
                </div>
              </GlassCard>
            ))}
          </div>

          {isLoading && (
            <div style={{
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'rgba(255, 255, 255, 0.6)',
            }}>
              <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: '13px' }}>Connecting...</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Connected state
  return (
    <div style={containerStyle}>
      {/* Header with balance */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <p style={{
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.5)',
          marginBottom: '8px',
          letterSpacing: '0.1em',
        }}>
          TOTAL BALANCE
        </p>
        <h1 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '36px',
          fontWeight: 700,
          color: '#fff',
          marginBottom: '4px',
        }}>
          {wallet.balance} INJ
        </h1>
        <p style={{
          fontSize: '16px',
          color: 'rgba(255, 255, 255, 0.6)',
        }}>
          ≈ ${usdValue} USD
        </p>
        
        {priceData && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            marginTop: '8px',
            padding: '4px 10px',
            background: priceData.priceChange24h >= 0 
              ? 'rgba(16, 185, 129, 0.15)' 
              : 'rgba(239, 68, 68, 0.15)',
            borderRadius: '20px',
          }}>
            {priceData.priceChange24h >= 0 ? (
              <TrendingUp size={12} color="#10b981" />
            ) : (
              <TrendingDown size={12} color="#ef4444" />
            )}
            <span style={{
              fontSize: '12px',
              color: priceData.priceChange24h >= 0 ? '#10b981' : '#ef4444',
              fontWeight: 500,
            }}>
              {priceData.priceChange24h >= 0 ? '+' : ''}{priceData.priceChange24h.toFixed(2)}%
            </span>
          </div>
        )}
      </div>

      {/* Address card */}
      <GlassCard delay={0} style={{ marginBottom: '20px', opacity: 1 }}>
        <div style={{
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <p style={{
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.5)',
              marginBottom: '4px',
            }}>
              {wallet.walletType?.toUpperCase()} WALLET
            </p>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '13px',
              color: '#fff',
            }}>
              {formatAddress(wallet.injectiveAddress)}
            </p>
          </div>
          <button
            onClick={copyAddress}
            style={{
              padding: '8px 12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: copied ? '#10b981' : 'rgba(255, 255, 255, 0.6)',
              transition: 'all 0.2s ease',
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span style={{ fontSize: '12px' }}>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </GlassCard>

      {/* Action buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '24px',
      }}>
        <GlassCard 
          delay={0} 
          onClick={() => {
            setBottomSheetContent('send');
            setBottomSheetOpen(true);
          }}
          style={{ opacity: 1 }}
        >
          <div style={{
            padding: '16px',
            textAlign: 'center',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.2) 0%, rgba(0, 242, 254, 0.1) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 8px',
            }}>
              <ArrowUpRight size={20} color="#00F2FE" />
            </div>
            <span style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 500,
            }}>
              Send
            </span>
          </div>
        </GlassCard>

        <GlassCard 
          delay={0} 
          onClick={() => {
            setBottomSheetContent('receive');
            setBottomSheetOpen(true);
          }}
          style={{ opacity: 1 }}
        >
          <div style={{
            padding: '16px',
            textAlign: 'center',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 8px',
            }}>
              <ArrowDownLeft size={20} color="#10b981" />
            </div>
            <span style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 500,
            }}>
              Receive
            </span>
          </div>
        </GlassCard>

        <GlassCard 
          delay={0} 
          onClick={refreshBalance}
          style={{ opacity: 1 }}
        >
          <div style={{
            padding: '16px',
            textAlign: 'center',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(158, 127, 255, 0.2) 0%, rgba(158, 127, 255, 0.1) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 8px',
            }}>
              <RefreshCw size={20} color="#9E7FFF" />
            </div>
            <span style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 500,
            }}>
              Refresh
            </span>
          </div>
        </GlassCard>
      </div>

      {/* Assets section */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.7)',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <Coins size={16} color="#00F2FE" />
          ASSETS
        </h3>

        <GlassCard delay={0} style={{ opacity: 1 }}>
          <div style={{
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00F2FE 0%, #9E7FFF 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontWeight: 700, color: '#fff', fontSize: '14px' }}>INJ</span>
              </div>
              <div>
                <p style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#fff',
                }}>
                  Injective
                </p>
                <p style={{
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.5)',
                }}>
                  {wallet.balance} INJ
                </p>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#fff',
              }}>
                ${usdValue}
              </p>
              {priceData && (
                <p style={{
                  fontSize: '12px',
                  color: priceData.priceChange24h >= 0 ? '#10b981' : '#ef4444',
                }}>
                  {priceData.priceChange24h >= 0 ? '+' : ''}{priceData.priceChange24h.toFixed(2)}%
                </p>
              )}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Quick links */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.7)',
          marginBottom: '12px',
        }}>
          QUICK ACTIONS
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <a 
            href={`https://injscan.com/account/${wallet.injectiveAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <GlassCard delay={0} style={{ opacity: 1 }}>
              <div style={{
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span style={{
                  fontSize: '13px',
                  color: 'rgba(255, 255, 255, 0.8)',
                }}>
                  View on Explorer
                </span>
                <ExternalLink size={16} color="rgba(255, 255, 255, 0.4)" />
              </div>
            </GlassCard>
          </a>

          <GlassCard 
            delay={0} 
            onClick={disconnectWallet}
            style={{ opacity: 1 }}
          >
            <div style={{
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{
                fontSize: '13px',
                color: '#ef4444',
              }}>
                Disconnect Wallet
              </span>
              <X size={16} color="#ef4444" />
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Bottom Sheet */}
      {isBottomSheetOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
        onClick={() => setBottomSheetOpen(false)}
        >
          <div 
            style={{
              width: '100%',
              maxWidth: '430px',
              background: 'linear-gradient(180deg, #1a1a24 0%, #0d0d18 100%)',
              borderRadius: '24px 24px 0 0',
              padding: '20px',
              maxHeight: '70vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              width: '40px',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '2px',
              margin: '0 auto 20px',
            }} />

            {bottomSheetContent === 'send' && (
              <div>
                <h3 style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '18px',
                  color: '#fff',
                  marginBottom: '20px',
                  textAlign: 'center',
                }}>
                  Send INJ
                </h3>

                {sendError && (
                  <div style={{
                    padding: '12px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '12px',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <AlertCircle size={16} color="#ef4444" />
                    <span style={{ color: '#ef4444', fontSize: '13px' }}>{sendError}</span>
                  </div>
                )}

                {sendSuccess && (
                  <div style={{
                    padding: '12px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '12px',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <Check size={16} color="#10b981" />
                    <span style={{ color: '#10b981', fontSize: '13px' }}>Transaction sent successfully!</span>
                  </div>
                )}

                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginBottom: '8px',
                  }}>
                    Recipient Address
                  </label>
                  <input
                    type="text"
                    value={sendForm.recipient}
                    onChange={(e) => setSendForm({ ...sendForm, recipient: e.target.value })}
                    placeholder="inj1..."
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginBottom: '8px',
                  }}>
                    Amount (INJ)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="number"
                      value={sendForm.amount}
                      onChange={(e) => setSendForm({ ...sendForm, amount: e.target.value })}
                      placeholder="0.00"
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                    <button
                      onClick={() => setSendForm({ ...sendForm, amount: wallet.balance })}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        padding: '4px 8px',
                        background: 'rgba(0, 242, 254, 0.1)',
                        border: '1px solid rgba(0, 242, 254, 0.3)',
                        borderRadius: '6px',
                        color: '#00F2FE',
                        fontSize: '11px',
                        cursor: 'pointer',
                      }}
                    >
                      MAX
                    </button>
                  </div>
                  <p style={{
                    fontSize: '11px',
                    color: 'rgba(255, 255, 255, 0.4)',
                    marginTop: '6px',
                  }}>
                    Available: {wallet.balance} INJ
                  </p>
                </div>

                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #00F2FE 0%, #9E7FFF 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.7 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send INJ
                    </>
                  )}
                </button>
              </div>
            )}

            {bottomSheetContent === 'receive' && (
              <div style={{ textAlign: 'center' }}>
                <h3 style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '18px',
                  color: '#fff',
                  marginBottom: '20px',
                }}>
                  Receive INJ
                </h3>

                <div style={{
                  width: '200px',
                  height: '200px',
                  background: '#fff',
                  borderRadius: '16px',
                  margin: '0 auto 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <QrCode size={160} color="#000" />
                </div>

                <p style={{
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginBottom: '8px',
                }}>
                  Your Injective Address
                </p>

                <div style={{
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  marginBottom: '16px',
                }}>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '12px',
                    color: '#fff',
                    wordBreak: 'break-all',
                  }}>
                    {wallet.injectiveAddress}
                  </p>
                </div>

                <button
                  onClick={copyAddress}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  {copied ? <Check size={18} color="#10b981" /> : <Copy size={18} />}
                  {copied ? 'Copied!' : 'Copy Address'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
