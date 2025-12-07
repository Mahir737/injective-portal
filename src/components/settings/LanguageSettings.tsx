import React from 'react';
import { Globe, Check } from 'lucide-react';
import { useSettings, Language } from '../../contexts/SettingsContext';

const LanguageSettings: React.FC = () => {
  const { settings, updateLanguage } = useSettings();

  const languages: { value: Language; label: string; nativeName: string }[] = [
    { value: 'en', label: 'English', nativeName: 'English' },
    { value: 'es', label: 'Spanish', nativeName: 'Español' },
    { value: 'zh', label: 'Chinese', nativeName: '中文' },
    { value: 'ja', label: 'Japanese', nativeName: '日本語' },
    { value: 'ko', label: 'Korean', nativeName: '한국어' },
    { value: 'fr', label: 'French', nativeName: 'Français' },
    { value: 'de', label: 'German', nativeName: 'Deutsch' },
    { value: 'ru', label: 'Russian', nativeName: 'Русский' },
  ];

  const languageItemStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    background: isActive 
      ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.1) 0%, rgba(158, 127, 255, 0.1) 100%)'
      : 'rgba(255, 255, 255, 0.03)',
    border: `1px solid ${isActive ? 'rgba(0, 242, 254, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
    borderRadius: '12px',
    marginBottom: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  });

  const languageInfoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const flagStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
  };

  const textContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const labelStyle: React.CSSProperties = {
    color: '#fff',
    fontSize: '15px',
    fontWeight: 500,
  };

  const nativeNameStyle: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '12px',
  };

  const checkIconStyle: React.CSSProperties = {
    color: '#00F2FE',
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px',
        color: '#fff',
        fontSize: '14px',
        fontWeight: 600,
      }}>
        <Globe size={16} />
        Select Language
      </div>

      {languages.map(language => {
        const isActive = settings.language === language.value;
        return (
          <div
            key={language.value}
            style={languageItemStyle(isActive)}
            onClick={() => updateLanguage(language.value)}
          >
            <div style={languageInfoStyle}>
              <div style={flagStyle}>
                <Globe size={16} color={isActive ? '#00F2FE' : '#fff'} />
              </div>
              <div style={textContainerStyle}>
                <div style={labelStyle}>{language.label}</div>
                <div style={nativeNameStyle}>{language.nativeName}</div>
              </div>
            </div>
            {isActive && <Check size={20} style={checkIconStyle} />}
          </div>
        );
      })}
    </div>
  );
};

export default LanguageSettings;
