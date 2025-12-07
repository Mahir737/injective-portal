import { useState } from 'react';
import { Gift, Percent, Headphones, BarChart3, Palette, Award, Image, Zap, Crown, Check, X } from 'lucide-react';
import { usePointsStore, REWARDS_CATALOG } from '../store/pointsStore';
import GlassCard from './GlassCard';

const iconMap: Record<string, any> = {
  Percent,
  Headphones,
  BarChart3,
  Palette,
  Award,
  Image,
  Zap,
  Crown,
};

const RewardsScreen = () => {
  const { points, redeemedRewards, redeemReward } = usePointsStore();
  const [filter, setFilter] = useState<'all' | 'perks' | 'cosmetic' | 'exclusive'>('all');
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  const filteredRewards = REWARDS_CATALOG.filter(reward => {
    if (filter === 'all') return true;
    return reward.category === filter;
  });

  const handleRedeem = (rewardId: string) => {
    const success = redeemReward(rewardId);
    if (success) {
      setShowConfirm(null);
      // Show success notification (you can add a toast here)
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'perks': return '#00F2FE';
      case 'cosmetic': return '#9E7FFF';
      case 'exclusive': return '#f472b6';
      default: return '#fff';
    }
  };

  const scrollContainerStyle: React.CSSProperties = {
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '60px 20px 100px',
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '30px',
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '28px',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #f472b6 0%, #9E7FFF 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '8px',
  };

  return (
    <div style={scrollContainerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>REWARDS</h1>
        <p style={{
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.5)',
          letterSpacing: '0.2em',
        }}>
          REDEEM YOUR POINTS
        </p>
      </header>

      {/* Points Balance */}
      <GlassCard delay={0.2} style={{ marginBottom: '20px' }}>
        <div style={{ padding: '20px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}>
            <div>
              <p style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.5)',
                marginBottom: '4px',
              }}>
                AVAILABLE POINTS
              </p>
              <p style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '32px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #00F2FE 0%, #9E7FFF 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {points.toLocaleString()}
              </p>
            </div>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.2) 0%, rgba(158, 127, 255, 0.2) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Gift size={28} color="#f472b6" />
            </div>
          </div>

          {/* Filter Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px',
          }}>
            {(['all', 'perks', 'cosmetic', 'exclusive'] as const).map(filterType => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                style={{
                  padding: '8px 4px',
                  background: filter === filterType 
                    ? 'linear-gradient(135deg, rgba(244, 114, 182, 0.2) 0%, rgba(158, 127, 255, 0.2) 100%)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: filter === filterType 
                    ? '1px solid rgba(244, 114, 182, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  color: filter === filterType ? '#f472b6' : 'rgba(255, 255, 255, 0.5)',
                  fontSize: '10px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  transition: 'all 0.3s ease',
                }}
              >
                {filterType}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Rewards Grid */}
      <div style={{ marginBottom: '20px' }}>
        {filteredRewards.map((reward, index) => {
          const Icon = iconMap[reward.icon] || Gift;
          const categoryColor = getCategoryColor(reward.category);
          const isRedeemed = redeemedRewards.includes(reward.id);
          const canAfford = points >= reward.cost;

          return (
            <GlassCard key={reward.id} delay={0.3 + index * 0.05} style={{ marginBottom: '12px' }}>
              <div style={{
                padding: '16px',
                opacity: isRedeemed ? 0.5 : 1,
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  marginBottom: '12px',
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    background: `linear-gradient(135deg, ${categoryColor}30 0%, ${categoryColor}10 100%)`,
                    border: `2px solid ${categoryColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}>
                    <Icon size={28} color={categoryColor} />
                    {isRedeemed && (
                      <div style={{
                        position: 'absolute',
                        top: '-6px',
                        right: '-6px',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: '#10b981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Check size={14} color="#fff" />
                      </div>
                    )}
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#fff',
                      marginBottom: '4px',
                    }}>
                      {reward.title}
                    </h3>
                    <p style={{
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.6)',
                      marginBottom: '12px',
                      lineHeight: 1.5,
                    }}>
                      {reward.description}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                    }}>
                      <div>
                        <span style={{
                          fontSize: '10px',
                          color: categoryColor,
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          fontWeight: 600,
                        }}>
                          {reward.category}
                        </span>
                        <p style={{
                          fontFamily: "'Orbitron', sans-serif",
                          fontSize: '18px',
                          fontWeight: 700,
                          color: canAfford ? '#00F2FE' : '#ef4444',
                          marginTop: '4px',
                        }}>
                          {reward.cost.toLocaleString()} pts
                        </p>
                      </div>

                      {!isRedeemed && (
                        <button
                          onClick={() => setShowConfirm(reward.id)}
                          disabled={!canAfford}
                          style={{
                            padding: '10px 20px',
                            background: canAfford
                              ? `linear-gradient(135deg, ${categoryColor}40 0%, ${categoryColor}20 100%)`
                              : 'rgba(255, 255, 255, 0.05)',
                            border: `1px solid ${canAfford ? categoryColor : 'rgba(255, 255, 255, 0.1)'}`,
                            borderRadius: '12px',
                            color: canAfford ? categoryColor : 'rgba(255, 255, 255, 0.3)',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: canAfford ? 'pointer' : 'not-allowed',
                            transition: 'all 0.3s ease',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}
                        >
                          Redeem
                        </button>
                      )}

                      {isRedeemed && (
                        <div style={{
                          padding: '10px 20px',
                          background: 'rgba(16, 185, 129, 0.2)',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          borderRadius: '12px',
                          color: '#10b981',
                          fontSize: '12px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}>
                          Redeemed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
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
          <GlassCard delay={0}>
            <div style={{ padding: '24px', maxWidth: '400px' }}>
              {(() => {
                const reward = REWARDS_CATALOG.find(r => r.id === showConfirm);
                if (!reward) return null;

                const Icon = iconMap[reward.icon] || Gift;
                const categoryColor = getCategoryColor(reward.category);

                return (
                  <>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '20px',
                      background: `linear-gradient(135deg, ${categoryColor}30 0%, ${categoryColor}10 100%)`,
                      border: `2px solid ${categoryColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                    }}>
                      <Icon size={40} color={categoryColor} />
                    </div>

                    <h3 style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#fff',
                      textAlign: 'center',
                      marginBottom: '12px',
                    }}>
                      Confirm Redemption
                    </h3>

                    <p style={{
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      textAlign: 'center',
                      marginBottom: '20px',
                      lineHeight: 1.6,
                    }}>
                      Redeem <strong>{reward.title}</strong> for <strong>{reward.cost.toLocaleString()} points</strong>?
                    </p>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '12px',
                    }}>
                      <button
                        onClick={() => setShowConfirm(null)}
                        style={{
                          padding: '12px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '12px',
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '14px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleRedeem(reward.id)}
                        style={{
                          padding: '12px',
                          background: `linear-gradient(135deg, ${categoryColor}40 0%, ${categoryColor}20 100%)`,
                          border: `1px solid ${categoryColor}`,
                          borderRadius: '12px',
                          color: categoryColor,
                          fontSize: '14px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Confirm
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default RewardsScreen;
