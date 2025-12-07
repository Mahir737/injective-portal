import React from 'react';
import { Moon, Sun, Monitor, Palette, Type } from 'lucide-react';
import { useSettings, ThemeMode } from '../../contexts/SettingsContext';

const ThemeSettings: React.FC = () => {
  const { settings, updateTheme, updateFontSize } = useSettings();

  const themeOptions: { value: ThemeMode; label: string; icon: React.ElementType }[] = [
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'auto', label: 'Auto', icon: Monitor },
  ];

  const themeCardStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '16px',
    background: isActive 
      ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.1) 0%, rgba(158, 127, 255, 0.1) 100%)'
      : 'rgba(255, 255, 255, 0.03)',
    border: `1px solid ${isActive ? 'rgba(0, 242, 254, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'center',
  });

  const iconWrapperStyle = (isActive: boolean): React.CSSProperties => ({
    width: '48px',
    height: '48px',
    margin: '0 auto 8px',
    borderRadius: '12px',
    background: isActive ? 'rgba(0, 242, 254, 0.2)' : 'rgba(255, 255, 255, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

  const labelStyle: React.CSSProperties = {
    color: '#fff',
    fontSize: '14px',
    fontWeight: 600,
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
    marginBottom: '12px',
    marginTop: '24px',
  };

  const sliderContainerStyle: React.CSSProperties = {
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
  };

  const sliderStyle: React.CSSProperties = {
    width: '100%',
    height: '6px',
    borderRadius: '3px',
    background: 'rgba(255, 255, 255, 0.1)',
    outline: 'none',
    marginTop: '12px',
  };

  const fontSizeDisplayStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#fff',
    fontSize: '14px',
  };

  return (
    <div>
      <h3 style={sectionTitleStyle}>
        <Palette size={16} style={{ display: 'inline', marginRight: '8px' }} />
        Theme Mode
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {themeOptions.map(option => {
          const Icon = option.icon;
          const isActive = settings.theme === option.value;
          return (
            <div
              key={option.value}
              style={themeCardStyle(isActive)}
              onClick={() => updateTheme(option.value)}
            >
              <div style={iconWrapperStyle(isActive)}>
                <Icon size={24} color={isActive ? '#00F2FE' : '#fff'} />
              </div>
              <div style={labelStyle}>{option.label}</div>
            </div>
          );
        })}
      </div>

      <h3 style={sectionTitleStyle}>
        <Type size={16} style={{ display: 'inline', marginRight: '8px' }} />
        Font Size
      </h3>

      <div style={sliderContainerStyle}>
        <div style={fontSizeDisplayStyle}>
          <span>Text Size</span>
          <span style={{ fontWeight: 600 }}>{settings.fontSize}px</span>
        </div>
        <input
          type="range"
          min="12"
          max="24"
          value={settings.fontSize}
          onChange={(e) => updateFontSize(Number(e.target.value))}
          style={sliderStyle}
        />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '8px',
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.5)'
        }}>
          <span>Small</span>
          <span>Large</span>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
