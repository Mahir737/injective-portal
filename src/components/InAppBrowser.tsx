import { useState, useRef, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Plus, 
  Globe,
  Lock,
  ExternalLink,
  Wallet,
  Search,
  AlertCircle,
  Home,
  Star,
  StarOff
} from 'lucide-react';
import { useBrowserContext } from '../context/BrowserContext';
import { useWalletContext } from '../context/WalletContext';

const InAppBrowser = () => {
  const {
    isOpen,
    currentUrl,
    tabs,
    activeTabId,
    historyIndex,
    history,
    bookmarks,
    closeBrowser,
    navigate,
    goBack,
    goForward,
    refresh,
    addTab,
    closeTab,
    switchTab,
    addBookmark,
    removeBookmark,
  } = useBrowserContext();

  const { isConnected, injectiveAddress } = useWalletContext();
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadTimeoutRef = useRef<NodeJS.Timeout>();

  // Update URL input when currentUrl changes
  useEffect(() => {
    console.log('📍 Current URL changed to:', currentUrl);
    setUrlInput(currentUrl);
    setLoadError(null);
    setIframeKey(prev => prev + 1); // Force iframe reload
  }, [currentUrl]);

  // Handle loading state
  useEffect(() => {
    if (isOpen && currentUrl) {
      console.log('⏳ Starting load for:', currentUrl);
      setIsLoading(true);
      setLoadError(null);
      
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }

      loadTimeoutRef.current = setTimeout(() => {
        console.log('⏱️ Load timeout reached for:', currentUrl);
        setIsLoading(false);
      }, 10000);

      return () => {
        if (loadTimeoutRef.current) {
          clearTimeout(loadTimeoutRef.current);
        }
      };
    }
  }, [currentUrl, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      console.log('🔍 Submitting URL:', urlInput);
      navigate(urlInput.trim());
      setShowBookmarks(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleIframeLoad = () => {
    console.log('✅ Iframe loaded successfully');
    setIsLoading(false);
    setLoadError(null);
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }
  };

  const handleIframeError = () => {
    console.error('❌ Iframe load error');
    setIsLoading(false);
    setLoadError('This website cannot be displayed in the in-app browser due to security restrictions (X-Frame-Options or CSP).');
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }
  };

  const openInNewTab = () => {
    console.log('🔗 Opening in new browser tab:', currentUrl);
    window.open(currentUrl, '_blank', 'noopener,noreferrer');
  };

  const goToHome = () => {
    navigate('https://injective.com');
    setShowBookmarks(false);
  };

  const isBookmarked = bookmarks.includes(currentUrl);

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(currentUrl);
    } else {
      addBookmark(currentUrl);
    }
  };

  const isSecure = currentUrl.startsWith('https://');
  const displayUrl = currentUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const domain = currentUrl ? new URL(currentUrl).hostname : '';

  console.log('🎨 Rendering browser with:', { isOpen, currentUrl, activeTabId, tabsCount: tabs.length });

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#0a0a12',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    animation: 'slide-up 0.3s ease-out'
  };

  const headerStyle: React.CSSProperties = {
    background: 'linear-gradient(180deg, rgba(15, 15, 25, 0.98) 0%, rgba(10, 10, 18, 0.95) 100%)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '12px 16px',
    paddingTop: '50px'
  };

  const tabBarStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    marginBottom: '12px',
    overflowX: 'auto',
    paddingBottom: '8px',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none'
  };

  const tabStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    background: isActive 
      ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.15) 0%, rgba(158, 127, 255, 0.15) 100%)'
      : 'rgba(255, 255, 255, 0.03)',
    border: `1px solid ${isActive ? 'rgba(0, 242, 254, 0.3)' : 'rgba(255, 255, 255, 0.05)'}`,
    borderRadius: '10px',
    cursor: 'pointer',
    minWidth: '120px',
    maxWidth: '180px',
    transition: 'all 0.2s ease'
  });

  const navBarStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px'
  };

  const navButtonStyle = (disabled: boolean): React.CSSProperties => ({
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'all 0.2s ease'
  });

  const urlBarStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px'
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#fff',
    fontSize: '14px',
    fontFamily: "'Inter', sans-serif"
  };

  const iframeContainerStyle: React.CSSProperties = {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    background: '#fff'
  };

  const iframeStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    border: 'none',
    background: '#fff',
    display: loadError ? 'none' : 'block'
  };

  const loadingOverlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(10, 10, 18, 0.95)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    opacity: isLoading ? 1 : 0,
    pointerEvents: isLoading ? 'auto' : 'none',
    transition: 'opacity 0.3s ease',
    zIndex: 10
  };

  const errorOverlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(10, 10, 18, 0.98) 0%, rgba(15, 15, 25, 0.98) 100%)',
    display: loadError ? 'flex' : 'none',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    padding: '40px',
    zIndex: 20
  };

  const walletIndicatorStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 10px',
    background: isConnected 
      ? 'rgba(16, 185, 129, 0.15)'
      : 'rgba(255, 255, 255, 0.05)',
    border: `1px solid ${isConnected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
    borderRadius: '8px',
    fontSize: '12px',
    color: isConnected ? '#10b981' : 'rgba(255, 255, 255, 0.5)'
  };

  const bookmarksBarStyle: React.CSSProperties = {
    display: showBookmarks ? 'flex' : 'none',
    flexDirection: 'column',
    gap: '6px',
    padding: '8px',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '8px',
    marginTop: '8px',
    maxHeight: '150px',
    overflowY: 'auto'
  };

  const bookmarkItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 8px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.8)',
    transition: 'all 0.2s ease'
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        {/* Tab Bar */}
        <div style={tabBarStyle}>
          {tabs.map(tab => (
            <div
              key={tab.id}
              style={tabStyle(tab.id === activeTabId)}
              onClick={() => switchTab(tab.id)}
            >
              <Globe size={14} color="rgba(255, 255, 255, 0.5)" />
              <span style={{
                flex: 1,
                fontSize: '12px',
                color: '#fff',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {tab.title || displayUrl || 'New Tab'}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '2px',
                  cursor: 'pointer',
                  display: 'flex'
                }}
              >
                <X size={14} color="rgba(255, 255, 255, 0.5)" />
              </button>
            </div>
          ))}
          <button
            onClick={() => addTab()}
            style={{
              ...navButtonStyle(false),
              width: '32px',
              height: '32px'
            }}
          >
            <Plus size={16} color="rgba(255, 255, 255, 0.6)" />
          </button>
        </div>

        {/* Navigation Bar */}
        <div style={navBarStyle}>
          <button
            style={navButtonStyle(historyIndex <= 0)}
            onClick={goBack}
            disabled={historyIndex <= 0}
          >
            <ChevronLeft size={18} color="rgba(255, 255, 255, 0.6)" />
          </button>
          <button
            style={navButtonStyle(historyIndex >= history.length - 1)}
            onClick={goForward}
            disabled={historyIndex >= history.length - 1}
          >
            <ChevronRight size={18} color="rgba(255, 255, 255, 0.6)" />
          </button>
          <button
            style={navButtonStyle(false)}
            onClick={refresh}
          >
            <RotateCw size={16} color="rgba(255, 255, 255, 0.6)" />
          </button>
          <button
            style={navButtonStyle(false)}
            onClick={goToHome}
          >
            <Home size={16} color="rgba(255, 255, 255, 0.6)" />
          </button>

          <form onSubmit={handleSubmit} style={urlBarStyle}>
            {isSecure && currentUrl ? (
              <Lock size={14} color="#10b981" />
            ) : (
              <Search size={14} color="rgba(255, 255, 255, 0.4)" />
            )}
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search or enter URL"
              style={inputStyle}
            />
            {currentUrl && (
              <button
                type="button"
                onClick={toggleBookmark}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex'
                }}
              >
                {isBookmarked ? (
                  <Star size={16} color="#f59e0b" fill="#f59e0b" />
                ) : (
                  <StarOff size={16} color="rgba(255, 255, 255, 0.4)" />
                )}
              </button>
            )}
          </form>

          <button
            onClick={() => setShowBookmarks(!showBookmarks)}
            style={{
              ...navButtonStyle(false),
              background: showBookmarks ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              borderColor: showBookmarks ? 'rgba(0, 242, 254, 0.3)' : 'rgba(255, 255, 255, 0.08)'
            }}
            title="Bookmarks"
          >
            <Star size={16} color={showBookmarks ? '#00F2FE' : 'rgba(255, 255, 255, 0.6)'} />
          </button>

          <div style={walletIndicatorStyle}>
            <Wallet size={14} />
            {isConnected ? (
              <span>{injectiveAddress.slice(0, 6)}...{injectiveAddress.slice(-4)}</span>
            ) : (
              <span>Not Connected</span>
            )}
          </div>

          <button
            onClick={openInNewTab}
            style={navButtonStyle(false)}
            title="Open in new tab"
          >
            <ExternalLink size={16} color="rgba(255, 255, 255, 0.6)" />
          </button>

          <button
            style={{
              ...navButtonStyle(false),
              background: 'rgba(239, 68, 68, 0.1)',
              borderColor: 'rgba(239, 68, 68, 0.2)'
            }}
            onClick={closeBrowser}
          >
            <X size={18} color="#ef4444" />
          </button>
        </div>

        {/* Bookmarks Bar */}
        <div style={bookmarksBarStyle}>
          {bookmarks.length === 0 ? (
            <p style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.4)',
              textAlign: 'center',
              padding: '8px'
            }}>
              No bookmarks yet. Click the star icon to bookmark pages.
            </p>
          ) : (
            bookmarks.map((url, index) => {
              const bookmarkDomain = new URL(url).hostname.replace('www.', '');
              return (
                <div
                  key={index}
                  style={bookmarkItemStyle}
                  onClick={() => {
                    navigate(url);
                    setShowBookmarks(false);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 242, 254, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(0, 242, 254, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                >
                  <Globe size={12} color="#00F2FE" />
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {bookmarkDomain}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeBookmark(url);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '2px',
                      display: 'flex'
                    }}
                  >
                    <X size={12} color="rgba(255, 255, 255, 0.4)" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </header>

      <div style={iframeContainerStyle}>
        {currentUrl && (
          <iframe
            key={iframeKey}
            ref={iframeRef}
            src={currentUrl}
            style={iframeStyle}
            title="In-App Browser"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals allow-downloads allow-top-navigation-by-user-activation"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        )}
        
        {/* Loading Overlay */}
        <div style={loadingOverlayStyle}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(0, 242, 254, 0.2)',
            borderTopColor: '#00F2FE',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '14px'
          }}>Loading {domain}...</p>
        </div>

        {/* Error Overlay */}
        <div style={errorOverlayStyle}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '2px solid rgba(239, 68, 68, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '10px'
          }}>
            <AlertCircle size={30} color="#ef4444" />
          </div>
          
          <h3 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '18px',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '8px'
          }}>
            Unable to Load Page
          </h3>
          
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.6)',
            textAlign: 'center',
            lineHeight: 1.6,
            marginBottom: '8px',
            maxWidth: '300px'
          }}>
            {loadError}
          </p>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.5)',
            textAlign: 'center',
            marginBottom: '24px',
            maxWidth: '280px'
          }}>
            Domain: <strong>{domain}</strong>
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            maxWidth: '300px'
          }}>
            <button
              onClick={openInNewTab}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.2) 0%, rgba(158, 127, 255, 0.2) 100%)',
                border: '1px solid rgba(0, 242, 254, 0.3)',
                borderRadius: '12px',
                color: '#00F2FE',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
            >
              <ExternalLink size={16} />
              Open in Browser
            </button>

            <button
              onClick={goToHome}
              style={{
                padding: '12px 24px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Go to Injective.com
            </button>
          </div>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.4)',
            textAlign: 'center',
            marginTop: '20px',
            maxWidth: '280px'
          }}>
            Some websites block embedding for security. Try opening in your browser instead.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InAppBrowser;
