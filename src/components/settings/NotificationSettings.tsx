import React from 'react';
import { Bell, Mail, TrendingUp, Newspaper } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

const NotificationSettings: React.FC = () => {
  const { settings, updateNotifications } = useSettings();

  const toggleStyle = (active: boolean): React.CSSProperties => ({
    width: '48px',
    height: '28px',
    borderRadius: '14px',
    background: active 
      ? 'linear-gradient(135deg, #00F2FE 0%, #9E7FFF 100%)'
      : 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  });

  const toggleKnobStyle = (active: boolean): React.CSSProperties => ({
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    background: '#fff',
    position: 'absolute',
    top: '3px',
    left: active ? '23px' : '3px',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  });

  const settingItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    marginBottom: '12px',
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
  };

  const textStyle: React.CSSProperties = {
    color: '#fff',
    fontSize: '15px',
    fontWeight: 500,
  };

  const descStyle: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '12px',
    marginTop: '4px',
  };

  return (
    <div>
      {/* Push Notifications */}
      <div style={settingItemStyle}>
        <div style={labelStyle}>
          <Bell size={20} color="#00F2FE" />
          <div>
            <div style={textStyle}>Push Notifications</div>
            <div style={descStyle}>Receive push notifications on this device</div>
          </div>
        </div>
        <div 
          style={toggleStyle(settings.notifications.pushEnabled)}
          onClick={() => updateNotifications({ pushEnabled: !settings.notifications.pushEnabled })}
        >
          <div style={toggleKnobStyle(settings.notifications.pushEnabled)} />
        </div>
      </div>

      {/* Email Notifications */}
      <div style={settingItemStyle}>
        <div style={labelStyle}>
          <Mail size={20} color="#9E7FFF" />
          <div>
            <div style={textStyle}>Email Notifications</div>
            <div style={descStyle}>Receive important updates via email</div>
          </div>
        </div>
        <div 
          style={toggleStyle(settings.notifications.emailEnabled)}
          onClick={() => updateNotifications({ emailEnabled: !settings.notifications.emailEnabled })}
        >
          <div style={toggleKnobStyle(settings.notifications.emailEnabled)} />
        </div>
      </div>

      {/* Transaction Alerts */}
      <div style={settingItemStyle}>
        <div style={labelStyle}>
          <Bell size={20} color="#10b981" />
          <div>
            <div style={textStyle}>Transaction Alerts</div>
            <div style={descStyle}>Get notified about your transactions</div>
          </div>
        </div>
        <div 
          style={toggleStyle(settings.notifications.transactionAlerts)}
          onClick={() => updateNotifications({ transactionAlerts: !settings.notifications.transactionAlerts })}
        >
          <div style={toggleKnobStyle(settings.notifications.transactionAlerts)} />
        </div>
      </div>

      {/* Price Alerts */}
      <div style={settingItemStyle}>
        <div style={labelStyle}>
          <TrendingUp size={20} color="#f59e0b" />
          <div>
            <div style={textStyle}>Price Alerts</div>
            <div style={descStyle}>Notifications for significant price changes</div>
          </div>
        </div>
        <div 
          style={toggleStyle(settings.notifications.priceAlerts)}
          onClick={() => updateNotifications({ priceAlerts: !settings.notifications.priceAlerts })}
        >
          <div style={toggleKnobStyle(settings.notifications.priceAlerts)} />
        </div>
      </div>

      {/* News Updates */}
      <div style={settingItemStyle}>
        <div style={labelStyle}>
          <Newspaper size={20} color="#f472b6" />
          <div>
            <div style={textStyle}>News & Updates</div>
            <div style={descStyle}>Stay informed about Injective ecosystem</div>
          </div>
        </div>
        <div 
          style={toggleStyle(settings.notifications.newsUpdates)}
          onClick={() => updateNotifications({ newsUpdates: !settings.notifications.newsUpdates })}
        >
          <div style={toggleKnobStyle(settings.notifications.newsUpdates)} />
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
