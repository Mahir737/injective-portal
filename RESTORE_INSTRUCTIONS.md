# 🔄 How to Restore This Checkpoint

If you need to restore this project from scratch, follow these steps:

## 1️⃣ Prerequisites

- **Node.js:** v18+ (recommended: v20+)
- **pnpm:** Latest version (`npm install -g pnpm`)
- **Git:** For version control (optional)

## 2️⃣ Project Setup

### Create New Vite Project
```bash
pnpm create vite injective-app --template react-ts
cd injective-app
```

### Install All Dependencies
```bash
# Core dependencies
pnpm add react react-dom zustand lucide-react bip39

# Injective packages (all v1.16.22)
pnpm add @injectivelabs/exceptions@1.16.22 \
         @injectivelabs/networks@1.16.22 \
         @injectivelabs/sdk-ts@1.16.22 \
         @injectivelabs/ts-types@1.16.22 \
         @injectivelabs/utils@1.16.22 \
         @injectivelabs/wallet-base@1.16.22 \
         @injectivelabs/wallet-core@1.16.22 \
         @injectivelabs/wallet-strategy@1.16.22

# Dev dependencies
pnpm add -D @bangjelkoski/vite-plugin-node-polyfills@^0.0.2 \
            @vitejs/plugin-react \
            typescript \
            vite
```

## 3️⃣ Copy Project Files

Copy all files from this checkpoint to your new project:

```
src/
├── components/        # All component files (including SocialBar.tsx)
├── context/          # WalletContext, BrowserContext
├── hooks/            # All custom hooks
├── store/            # appStore.ts, pointsStore.ts
├── utils/            # walletGenerator.ts
├── App.tsx
├── App.css
└── main.tsx
```

## 4️⃣ Configuration Files

### vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from '@bangjelkoski/vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [react(), nodePolyfills()],
})
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
```

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

## 5️⃣ Start Development Server

```bash
pnpm dev
```

The app should now be running at `http://localhost:5173`

## 6️⃣ Verify Everything Works

### Check These Features:
- ✅ Intro animation plays
- ✅ Home screen shows real-time Injective stats
- ✅ Browser tab management works
- ✅ Wallet creation/import functions
- ✅ Settings screen accessible
- ✅ Bottom navigation switches views
- ✅ **Socials button appears (right side, above Settings)**
- ✅ **Socials button expands/collapses smoothly**
- ✅ **All 6 social links work**
- ✅ **Labels slide in from right on hover**

### Test Wallet Functionality:
1. Go to Wallet screen
2. Create new wallet with password
3. Save the mnemonic phrase
4. Lock wallet
5. Unlock with password
6. Verify balance loads

### Test Gamification:
1. Check PointsWidget displays correctly
2. Verify points increase on transactions
3. Test level progression
4. Check achievements unlock
5. Verify streak tracking
6. Test multiplier events

### Test Pin/Unpin:
1. Go to Home screen
2. Tap star icon on any dApp card
3. Verify card moves to "Pinned dApps" section
4. Tap star again to unpin
5. Verify card returns to main section
6. Refresh page - verify pins persist

### Test Socials Button (OPTIMIZED):
1. **Verify Position:** Right side, 20px from edge, 100px from bottom
2. **Check Size:** Main button 40×40px, social buttons 36×36px
3. **Test Expansion:** Tap to expand - should rotate 90° and scale 1.05x
4. **Verify Links:** All 6 social links should open in new tabs
5. **Test Hover:** Hover over social buttons - should scale to 1.15x
6. **Check Labels:** Labels should slide in from right on hover
7. **Test Touch Targets:** Buttons should be easy to tap (44×44px effective area)
8. **Verify Animations:** Smooth transitions, staggered reveals
9. **Check Alignment:** Should align vertically with Settings tab
10. **Test Collapse:** Tap X to collapse - should return to Users icon

## 7️⃣ Troubleshooting

### If imports fail:
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### If crypto functions fail:
- Ensure you're on HTTPS or localhost
- Check browser console for Web Crypto API errors

### If balance doesn't load:
- Check network connectivity
- Verify Injective LCD endpoint is accessible
- Check browser CORS settings

### If socials button doesn't appear:
- Check z-index (should be 90)
- Verify positioning (right: 20px, bottom: 100px)
- Check bottom navigation height
- Inspect browser console for errors

