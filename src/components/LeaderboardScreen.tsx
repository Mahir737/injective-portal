import { useState, useEffect } from 'react';
import { Trophy, Medal, Crown, TrendingUp, Award, Zap } from 'lucide-react';
import { usePointsStore } from '../store/pointsStore';
import GlassCard from './GlassCard';

interface LeaderboardEntry {
  address: string;
  points: number;
  level: number;
  rank: number;
}

const LeaderboardScreen = () => {
  const { points, level } = usePointsStore();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number>(0);

  useEffect(() => {
    // Generate mock leaderboard data
    // In production, this would fetch from a backend API
    const mockLeaderboard: LeaderboardEntry[] = [
      { address: 'inj1abc...xyz1', points: 25000, level: 26, rank: 1 },
      { address: 'inj1def...xyz2', points: 22000, level: 23, rank: 2 },
      { address: 'inj1ghi...xyz3', points: 19500, level: 20, rank: 3 },
      { address: 'inj1jkl...xyz4', points: 17000, level: 18, rank: 4 },
      { address: 'inj1mno...xyz5', points: 15500, level: 16, rank: 5 },
      { address: 'inj1pqr...xyz6', points: 14000, level: 15, rank: 6 },
      { address: 'inj1stu...xyz7', points: 12500, level: 13, rank: 7 },
      { address: 'inj1vwx...xyz8', points: 11000, level: 12, rank: 8 },
      { address: 'inj1yza...xyz9', points: 9500, level: 10, rank: 9 },
      { address: 'inj1bcd...xy10', points: 8000, level: 9, rank: 10 },
    ];

    // Calculate user's rank based on their points
    const userEntry: LeaderboardEntry = {
      address: 'You',
      points,
      level,
      rank: mockLeaderboard.filter(entry => entry.points > points).length + 1,
    };

    setUserRank(userEntry.rank);
    setLeaderboard(mockLeaderboard);
  }, [points, level]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown size={24} color="#FFD700" />;
      case 2:
        return <Medal size={24} color="#C0C0C0" />;
      case 3:
        return <Medal size={24} color="#CD7F32" />;
      default:
        return <Trophy size={20} color="rgba(255, 255, 255, 0.5)" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#FFD700';
      case 2:
        return '#C0C0C0';
      case 3:
        return '#CD7F32';
      default:
        return 'rgba(255, 255, 255, 0.7)';
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
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '8px',
  };

  return (
    <div style={scrollContainerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>LEADERBOARD</h1>
        <p style={{
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.5)',
          letterSpacing: '0.2em',
        }}>
          TOP PERFORMERS
        </p>
      </header>

      {/* User Rank Card */}
      <GlassCard delay={0.2} style={{ marginBottom: '20px' }}>
        <div style={{ padding: '20px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.2) 0%, rgba(158, 127, 255, 0.2) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Award size={24} color="#00F2FE" />
              </div>
              <div>
                <p style={{
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginBottom: '4px',
                }}>
                  YOUR RANK
                </p>
                <p style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#00F2FE',
                }}>
                  #{userRank}
                </p>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.5)',
                marginBottom: '4px',
              }}>
                TOTAL POINTS
              </p>
              <p style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff',
              }}>
                {points.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Top 3 Podium */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '12px',
        marginBottom: '20px',
      }}>
        {/* 2nd Place */}
        {leaderboard[1] && (
          <GlassCard delay={0.3}>
            <div style={{
              padding: '16px',
              textAlign: 'center',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
              }}>
                {getRankIcon(2)}
              </div>
              <p style={{
                fontSize: '10px',
                color: 'rgba(255, 255, 255, 0.5)',
                marginTop: '20px',
                marginBottom: '4px',
              }}>
                2ND PLACE
              </p>
              <p style={{
                fontSize: '11px',
                color: '#C0C0C0',
                fontWeight: 600,
                marginBottom: '8px',
              }}>
                {leaderboard[1].address}
              </p>
              <p style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '16px',
                fontWeight: 700,
                color: '#fff',
              }}>
                {leaderboard[1].points.toLocaleString()}
              </p>
            </div>
          </GlassCard>
        )}

        {/* 1st Place */}
        {leaderboard[0] && (
          <GlassCard delay={0.25}>
            <div style={{
              padding: '16px',
              textAlign: 'center',
              position: 'relative',
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 165, 0, 0.05) 100%)',
            }}>
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
              }}>
                {getRankIcon(1)}
              </div>
              <p style={{
                fontSize: '10px',
                color: 'rgba(255, 215, 0, 0.8)',
                marginTop: '20px',
                marginBottom: '4px',
                fontWeight: 700,
              }}>
                1ST PLACE
              </p>
              <p style={{
                fontSize: '11px',
                color: '#FFD700',
                fontWeight: 600,
                marginBottom: '8px',
              }}>
                {leaderboard[0].address}
              </p>
              <p style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '18px',
                fontWeight: 700,
                color: '#FFD700',
              }}>
                {leaderboard[0].points.toLocaleString()}
              </p>
            </div>
          </GlassCard>
        )}

        {/* 3rd Place */}
        {leaderboard[2] && (
          <GlassCard delay={0.35}>
            <div style={{
              padding: '16px',
              textAlign: 'center',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
              }}>
                {getRankIcon(3)}
              </div>
              <p style={{
                fontSize: '10px',
                color: 'rgba(255, 255, 255, 0.5)',
                marginTop: '20px',
                marginBottom: '4px',
              }}>
                3RD PLACE
              </p>
              <p style={{
                fontSize: '11px',
                color: '#CD7F32',
                fontWeight: 600,
                marginBottom: '8px',
              }}>
                {leaderboard[2].address}
              </p>
              <p style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '16px',
                fontWeight: 700,
                color: '#fff',
              }}>
                {leaderboard[2].points.toLocaleString()}
              </p>
            </div>
          </GlassCard>
        )}
      </div>

      {/* Full Leaderboard */}
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
          <TrendingUp size={16} color="#00F2FE" />
          TOP 10 RANKINGS
        </h2>

        {leaderboard.map((entry, index) => (
          <GlassCard key={entry.address} delay={0.4 + index * 0.05} style={{ marginBottom: '8px' }}>
            <div style={{
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: index < 3 
                    ? `linear-gradient(135deg, ${getRankColor(entry.rank)}20 0%, ${getRankColor(entry.rank)}10 100%)`
                    : 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {getRankIcon(entry.rank)}
                </div>
                <div>
                  <p style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: getRankColor(entry.rank),
                    marginBottom: '2px',
                  }}>
                    {entry.address}
                  </p>
                  <p style={{
                    fontSize: '11px',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}>
                    Level {entry.level}
                  </p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '2px',
                }}>
                  {entry.points.toLocaleString()}
                </p>
                <p style={{
                  fontSize: '10px',
                  color: 'rgba(255, 255, 255, 0.5)',
                }}>
                  points
                </p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Info Card */}
      <GlassCard delay={0.9}>
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <Zap size={20} color="#00F2FE" style={{ margin: '0 auto 8px' }} />
          <p style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.6)',
            lineHeight: 1.6,
          }}>
            Rankings update in real-time based on total points earned. 
            Keep earning to climb the leaderboard!
          </p>
        </div>
      </GlassCard>
    </div>
  );
};

export default LeaderboardScreen;
