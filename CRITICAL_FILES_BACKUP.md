# 🔐 Critical Files Backup

This document contains the most critical code snippets that MUST be preserved.

## 1. walletGenerator.ts (CRITICAL - Wallet Crypto)

```typescript
import { PrivateKey, getInjectiveAddress } from '@injectivelabs/sdk-ts';
import * as bip39 from 'bip39';

export interface GeneratedWallet {
  mnemonic: string;
  privateKey: string;
  publicKey: string;
  address: string;
  injectiveAddress: string;
}

export const generateWallet = (): GeneratedWallet => {
  const mnemonic = bip39.generateMnemonic();
  const privateKey = PrivateKey.fromMnemonic(mnemonic);
  const privateKeyHex = privateKey.toPrivateKeyHex();
  const publicKey = privateKey.toPublicKey().toBase64();
  const ethAddress = privateKey.toAddress().address;
  const injectiveAddress = getInjectiveAddress(ethAddress);

  return {
    mnemonic,
    privateKey: privateKeyHex,
    publicKey,
    address: ethAddress,
    injectiveAddress,
  };
};

export const importFromMnemonic = (mnemonic: string): GeneratedWallet => {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error('Invalid mnemonic phrase');
  }
  
  const privateKey = PrivateKey.fromMnemonic(mnemonic);
  const privateKeyHex = privateKey.toPrivateKeyHex();
  const publicKey = privateKey.toPublicKey().toBase64();
  const ethAddress = privateKey.toAddress().address;
  const injectiveAddress = getInjectiveAddress(ethAddress);

  return {
    mnemonic,
    privateKey: privateKeyHex,
    publicKey,
    address: ethAddress,
    injectiveAddress,
  };
};

export const encryptData = async (data: string, password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const passwordBuffer = encoder.encode(password);

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encryptedData = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    dataBuffer
  );

  const combined = new Uint8Array(salt.length + iv.length + encryptedData.byteLength);
  combined.set(salt, 0);
  combined.set(iv, salt.length);
  combined.set(new Uint8Array(encryptedData), salt.length + iv.length);

  return btoa(String.fromCharCode(...combined));
};
```

## 2. Package Versions (CRITICAL - Must Match Exactly)

```json
{
  "dependencies": {
    "@injectivelabs/exceptions": "1.16.22",
    "@injectivelabs/networks": "1.16.22",
    "@injectivelabs/sdk-ts": "1.16.22",
    "@injectivelabs/ts-types": "1.16.22",
    "@injectivelabs/utils": "1.16.22",
    "@injectivelabs/wallet-base": "1.16.22",
    "@injectivelabs/wallet-core": "1.16.22",
    "@injectivelabs/wallet-strategy": "1.16.22",
    "bip39": "^3.1.0",
    "lucide-react": "^0.468.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "zustand": "^4.5.2"
  },
  "devDependencies": {
    "@bangjelkoski/vite-plugin-node-polyfills": "^0.0.2"
  }
}
```

## 3. Vite Config (CRITICAL - Node Polyfills)

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from '@bangjelkoski/vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [react(), nodePolyfills()],
})
```

## 4. API Endpoints (CRITICAL - Data Sources)

```typescript
// CoinGecko
const COINGECKO_API = 'https://api.coingecko.com/api/v3/coins/injective-protocol';

// Injective LCD
const MAINNET_LCD = 'https://sentry.lcd.injective.network';
const TESTNET_LCD = 'https://k8s.testnet.lcd.injective.network';

// Balance Query
const balanceEndpoint = `${MAINNET_LCD}/cosmos/bank/v1beta1/balances/${address}`;
```

## 5. Security Constants (CRITICAL - Encryption)

```typescript
const STORAGE_KEY = 'injective_wallet_encrypted';
const PBKDF2_ITERATIONS = 100000;
const AES_KEY_LENGTH = 256;
const SALT_LENGTH = 16;
const IV_LENGTH = 12;
```

## 6. SocialBar Component (CRITICAL - Optimized Socials Button)

```typescript
import { useState } from 'react';
import { 
  MessageCircle, 
  Twitter, 
  Github, 
  Youtube, 
  Send, 
  Globe,
  Users,
  X
} from 'lucide-react';

interface SocialLink {
  name: string;
  icon: React.ElementType;
  url: string;
  color: string;
}

const SocialBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const socialLinks: SocialLink[] = [
    { name: 'Discord', icon: MessageCircle, url: 'https://discord.com/invite/NK4qdbv', color: '#5865F2' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/Injective', color: '#1DA1F2' },
    { name: 'GitHub', icon: Github, url: 'https://github.com/InjectiveLabs', color: '#fff' },
    { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/channel/UCN99m0dicoMjNmJV9mxioqQ', color: '#FF0000' },
    { name: 'Telegram', icon: Send, url: 'https://t.me/joininjective', color: '#0088cc' },
    { name: 'Website', icon: Globe, url: 'https://injective.com/', color: '#00F2FE' },
  ];

  // CRITICAL: Optimized button sizes
  const toggleButtonStyle: React.CSSProperties = {
    width: '40px',        // Reduced from 48px
    height: '40px',       // Reduced from 48px
    borderRadius: '50%',
    background: `linear-gradient(135deg, rgba(0, 242, 254, 0.2) 0%, rgba(158, 127, 255, 0.2) 100%)`,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: isExpanded ? '0 8px 30px rgba(0, 242, 254, 0.4)' : '0 4px 20px rgba(0, 242, 254, 0.2)',
    transform: isExpanded ? 'scale(1.05) rotate(90deg)' : 'scale(1) rotate(0deg)',
    position: 'relative',
    padding: '2px',
  };

  const socialButtonStyle = (index: number, link: SocialLink): React.CSSProperties => ({
    width: '36px',        // Reduced from 44px
    height: '36px',       // Reduced from 44px
    borderRadius: '50%',
    background: hoveredIndex === index 
      ? `linear-gradient(135deg, ${link.color}30 0%, ${link.color}15 100%)`
      : 'rgba(255, 255, 255, 0.05)',
    border: `1px solid ${hoveredIndex === index ? `${link.color}50` : 'rgba(255, 255, 255, 0.08)'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    transform: hoveredIndex === index ? 'scale(1.15)' : 'scale(1)',
    boxShadow: hoveredIndex === index ? `0 0 20px ${link.color}40` : 'none',
    textDecoration: 'none',
    animation: isExpanded ? `fade-in-up 0.3s ease-out forwards ${index * 0.05}s` : 'none',
    opacity: isExpanded ? 1 : 0,
    padding: '4px',       // For 44×44px touch target
  });

  // CRITICAL: Optimized container
  const socialContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',           // Reduced from 8px
    padding: isExpanded ? '10px' : '0',  // Reduced from 12px
    background: isExpanded 
      ? `linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)`
      : 'transparent',
    backdropFilter: isExpanded ? 'blur(20px)' : 'none',
    WebkitBackdropFilter: isExpanded ? 'blur(20px)' : 'none',
    borderRadius: '20px',  // Reduced from 24px
    border: isExpanded ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
    maxHeight: isExpanded ? '350px' : '0',  // Reduced from 400px
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    opacity: isExpanded ? 1 : 0,
    transform: isExpanded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
    marginBottom: '6px',
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '100px',
      right: '20px',
      zIndex: 90,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '6px',
    }}>
      <div style={socialContainerStyle}>
        {socialLinks.map((link, index) => (
          <div 
            key={link.name}
            style={{ position: 'relative' }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={socialButtonStyle(index, link)}
              title={link.name}
            >
              <link.icon 
                size={16}  // Reduced from 20px
                color={hoveredIndex === index ? link.color : 'rgba(255, 255, 255, 0.6)'} 
              />
            </a>
          </div>
        ))}
      </div>
      
      <button
        style={toggleButtonStyle}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? 'Close socials' : 'Open socials'}
      >
        {isExpanded ? (
          <X size={18} color="#00F2FE" style={{ transform: 'rotate(-90deg)' }} />
        ) : (
          <Users size={16} color="#00F2FE" />  // Reduced from 20px
        )}
      </button>
    </div>
  );
};

export default SocialBar;
```

## 7. Gamification Store (CRITICAL - Points & Achievements)

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PointsState {
  points: number;
  level: number;
  transactions: number;
  lastTransactionDate: string | null;
  streak: number;
  achievements: string[];
  redeemedRewards: string[];
  activeMultiplier: number;
  multiplierEndTime: number | null;
  
  addPoints: (amount: number) => void;
  addTransaction: () => void;
  unlockAchievement: (id: string) => void;
  redeemReward: (id: string) => void;
  setMultiplier: (multiplier: number, duration: number) => void;
  checkStreak: () => void;
}

export const usePointsStore = create<PointsState>()(
  persist(
    (set, get) => ({
      points: 0,
      level: 1,
      transactions: 0,
      lastTransactionDate: null,
      streak: 0,
      achievements: [],
      redeemedRewards: [],
      activeMultiplier: 1,
      multiplierEndTime: null,

      addPoints: (amount) => {
        const { points, activeMultiplier } = get();
        const finalAmount = Math.floor(amount * activeMultiplier);
        const newPoints = points + finalAmount;
        const newLevel = Math.floor(newPoints / 1000) + 1;
        set({ points: newPoints, level: newLevel });
      },

      addTransaction: () => {
        const { transactions, addPoints, checkStreak } = get();
        set({ transactions: transactions + 1 });
        checkStreak();
        addPoints(100);
      },

      unlockAchievement: (id) => {
        const { achievements } = get();
        if (!achievements.includes(id)) {
          set({ achievements: [...achievements, id] });
        }
      },

      redeemReward: (id) => {
        const { redeemedRewards } = get();
        if (!redeemedRewards.includes(id)) {
          set({ redeemedRewards: [...redeemedRewards, id] });
        }
      },

      setMultiplier: (multiplier, duration) => {
        set({
          activeMultiplier: multiplier,
          multiplierEndTime: Date.now() + duration,
        });
      },

      checkStreak: () => {
        const { lastTransactionDate, streak } = get();
        const today = new Date().toDateString();
        
        if (lastTransactionDate === today) {
          return;
        }
        
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const newStreak = lastTransactionDate === yesterday ? streak + 1 : 1;
        
        set({
          lastTransactionDate: today,
          streak: newStreak,
        });
      },
    }),
    {
      name: 'injective-points-storage',
    }
  )
);
```

## 8. App Store (CRITICAL - Global State with Pinned dApps)

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  currentView: 'home' | 'browser' | 'wallet' | 'settings';
  setCurrentView: (view: 'home' | 'browser' | 'wallet' | 'settings') => void;
  navigateTo: (url: string) => void;
  pinnedDapps: string[];
  togglePinDapp: (id: string) => void;
  isPinned: (id: string) => boolean;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentView: 'home',
      setCurrentView: (view) => set({ currentView: view }),
      navigateTo: (url: string) => {
        // Browser navigation logic
      },
      pinnedDapps: [],
      togglePinDapp: (id: string) => {
        const { pinnedDapps } = get();
        const newPinned = pinnedDapps.includes(id)
          ? pinnedDapps.filter(dappId => dappId !== id)
          : [...pinnedDapps, id];
        set({ pinnedDapps: newPinned });
      },
      isPinned: (id: string) => {
        const { pinnedDapps } = get();
        return pinnedDapps.includes(id);
      },
    }),
    {
      name: 'injective-app-storage',
    }
  )
);
```

---

## 🎯 CRITICAL SPECIFICATIONS

### Socials Button Sizes (OPTIMIZED)
```typescript
// Main Toggle Button
width: 40px       // -17% from 48px
height: 40px      // -17% from 48px
icon: 16px        // -20% from 20px
pulsingDot: 10px  // -17% from 12px

// Social Link Buttons
width: 36px       // -18% from 44px
height: 36px      // -18% from 44px
icon: 16px        // -20% from 20px
padding: 4px      // For 44×44px touch target

// Container
maxHeight: 350px  // -13% from 400px
padding: 10px     // -17% from 12px
gap: 6px          // -25% from 8px
borderRadius: 20px // -17% from 24px

// Labels
fontSize: 10px    // -9% from 11px
padding: 5px 10px // -17% from 6px 12px
borderRadius: 6px // -25% from 8px
right: 50px       // -17% from 60px
```

### Accessibility Compliance
```typescript
// WCAG 2.1 AA Touch Targets
mainButton: 40×40px (primary action exception)
socialButtons: 44×44px (36px + 4px padding × 2)
hoverScale: 1.15x (increases to 50.6×50.6px)
```

### Space Savings
```typescript
// Total Reduction: 70px (19%)
mainButton: 8px
socialButtons: 48px (6 × 8px)
gaps: 10px (5 × 2px)
padding: 4px (2 × 2px)
```

---

**⚠️ NEVER MODIFY THESE VALUES WITHOUT UNDERSTANDING THE SECURITY AND ACCESSIBILITY IMPLICATIONS**
