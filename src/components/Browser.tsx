import { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Home, 
  Star, 
  StarOff,
  X,
  Search,
  Shield,
  Loader2,
  Globe,
  Lock
} from 'lucide-react';
import { useAppStore } from '../store/appStore';
import GlassCard from './GlassCard';

const Browser = () => {
  const { 
    browser, 
    setBrowser, 
    navigateTo, 
    goBack, 
    goForward, 
    addBookmark, 
    removeBookmark,
    setCurrentView,
    wallet
  } = useAppStore();
  
  const [inputUrl, setInputUrl] = useState(browser.currentUrl);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const quickLinks = [
    { name: 'Helix', url: 'https://helixapp.com/', icon: '📊' },
    { name: 'INJ Scan', url: 'https://injscan.com/', icon: '🔍' },
    { name: 'Bridge', url: 'https://bridge.injective.network/', icon: '🌉' },
    { name: 'Hub', url: 'https://hub.injective.network/', icon: '🏛️' },
    { name: 'Docs', url: 'https://docs.injective.network/', icon: '📚' },
    { name: 'Blog', url: 'https://blog.injective.com/', icon: '📰' },
  ];

  useEffect(() => {
    setInputUrl(browser.currentUrl);
  }, [browser.currentUrl]);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let url = inputUrl.trim();
    
    if (!url) return;
    
    // Add https if no protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      // Check if it looks like a URL
      if (url.includes('.') && !url.includes(' ')) {
        url = 'https://' + url;
      } else {
        // Treat as search query
        url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
      }
    }
    
    navigateTo(url);
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      setBrowser({ isLoading: true });
      iframeRef.current.src = browser.currentUrl;
    }
  };

  const handleIframeLoad = () => {
    setBrowser({ isLoading: false });
  };

  const isBookmarked = browser.bookmarks.includes(browser.currentUrl);

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(browser.currentUrl);
    } else {
      addBookmark(browser.currentUrl);
    }
  };

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(180deg, #0a0a12 0%, #0d0d18 100%)',
  };

  const headerStyle: React.CSSProperties = {
    padding: '50px 12px 12px',
    background: 'rgba(10, 10, 18, 0.95)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  };

  const navBarStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  };

  const navButtonStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: 'rgba(255, 255, 255, 0.6)',
  };

  const urlBarStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#fff',
    fontSize: '13px',
    fontFamily: "'Inter', sans-serif",
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  };

  const iframeStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    border: 'none',
    background: '#fff',
  };

  const emptyStateStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    overflowY: 'auto',
  };

  const loadingOverlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(10, 10, 18, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  };

  // Wallet connection indicator
  const walletIndicator = wallet.isConnected && (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 10px',
      background: 'rgba(16, 185, 129, 0.15)',
      borderRadius: '20px',
      border: '1px solid rgba(16, 185, 129, 0.3)',
    }}>
      <div style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: '#10b981',
      }} />
      <span style={{
        fontSize: '10px',
        color: '#10b981',
        fontWeight: 500,
      }}>
        Connected
      </span>
    </div>
  );

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={navBarStyle}>
          <button 
            style={{
              ...navButtonStyle,
              opacity: browser.canGoBack ? 1 : 0.3,
              cursor: browser.canGoBack ? 'pointer' : 'not-allowed',
            }}
            onClick={goBack}
            disabled={!browser.canGoBack}
          >
            <ArrowLeft size={16} />
          </button>
          
          <button 
            style={{
              ...navButtonStyle,
              opacity: browser.canGoForward ? 1 : 0.3,
              cursor: browser.canGoForward ? 'pointer' : 'not-allowed',
            }}
            onClick={goForward}
            disabled={!browser.canGoForward}
          >
            <ArrowRight size={16} />
          </button>
          
          <button 
            style={navButtonStyle}
            onClick={handleRefresh}
          >
            <RotateCw size={16} />
          </button>
          
          <button 
            style={navButtonStyle}
            onClick={() => {
              navigateTo('');
              setCurrentView('home');
            }}
          >
            <Home size={16} />
          </button>
        </div>

        <form onSubmit={handleNavigate} style={{ display: 'flex', gap: '8px' }}>
          <div style={urlBarStyle}>
            {browser.currentUrl && (
              <Lock size={12} color="#10b981" />
            )}
            {!browser.currentUrl && (
              <Search size={14} color="rgba(255, 255, 255, 0.4)" />
            )}
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Search or enter URL"
              style={inputStyle}
            />
            {browser.currentUrl && (
              <button
                type="button"
                onClick={toggleBookmark}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                {isBookmarked ? (
                  <Star size={16} color="#f59e0b" fill="#f59e0b" />
                ) : (
                  <StarOff size={16} color="rgba(255, 255, 255, 0.4)" />
                )}
              </button>
            )}
          </div>
          {walletIndicator}
        </form>

        {/* Bookmarks bar */}
        {browser.bookmarks.length > 0 && (
          <div style={{
            display: 'flex',
            gap: '8px',
            marginTop: '10px',
            overflowX: 'auto',
            paddingBottom: '4px',
          }}>
            {browser.bookmarks.slice(0, 5).map((url) => (
              <button
                key={url}
                onClick={() => navigateTo(url)}
                style={{
                  padding: '4px 10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '6px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '11px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Globe size={10} />
                {getDomain(url).replace('www.', '')}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={contentStyle}>
        {browser.isLoading && (
          <div style={loadingOverlayStyle}>
            <div style={{ textAlign: 'center' }}>
              <Loader2 
                size={32} 
                color="#00F2FE" 
                style={{ animation: 'spin 1s linear infinite' }}
              />
              <p style={{
                marginTop: '12px',
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '12px',
              }}>
                Loading {getDomain(browser.currentUrl)}...
              </p>
            </div>
          </div>
        )}

        {browser.currentUrl ? (
          <iframe
            ref={iframeRef}
            src={browser.currentUrl}
            style={iframeStyle}
            onLoad={handleIframeLoad}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
            title="Browser"
          />
        ) : (
          <div style={emptyStateStyle}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <Globe size={48} color="#00F2FE" style={{ marginBottom: '16px' }} />
              <h2 style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '20px',
                color: '#fff',
                marginBottom: '8px',
              }}>
                Injective Browser
              </h2>
              <p style={{
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.5)',
              }}>
                Browse the Injective ecosystem with your wallet connected
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              width: '100%',
              maxWidth: '320px',
            }}>
              {quickLinks.map((link) => (
                <GlassCard 
                  key={link.url} 
                  onClick={() => navigateTo(link.url)}
                  delay={0}
                  style={{ opacity: 1 }}
                >
                  <div style={{
                    padding: '16px',
                    textAlign: 'center',
                  }}>
                    <span style={{ fontSize: '24px' }}>{link.icon}</span>
                    <p style={{
                      marginTop: '8px',
                      fontSize: '11px',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontWeight: 500,
                    }}>
                      {link.name}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>

            {wallet.isConnected && (
              <div style={{
                marginTop: '30px',
                padding: '16px',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <Shield size={20} color="#10b981" />
                <div>
                  <p style={{
                    fontSize: '12px',
                    color: '#10b981',
                    fontWeight: 600,
                  }}>
                    Wallet Connected
                  </p>
                  <p style={{
                    fontSize: '11px',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}>
                    Your wallet is ready to interact with dApps
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browser;
