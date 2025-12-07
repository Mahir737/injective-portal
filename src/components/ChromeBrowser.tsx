import { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Plus,
  Globe,
  Lock,
  ExternalLink,
  Star,
  Home,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import { useBrowserContext } from '../context/BrowserContext';

const ChromeBrowser = () => {
  const {
    isOpen,
    tabs,
    activeTabId,
    bookmarks,
    closeBrowser,
    navigateToUrl,
    createTab,
    closeTab,
    switchToTab,
    setTabLoading,
    setTabTitle,
    addBookmark,
    removeBookmark,
    isBookmarked,
    getCurrentTab,
    getCurrentUrl,
  } = useBrowserContext();

  const [addressBarValue, setAddressBarValue] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [iframeKey, setIframeKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentTab = getCurrentTab();
  const currentUrl = getCurrentUrl();

  // Sync address bar with current URL
  useEffect(() => {
    if (currentUrl) {
      setAddressBarValue(currentUrl);
      setShowError(false);
      setErrorMessage('');
      // Force iframe reload by changing key
      setIframeKey(prev => prev + 1);
    }
  }, [currentUrl]);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
  }, []);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addressBarValue.trim()) {
      navigateToUrl(addressBarValue.trim());
    }
  };

  const handleIframeLoad = useCallback(() => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }
    if (activeTabId) {
      setTabLoading(activeTabId, false);
      // Try to get title from URL
      try {
        const url = new URL(currentUrl);
        setTabTitle(activeTabId, url.hostname);
      } catch {
        setTabTitle(activeTabId, 'Page');
      }
    }
    setShowError(false);
  }, [activeTabId, currentUrl, setTabLoading, setTabTitle]);

  const handleIframeError = useCallback(() => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }
    if (activeTabId) {
      setTabLoading(activeTabId, false);
    }
    setShowError(true);
    setErrorMessage('This site cannot be displayed in the embedded browser due to security restrictions.');
  }, [activeTabId, setTabLoading]);

  // Set loading timeout
  useEffect(() => {
    if (currentTab?.isLoading && currentUrl) {
      loadTimeoutRef.current = setTimeout(() => {
        // After timeout, assume it loaded (some sites don't fire load event properly)
        if (activeTabId) {
          setTabLoading(activeTabId, false);
        }
      }, 8000);
    }
    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
  }, [currentTab?.isLoading, currentUrl, activeTabId, setTabLoading]);

  const handleRefresh = () => {
    setIframeKey(prev => prev + 1);
    if (activeTabId) {
      setTabLoading(activeTabId, true);
    }
    setShowError(false);
  };

  const handleHome = () => {
    navigateToUrl('https://injective.com');
  };

  const handleOpenExternal = () => {
    if (currentUrl) {
      window.open(currentUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleToggleBookmark = () => {
    if (!currentUrl) return;
    if (isBookmarked(currentUrl)) {
      removeBookmark(currentUrl);
    } else {
      addBookmark(currentUrl);
    }
  };

  const getDomain = (url: string): string => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  const isSecure = currentUrl.startsWith('https://');

  if (!isOpen) return null;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        {/* Tab Bar */}
        <div style={styles.tabBar}>
          <div style={styles.tabsContainer}>
            {tabs.map(tab => (
              <div
                key={tab.id}
                style={{
                  ...styles.tab,
                  ...(tab.id === activeTabId ? styles.tabActive : {}),
                }}
                onClick={() => switchToTab(tab.id)}
              >
                {tab.isLoading ? (
                  <Loader2 size={12} style={styles.tabSpinner} />
                ) : (
                  <Globe size={12} color="rgba(255,255,255,0.5)" />
                )}
                <span style={styles.tabTitle}>{tab.title || getDomain(tab.url)}</span>
                <button
                  style={styles.tabClose}
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
          <button style={styles.newTabBtn} onClick={() => createTab()}>
            <Plus size={16} />
          </button>
          <button style={styles.closeBtn} onClick={closeBrowser}>
            <X size={18} />
          </button>
        </div>

        {/* Navigation Bar */}
        <div style={styles.navBar}>
          <button style={styles.navBtn} onClick={() => window.history.back()} title="Back">
            <ChevronLeft size={18} />
          </button>
          <button style={styles.navBtn} onClick={() => window.history.forward()} title="Forward">
            <ChevronRight size={18} />
          </button>
          <button style={styles.navBtn} onClick={handleRefresh} title="Refresh">
            <RotateCw size={16} />
          </button>
          <button style={styles.navBtn} onClick={handleHome} title="Home">
            <Home size={16} />
          </button>

          {/* Address Bar */}
          <form onSubmit={handleAddressSubmit} style={styles.addressBar}>
            {isSecure ? (
              <Lock size={14} color="#10b981" />
            ) : (
              <Globe size={14} color="rgba(255,255,255,0.4)" />
            )}
            <input
              type="text"
              value={addressBarValue}
              onChange={(e) => setAddressBarValue(e.target.value)}
              placeholder="Search or enter URL"
              style={styles.addressInput}
            />
            <button
              type="button"
              style={styles.bookmarkBtn}
              onClick={handleToggleBookmark}
              title={isBookmarked(currentUrl) ? 'Remove bookmark' : 'Add bookmark'}
            >
              <Star
                size={16}
                color={isBookmarked(currentUrl) ? '#f59e0b' : 'rgba(255,255,255,0.4)'}
                fill={isBookmarked(currentUrl) ? '#f59e0b' : 'none'}
              />
            </button>
          </form>

          <button style={styles.navBtn} onClick={handleOpenExternal} title="Open in browser">
            <ExternalLink size={16} />
          </button>
        </div>

        {/* Bookmarks Bar */}
        {bookmarks.length > 0 && (
          <div style={styles.bookmarksBar}>
            {bookmarks.map((url, idx) => (
              <button
                key={idx}
                style={styles.bookmarkItem}
                onClick={() => navigateToUrl(url)}
              >
                <Globe size={12} color="#00F2FE" />
                <span>{getDomain(url)}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div style={styles.content}>
        {/* Loading Indicator */}
        {currentTab?.isLoading && (
          <div style={styles.loadingBar}>
            <div style={styles.loadingProgress} />
          </div>
        )}

        {/* Error State */}
        {showError ? (
          <div style={styles.errorContainer}>
            <div style={styles.errorIcon}>
              <AlertTriangle size={48} color="#ef4444" />
            </div>
            <h2 style={styles.errorTitle}>Can't display this page</h2>
            <p style={styles.errorText}>{errorMessage}</p>
            <p style={styles.errorDomain}>{getDomain(currentUrl)}</p>
            <div style={styles.errorActions}>
              <button style={styles.primaryBtn} onClick={handleOpenExternal}>
                <ExternalLink size={16} />
                Open in Browser
              </button>
              <button style={styles.secondaryBtn} onClick={handleHome}>
                Go to Injective.com
              </button>
            </div>
            <p style={styles.errorHint}>
              Some websites block embedding for security reasons. Opening in your browser will work.
            </p>
          </div>
        ) : (
          /* Iframe */
          currentUrl && (
            <iframe
              key={iframeKey}
              ref={iframeRef}
              src={currentUrl}
              style={styles.iframe}
              title="Browser"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals allow-downloads"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          )
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#0f0f17',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    background: 'linear-gradient(180deg, #1a1a2e 0%, #16162a 100%)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    paddingTop: '44px', // Safe area for mobile
  },
  tabBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    gap: '8px',
  },
  tabsContainer: {
    display: 'flex',
    flex: 1,
    gap: '4px',
    overflowX: 'auto',
    scrollbarWidth: 'none',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 10px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px',
    cursor: 'pointer',
    minWidth: '100px',
    maxWidth: '160px',
    transition: 'all 0.2s',
  },
  tabActive: {
    background: 'linear-gradient(135deg, rgba(0,242,254,0.15) 0%, rgba(158,127,255,0.15) 100%)',
    borderColor: 'rgba(0,242,254,0.3)',
  },
  tabTitle: {
    flex: 1,
    fontSize: '11px',
    color: '#fff',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  tabSpinner: {
    animation: 'spin 1s linear infinite',
    color: '#00F2FE',
  },
  tabClose: {
    background: 'none',
    border: 'none',
    padding: '2px',
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.5)',
    display: 'flex',
  },
  newTabBtn: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.6)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtn: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'rgba(239,68,68,0.15)',
    border: '1px solid rgba(239,68,68,0.3)',
    color: '#ef4444',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
  },
  navBtn: {
    width: '34px',
    height: '34px',
    borderRadius: '8px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.6)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  addressBar: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
  },
  addressInput: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#fff',
    fontSize: '13px',
    fontFamily: 'Inter, sans-serif',
  },
  bookmarkBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
  },
  bookmarksBar: {
    display: 'flex',
    gap: '6px',
    padding: '6px 12px 10px',
    overflowX: 'auto',
    scrollbarWidth: 'none',
  },
  bookmarkItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    background: 'rgba(0,242,254,0.08)',
    border: '1px solid rgba(0,242,254,0.2)',
    borderRadius: '6px',
    color: 'rgba(255,255,255,0.8)',
    fontSize: '11px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  content: {
    flex: 1,
    position: 'relative',
    background: '#fff',
    overflow: 'hidden',
  },
  loadingBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'rgba(0,242,254,0.2)',
    zIndex: 10,
    overflow: 'hidden',
  },
  loadingProgress: {
    width: '30%',
    height: '100%',
    background: 'linear-gradient(90deg, #00F2FE, #9E7FFF)',
    animation: 'loading 1.5s ease-in-out infinite',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '40px',
    background: 'linear-gradient(135deg, #0f0f17 0%, #1a1a2e 100%)',
    textAlign: 'center',
  },
  errorIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'rgba(239,68,68,0.1)',
    border: '2px solid rgba(239,68,68,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  errorTitle: {
    fontFamily: 'Orbitron, sans-serif',
    fontSize: '20px',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '12px',
  },
  errorText: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.6)',
    maxWidth: '300px',
    lineHeight: 1.5,
    marginBottom: '8px',
  },
  errorDomain: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.4)',
    marginBottom: '24px',
  },
  errorActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
    maxWidth: '280px',
  },
  primaryBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '14px 24px',
    background: 'linear-gradient(135deg, rgba(0,242,254,0.2) 0%, rgba(158,127,255,0.2) 100%)',
    border: '1px solid rgba(0,242,254,0.4)',
    borderRadius: '12px',
    color: '#00F2FE',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  secondaryBtn: {
    padding: '12px 24px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '14px',
    cursor: 'pointer',
  },
  errorHint: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.4)',
    marginTop: '20px',
    maxWidth: '260px',
  },
};

// Add keyframes for animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes loading {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(200%); }
    100% { transform: translateX(-100%); }
  }
`;
document.head.appendChild(styleSheet);

export default ChromeBrowser;
