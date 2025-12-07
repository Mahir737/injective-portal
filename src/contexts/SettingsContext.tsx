import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

export type ThemeMode = 'dark' | 'light' | 'auto';
export type Language = 'en' | 'es' | 'zh' | 'ja' | 'ko' | 'fr' | 'de' | 'ru';
export type Network = 'mainnet' | 'testnet' | 'devnet';

interface NotificationSettings {
  pushEnabled: boolean;
  emailEnabled: boolean;
  transactionAlerts: boolean;
  priceAlerts: boolean;
  newsUpdates: boolean;
}

interface SecuritySettings {
  autoLockMinutes: number;
  biometricEnabled: boolean;
  twoFactorEnabled: boolean;
  requirePasswordForTransactions: boolean;
}

interface AppSettings {
  theme: ThemeMode;
  language: Language;
  network: Network;
  currency: string;
  notifications: NotificationSettings;
  security: SecuritySettings;
  fontSize: number;
  soundEnabled: boolean;
}

interface SettingsContextType {
  settings: AppSettings;
  updateTheme: (theme: ThemeMode) => void;
  updateLanguage: (language: Language) => void;
  updateNetwork: (network: Network) => void;
  updateNotifications: (notifications: Partial<NotificationSettings>) => void;
  updateSecurity: (security: Partial<SecuritySettings>) => void;
  updateFontSize: (size: number) => void;
  toggleSound: () => void;
  resetSettings: () => void;
  exportSettings: () => string;
  importSettings: (data: string) => boolean;
}

const defaultSettings: AppSettings = {
  theme: 'dark',
  language: 'en',
  network: 'mainnet',
  currency: 'USD',
  notifications: {
    pushEnabled: true,
    emailEnabled: false,
    transactionAlerts: true,
    priceAlerts: true,
    newsUpdates: false,
  },
  security: {
    autoLockMinutes: 5,
    biometricEnabled: false,
    twoFactorEnabled: false,
    requirePasswordForTransactions: true,
  },
  fontSize: 16,
  soundEnabled: true,
};

const STORAGE_KEY = 'injective_app_settings';

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return { ...defaultSettings, ...JSON.parse(stored) };
      } catch {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  // Persist settings to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    } else {
      root.classList.toggle('dark', settings.theme === 'dark');
    }
  }, [settings.theme]);

  // Apply font size
  useEffect(() => {
    document.documentElement.style.fontSize = `${settings.fontSize}px`;
  }, [settings.fontSize]);

  const updateTheme = useCallback((theme: ThemeMode) => {
    setSettings(prev => ({ ...prev, theme }));
  }, []);

  const updateLanguage = useCallback((language: Language) => {
    setSettings(prev => ({ ...prev, language }));
    // In production, this would trigger i18n language change
    console.log(`Language changed to: ${language}`);
  }, []);

  const updateNetwork = useCallback((network: Network) => {
    setSettings(prev => ({ ...prev, network }));
    // In production, this would trigger network reconnection
    console.log(`Network changed to: ${network}`);
  }, []);

  const updateNotifications = useCallback((notifications: Partial<NotificationSettings>) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, ...notifications },
    }));
  }, []);

  const updateSecurity = useCallback((security: Partial<SecuritySettings>) => {
    setSettings(prev => ({
      ...prev,
      security: { ...prev.security, ...security },
    }));
  }, []);

  const updateFontSize = useCallback((size: number) => {
    setSettings(prev => ({ ...prev, fontSize: Math.max(12, Math.min(24, size)) }));
  }, []);

  const toggleSound = useCallback(() => {
    setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const exportSettings = useCallback(() => {
    return JSON.stringify(settings, null, 2);
  }, [settings]);

  const importSettings = useCallback((data: string): boolean => {
    try {
      const imported = JSON.parse(data);
      setSettings({ ...defaultSettings, ...imported });
      return true;
    } catch {
      return false;
    }
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateTheme,
        updateLanguage,
        updateNetwork,
        updateNotifications,
        updateSecurity,
        updateFontSize,
        toggleSound,
        resetSettings,
        exportSettings,
        importSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
