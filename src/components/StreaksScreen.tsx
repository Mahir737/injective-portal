import { Flame, Calendar, Shield, TrendingUp, Award, Zap } from 'lucide-react';
import { usePointsStore } from '../store/pointsStore';
import GlassCard from './GlassCard';

const StreaksScreen = () => {
  const { 
    currentStreak, 
    longestStreak, 
    lastActivityDate,
    streakProtectionUsed,
    useStreakProtection,
    canClaimDailyBonus,
  } = usePointsStore();

  const streakBonus = Math.min(currentStreak * 50, 500);
  const daysUntilMaxBonus = Math.max(0, Math.ceil((500 - streakBonus) / 50));

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
    background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '8px',
  };

  return (
    <div style={scrollContainerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>STREAKS</h1>
        <p style={{
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.5)',
          letterSpacing: '0.2em',
        }}>
          KEEP THE FIRE BURNING
        </p>
      </header>

      {/* Current Streak */}
      <GlassCard delay={0.2} style={{ marginBottom: '20px' }}>
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(239, 68, 68, 0.2) 100%)',
            border: '3px solid #f59e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 0 40px rgba(245, 158, 11, 0.4)',
          }}>
            <Flame size={50} color="#f59e0b" />
          </div>

          <p style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.5)',
            marginBottom: '8px',
            letterSpacing: '0.1em',
          }}>
            CURRENT STREAK
          </p>

          <p style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '48px',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px',
          }}>
            {currentStreak}
          </p>

          <p style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '20px',
          }}>
            {currentStreak === 1 ? 'day' : 'days'} in a row
          </p>

          {/* Streak Bonus */}
          <div style={{
            padding: '12px 20px',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(239, 68, 68, 0.1) 100%)',
            borderRadius: '16px',
            border: '1px solid rgba(245, 158, 11, 0.3)',
          }}>
            <p style={{
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.5)',
              marginBottom: '4px',
            }}>
              STREAK BONUS
            </p>
            <p style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '20px',
              fontWeight: 700,
              color: '#f59e0b',
            }}>
              +{streakBonus} pts per transaction
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        marginBottom: '20px',
      }}>
        <GlassCard delay={0.3}>
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <Award size={24} color="#FFD700" style={{ margin: '0 auto 12px' }} />
            <p style={{
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.5)',
              marginBottom: '4px',
            }}>
              LONGEST STREAK
            </p>
            <p style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '24px',
              fontWeight: 700,
              color: '#FFD700',
            }}>
              {longestStreak}
            </p>
            <p style={{
              fontSize: '10px',
              color: 'rgba(255, 255, 255, 0.5)',
            }}>
              days
            </p>
          </div>
        </GlassCard>

        <GlassCard delay={0.35}>
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <TrendingUp size={24} color="#10b981" style={{ margin: '0 auto 12px' }} />
            <p style={{
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.5)',
              marginBottom: '4px',
            }}>
              MAX BONUS IN
            </p>
            <p style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '24px',
              fontWeight: 700,
              color: '#10b981',
            }}>
              {daysUntilMaxBonus}
            </p>
            <p style={{
              fontSize: '10px',
              color: 'rgba(255, 255, 255, 0.5)',
            }}>
              days
            </p>
          </div>
        </GlassCard>
      </div>

      {/* Streak Protection */}
      <GlassCard delay={0.4} style={{ marginBottom: '20px' }}>
        <div style={{ padding: '20px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px',
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '16px',
              background: streakProtectionUsed 
                ? 'rgba(239, 68, 68, 0.2)'
                : 'linear-gradient(135deg, rgba(0, 242, 254, 0.2) 0%, rgba(158, 127, 255, 0.2) 100%)',
              border: streakProtectionUsed 
                ? '2px solid #ef4444'
                : '2px solid #00F2FE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Shield size={24} color={streakProtectionUsed ? '#ef4444' : '#00F2FE'} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '4px',
              }}>
                Streak Protection
              </h3>
              <p style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.6)',
              }}>
                {streakProtectionUsed 
                  ? 'Protection used - maintain your streak!'
                  : 'Miss a day? Your streak is protected once'}
              </p>
            </div>
          </div>

          <div style={{
            padding: '12px',
            background: streakProtectionUsed 
              ? 'rgba(239, 68, 68, 0.1)'
              : 'rgba(0, 242, 254, 0.05)',
            borderRadius: '12px',
            border: streakProtectionUsed 
              ? '1px solid rgba(239, 68, 68, 0.2)'
              : '1px solid rgba(0, 242, 254, 0.1)',
          }}>
            <p style={{
              fontSize: '11px',
              color: streakProtectionUsed ? '#ef4444' : '#00F2FE',
              textAlign: 'center',
              fontWeight: 600,
            }}>
              {streakProtectionUsed 
                ? '⚠️ Protection Already Used'
                : '✓ Protection Available'}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* How Streaks Work */}
      <GlassCard delay={0.5}>
        <div style={{ padding: '20px' }}>
          <h3 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '16px',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <Zap size={18} color="#f59e0b" />
            How Streaks Work
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              padding: '12px',
              background: 'rgba(245, 158, 11, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(245, 158, 11, 0.1)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '8px',
              }}>
                <Calendar size={18} color="#f59e0b" />
                <p style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#fff',
                }}>
                  Daily Activity
                </p>
              </div>
              <p style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: 1.5,
              }}>
                Complete at least one transaction each day to maintain your streak
              </p>
            </div>

            <div style={{
              padding: '12px',
              background: 'rgba(0, 242, 254, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(0, 242, 254, 0.1)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '8px',
              }}>
                <TrendingUp size={18} color="#00F2FE" />
                <p style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#fff',
                }}>
                  Bonus Points
                </p>
              </div>
              <p style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: 1.5,
              }}>
                Earn +50 bonus points per day, up to +500 points maximum
              </p>
            </div>

            <div style={{
              padding: '12px',
              background: 'rgba(158, 127, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(158, 127, 255, 0.1)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '8px',
              }}>
                <Shield size={18} color="#9E7FFF" />
                <p style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#fff',
                }}>
                  Protection
                </p>
              </div>
              <p style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: 1.5,
              }}>
                Miss one day? Your streak is protected once per streak period
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Last Activity */}
      {lastActivityDate && (
        <div style={{
          marginTop: '20px',
          padding: '12px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '12px',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.5)',
          }}>
            Last activity: {new Date(lastActivityDate).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default StreaksScreen;
