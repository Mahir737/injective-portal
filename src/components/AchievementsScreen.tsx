import { useState } from 'react';
import { Award, Lock, Star, Zap, TrendingUp, Activity, Sparkles, Crown, DollarSign, Sunrise, Flame } from 'lucide-react';
import { usePointsStore } from '../store/pointsStore';
import GlassCard from './GlassCard';

const iconMap: Record<string, any> = {
  Zap,
  TrendingUp,
  Activity,
  Award,
  Star,
  Sparkles,
  Crown,
  DollarSign,
  Sunrise,
  Flame,
};

const AchievementsScreen = () => {
  const { achievements, unlockedAchievements, points, level, transactions, currentStreak } = usePointsStore();
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'unlocked') return achievement.unlocked;
    if (filter === 'locked') return !achievement.unlocked;
    return true;
  });

  const unlockedCount = unlockedAchievements.length;
  const totalCount = achievements.length;
  const completionPercentage = (unlockedCount / totalCount) * 100;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'transactions': return '#00F2FE';
      case 'points': return '#9E7FFF';
      case 'level': return '#f472b6';
      case 'streak': return '#f59e0b';
      case 'special': return '#10b981';
      default: return '#fff';
    }
  };

  const getProgress = (achievement: any) => {
    switch (achievement.category) {
      case 'transactions':
        return Math.min((transactions / achievement.requirement) * 100, 100);
      case 'points':
        return Math.min((points / achievement.requirement) * 100, 100);
      case 'level':
        return Math.min((level / achievement.requirement) * 100, 100);
      case 'streak':
        return Math.min((currentStreak / achievement.requirement) * 100, 100);
      default:
        return achievement.unlocked ? 100 : 0;
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
    background: 'linear-gradient(135deg, #00F2FE 0%, #9E7FFF 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '8px',
  };

  return (
    <div style={scrollContainerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>ACHIEVEMENTS</h1>
        <p style={{
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.5)',
          letterSpacing: '0.2em',
        }}>
          UNLOCK YOUR POTENTIAL
        </p>
      </header>

      {/* Progress Overview */}
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
                COMPLETION
              </p>
              <p style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '24px',
                fontWeight: 700,
                color: '#00F2FE',
              }}>
                {unlockedCount}/{totalCount}
              </p>
            </div>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: `conic-gradient(#00F2FE ${completionPercentage}%, rgba(255, 255, 255, 0.1) ${completionPercentage}%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: '#171717',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 700,
                color: '#00F2FE',
              }}>
                {Math.round(completionPercentage)}%
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
          }}>
            {(['all', 'unlocked', 'locked'] as const).map(filterType => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                style={{
                  padding: '8px',
                  background: filter === filterType 
                    ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.2) 0%, rgba(158, 127, 255, 0.2) 100%)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: filter === filterType 
                    ? '1px solid rgba(0, 242, 254, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  color: filter === filterType ? '#00F2FE' : 'rgba(255, 255, 255, 0.5)',
                  fontSize: '11px',
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

      {/* Achievements List */}
      <div style={{ marginBottom: '20px' }}>
        {filteredAchievements.map((achievement, index) => {
          const Icon = iconMap[achievement.icon] || Award;
          const progress = getProgress(achievement);
          const categoryColor = getCategoryColor(achievement.category);

          return (
            <GlassCard key={achievement.id} delay={0.3 + index * 0.05} style={{ marginBottom: '12px' }}>
              <div style={{
                padding: '16px',
                opacity: achievement.unlocked ? 1 : 0.6,
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  marginBottom: '12px',
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '16px',
                    background: achievement.unlocked
                      ? `linear-gradient(135deg, ${categoryColor}30 0%, ${categoryColor}10 100%)`
                      : 'rgba(255, 255, 255, 0.05)',
                    border: `2px solid ${achievement.unlocked ? categoryColor : 'rgba(255, 255, 255, 0.1)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}>
                    {achievement.unlocked ? (
                      <Icon size={24} color={categoryColor} />
                    ) : (
                      <Lock size={20} color="rgba(255, 255, 255, 0.3)" />
                    )}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px',
                    }}>
                      <h3 style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: achievement.unlocked ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                      }}>
                        {achievement.title}
                      </h3>
                      {achievement.unlocked && (
                        <Star size={14} color="#FFD700" fill="#FFD700" />
                      )}
                    </div>
                    <p style={{
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.5)',
                      marginBottom: '8px',
                    }}>
                      {achievement.description}
                    </p>

                    {/* Progress Bar */}
                    {!achievement.unlocked && achievement.category !== 'special' && (
                      <div style={{
                        width: '100%',
                        height: '6px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        marginBottom: '8px',
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${progress}%`,
                          background: `linear-gradient(90deg, ${categoryColor} 0%, ${categoryColor}80 100%)`,
                          borderRadius: '10px',
                          transition: 'width 0.5s ease',
                        }} />
                      </div>
                    )}

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                      <span style={{
                        fontSize: '10px',
                        color: categoryColor,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontWeight: 600,
                      }}>
                        {achievement.category}
                      </span>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: achievement.unlocked ? '#10b981' : '#f59e0b',
                      }}>
                        +{achievement.reward} pts
                      </span>
                    </div>
                  </div>
                </div>

                {achievement.unlocked && achievement.unlockedAt && (
                  <div style={{
                    padding: '8px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                  }}>
                    <p style={{
                      fontSize: '10px',
                      color: '#10b981',
                      textAlign: 'center',
                    }}>
                      Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </GlassCard>
          );
        })}
      </div>

      {filteredAchievements.length === 0 && (
        <GlassCard delay={0.3}>
          <div style={{ padding: '40px 20px', textAlign: 'center' }}>
            <Award size={40} color="rgba(255, 255, 255, 0.3)" style={{ margin: '0 auto 16px' }} />
            <p style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.5)',
            }}>
              No achievements in this category yet
            </p>
          </div>
        </GlassCard>
      )}
    </div>
  );
};

export default AchievementsScreen;