### If socials button is too large:
- Verify SocialBar.tsx has optimized sizes:
  - Main button: 40×40px
  - Social buttons: 36×36px
  - Icons: 16px
  - Container padding: 10px
  - Gap: 6px

### If touch targets feel small:
- Verify padding is applied (4px on social buttons)
- Check hover scale (should be 1.15x)
- Test on actual mobile device

## 8️⃣ Build for Production

```bash
pnpm build
pnpm preview
```

---

## 🎯 Critical Component: SocialBar (Optimized)

### File Location
```
src/components/SocialBar.tsx
```

### Key Specifications
```typescript
// Position
position: 'fixed'
bottom: '100px'
right: '20px'
zIndex: 90

// Main Button (Optimized)
width: '40px'
height: '40px'
icon: Users (16px)
pulsingDot: 10px

// Social Buttons (Optimized)
width: '36px'
height: '36px'
icon: 16px
padding: '4px'  // For 44×44px touch target

// Container (Optimized)
maxHeight: '350px'
padding: '10px'
gap: '6px'
borderRadius: '20px'

// Animations
rotate: 0deg → 90deg
scale: 1.0x → 1.05x
hoverScale: 1.15x
transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1)
```

### Social Links Array
```typescript
const socialLinks = [
  { name: 'Discord', icon: MessageCircle, url: 'https://discord.com/invite/NK4qdbv', color: '#5865F2' },
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/Injective', color: '#1DA1F2' },
  { name: 'GitHub', icon: Github, url: 'https://github.com/InjectiveLabs', color: '#fff' },
  { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/channel/UCN99m0dicoMjNmJV9mxioqQ', color: '#FF0000' },
  { name: 'Telegram', icon: Send, url: 'https://t.me/joininjective', color: '#0088cc' },
  { name: 'Website', icon: Globe, url: 'https://injective.com/', color: '#00F2FE' },
];
```

### Accessibility Features
```typescript
// WCAG 2.1 AA Compliance
- Main button: 40×40px (primary action exception)
- Social buttons: 44×44px touch target (36px + 4px padding × 2)
- Hover scale: 1.15x (increases to 50.6×50.6px)
- Keyboard navigation: Full support
- ARIA labels: Descriptive labels for screen readers
- Focus indicators: Visible focus states
```

### Space Savings
```typescript
// Total Reduction: 70px (19%)
- Main button: 8px saved
- Social buttons: 48px saved (6 × 8px)
- Gaps: 10px saved (5 × 2px)
- Padding: 4px saved (2 × 2px)
```

---

## 🎨 Design Verification Checklist

### Visual Appearance
- [ ] Liquid-glass morphism effect visible
- [ ] Holographic gradients on cards
- [ ] Neon cyan/purple color scheme
- [ ] Orbitron font for headings
- [ ] Smooth transitions (300ms)
- [ ] Trading window style for dApp cards
- [ ] Color-coded dApp cards
- [ ] Pinned section with gold star icon
- [ ] **Compact socials button (40×40px main, 36×36px social)**
- [ ] **Right-side alignment with Settings tab**
- [ ] **Smooth rotation and scale animations**

### Functionality
- [ ] Real-time data updates every 30s
- [ ] Browser tabs switch correctly
- [ ] Wallet encrypts/decrypts properly
- [ ] Settings persist across sessions
- [ ] Points increase on transactions
- [ ] Achievements unlock automatically
- [ ] Streaks track daily activity
- [ ] Multipliers apply correctly
- [ ] Pin/unpin state persists
- [ ] Pinned section auto-hides when empty
- [ ] **Socials button expands/collapses smoothly**
- [ ] **All social links open in new tabs**
- [ ] **Labels slide in from right on hover**
- [ ] **Touch targets are 44×44px minimum**

### Performance
- [ ] No console errors
- [ ] Smooth animations (60fps)
- [ ] Fast initial load
- [ ] Responsive on mobile
- [ ] No memory leaks
- [ ] **Socials button animations are smooth**
- [ ] **No lag when expanding/collapsing**
- [ ] **Hover effects are instant**

---

**✅ Restoration complete! Your checkpoint is now fully restored with optimized socials buttons.**
