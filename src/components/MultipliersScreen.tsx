import { Zap, Clock, TrendingUp, Sparkles, Calendar, Award } from 'lucide-react';
import { usePointsStore } from '../store/pointsStore';
import GlassCard from './GlassCard';

const MultipliersScreen = () => {
  const { activeMultiplier, multiplierEvents } = usePointsStore();

  // Mock upcoming events (in production, this would come from backend)
  const upcomingEvents = [
    {
      id: 'weekend_boost',
      name: 'Weekend Boost',
      multiplier: 2,
      startTime: Date.now() + 2 * 24 * 60 * 60 * 1000,
      endTime: Date.now() + 4 * 24 * 60 * 60 * 1000,
      description: 'Double points on all transactions',
    },
    {
      id: 'happy_hour',
      name: 'Happy Hour',
      multiplier: 3,
      startTime: Date.now() + 5 * 24 * 60 * 60 * 1000,
      endTime: Date.now() + 5 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
      description: 'Triple points for 2 hours',
    },
    {
      id: 'mega_monday',
      name: 'Mega Monday',
      multiplier: 2.5,
      startTime: Date.now() + 7 * 24 * 60 * 60 * 1000,
      endTime: Date.now() + 8 * 24 * 60 * 60 * 1000,
      description: '2.5x points all day Monday',
    },
  ];

  const formatTimeUntil = (timestamp: number) => {
    const diff = timestamp - Date.now();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  const getMultiplierColor = (multiplier: number) => {
    if (multiplier >= 3) return '#f472b6';
    if (multiplier >= 2) return '#9E7FFF';
    return '#00F2FE';
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
    background: 'linear-gradient(135deg, #00F2FE 0%, #9E7FFF 50%, #f472b6 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '8px',
  };

  return (
    <div style={scrollContainerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>MULTIPLIERS</h1>
        <p style={{
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.5)',
          letterSpacing: '0.2em',
        }}>
          BOOST YOUR EARNINGS
        </p>
      </header>

      {/* Active Multiplier */}
      <GlassCard delay={0.2} style={{ marginBottom: '20px' }}>
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: activeMultiplier > 1
              ? `linear-gradient(135deg, ${getMultiplierColor(activeMultiplier)}40 0%, ${getMultiplierColor(activeMultiplier)}20 100%)`
              : 'rgba(255, 255, 255, 0.05)',
            border: activeMultiplier > 1
              ? `3px solid ${getMultiplierColor(activeMultiplier)}`
              : '3px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: activeMultiplier > 1
              ? `0 0 40px ${getMultiplierColor(activeMultiplier)}60`
              : 'none',
          }}>
            <Zap 
              size={50} 
              color={activeMultiplier > 1 ? getMultiplierColor(activeMultiplier) : 'rgba(255, 255, 255, 0.3)'} 
            />
          </div>

          <p style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.5)',
            marginBottom: '8px',
            letterSpacing: '0.1em',
          }}>
            ACTIVE MULTIPLIER
          </p>

          <p style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '48px',
            fontWeight: 800,
            color: activeMultiplier > 1 ? getMultiplierColor(activeMultiplier) : 'rgba(255, 255, 255, 0.3)',
            marginBottom: '8px',
          }}>
            {activeMultiplier}x
          </p>

          <p style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.7)',
          }}>
            {activeMultiplier > 1 ? 'Boost Active!' : 'No active boost'}
          </p>
        </div>
      </GlassCard>

      {/* How It Works */}
      <GlassCard delay={0.3} style={{ marginBottom: '20px' }}>
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
            <Sparkles size={18} color="#00F2FE" />
            How Multipliers Work
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                  Multiply Your Points
                </p>
              </div>
              <p style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: 1.5,
              }}>
                During special events, all points earned are multiplied by the active boost
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
                <Clock size={18} color="#9E7FFF" />
                <p style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#fff',
                }}>
                  Limited Time
                </p>
              </div>
              <p style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: 1.5,
              }}>
                Multiplier events run for a limited time - don't miss out!
              </p>
            </div>

            <div style={{
              padding: '12px',
              background: 'rgba(244, 114, 182, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(244, 114, 182, 0.1)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '8px',
              }}>
                <Award size={18} color="#f472b6" />
                <p style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#fff',
                }}>
                  Stack with Bonuses
                </p>
              </div>
              <p style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: 1.5,
              }}>
                Multipliers stack with streak bonuses and large transaction bonuses
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Upcoming Events */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '14px',
          fontWeight: 600,
          color: 'rgba(255, 255, 255, 0.7)',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <Calendar size={16} color="#00F2FE" />
          UPCOMING EVENTS
        </h2>

        {upcomingEvents.map((event, index) => {
          const multiplierColor = getMultiplierColor(event.multiplier);

          return (
            <GlassCard key={event.id} delay={0.4 + index * 0.05} style={{ marginBottom: '12px' }}>
              <div style={{ padding: '16px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    background: `linear-gradient(135deg, ${multiplierColor}30 0%, ${multiplierColor}10 100%)`,
                    border: `2px solid ${multiplierColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <p style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: '20px',
                      fontWeight: 800,
                      color: multiplierColor,
                    }}>
                      {event.multiplier}x
                    </p>
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#fff',
                      marginBottom: '4px',
                    }}>
                      {event.name}
                    </h3>
                    <p style={{
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.6)',
                      marginBottom: '12px',
                    }}>
                      {event.description}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                      <Clock size={14} color={multiplierColor} />
                      <p style={{
                        fontSize: '11px',
                        color: multiplierColor,
                        fontWeight: 600,
                      }}>
                        Starts in {formatTimeUntil(event.startTime)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Info Card */}
      <GlassCard delay={0.7}>
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <Sparkles size={20} color="#00F2FE" style={{ margin: '0 auto 8px' }} />
          <p style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.6)',
            lineHeight: 1.6,
          }}>
            Check back regularly for new multiplier events and maximize your point earnings!
          </p>
        </div>
      </GlassCard>
    </div>
  );
};

export default MultipliersScreen;
