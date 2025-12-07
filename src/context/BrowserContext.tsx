import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface BrowserTab {
  id: string;
  url: string;
  title: string;
  isLoading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
}

interface BrowserState {
  isOpen: boolean;
  tabs: BrowserTab[];
  activeTabId: string | null;
  bookmarks: string[];
}

interface BrowserContextType extends BrowserState {
  openBrowser: (url?: string) => void;
  closeBrowser: () => void;
  navigateToUrl: (url: string) => void;
  createTab: (url?: string) => void;
  closeTab: (tabId: string) => void;
  switchToTab: (tabId: string) => void;
  updateTabUrl: (tabId: string, url: string) => void;
  setTabLoading: (tabId: string, isLoading: boolean) => void;
  setTabTitle: (tabId: string, title: string) => void;
  addBookmark: (url: string) => void;
  removeBookmark: (url: string) => void;
  isBookmarked: (url: string) => boolean;
  getCurrentTab: () => BrowserTab | null;
  getCurrentUrl: () => string;
}

const BrowserContext = createContext<BrowserContextType | null>(null);

const generateId = () => `tab_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;

const DEFAULT_URL = 'https://injective.com';

const normalizeUrl = (input: string): string => {
  const trimmed = input.trim();
  
  if (!trimmed) return DEFAULT_URL;
  
  // Already has protocol
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  
  // Looks like a URL (has dot, no spaces)
  if (trimmed.includes('.') && !trimmed.includes(' ')) {
    return `https://${trimmed}`;
  }
  
  // Treat as search query
  return `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`;
};

export const BrowserProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<BrowserState>({
    isOpen: false,
    tabs: [],
    activeTabId: null,
    bookmarks: JSON.parse(localStorage.getItem('inj_bookmarks') || '[]'),
  });

  const saveBookmarks = (bookmarks: string[]) => {
    localStorage.setItem('inj_bookmarks', JSON.stringify(bookmarks));
  };

  const getCurrentTab = useCallback((): BrowserTab | null => {
    if (!state.activeTabId) return null;
    return state.tabs.find(t => t.id === state.activeTabId) || null;
  }, [state.activeTabId, state.tabs]);

  const getCurrentUrl = useCallback((): string => {
    const tab = getCurrentTab();
    return tab?.url || '';
  }, [getCurrentTab]);

  const openBrowser = useCallback((url?: string) => {
    const finalUrl = normalizeUrl(url || DEFAULT_URL);
    const newTab: BrowserTab = {
      id: generateId(),
      url: finalUrl,
      title: 'Loading...',
      isLoading: true,
      canGoBack: false,
      canGoForward: false,
    };

    setState(prev => ({
      ...prev,
      isOpen: true,
      tabs: [newTab],
      activeTabId: newTab.id,
    }));
  }, []);

  const closeBrowser = useCallback(() => {
    setState(prev => ({
      ...prev,
      isOpen: false,
      tabs: [],
      activeTabId: null,
    }));
  }, []);

  const navigateToUrl = useCallback((url: string) => {
    const finalUrl = normalizeUrl(url);
    
    setState(prev => {
      if (!prev.activeTabId) return prev;
      
      return {
        ...prev,
        tabs: prev.tabs.map(tab =>
          tab.id === prev.activeTabId
            ? { ...tab, url: finalUrl, title: 'Loading...', isLoading: true }
            : tab
        ),
      };
    });
  }, []);

  const createTab = useCallback((url?: string) => {
    const finalUrl = normalizeUrl(url || DEFAULT_URL);
    const newTab: BrowserTab = {
      id: generateId(),
      url: finalUrl,
      title: 'New Tab',
      isLoading: true,
      canGoBack: false,
      canGoForward: false,
    };

    setState(prev => ({
      ...prev,
      tabs: [...prev.tabs, newTab],
      activeTabId: newTab.id,
    }));
  }, []);

  const closeTab = useCallback((tabId: string) => {
    setState(prev => {
      const newTabs = prev.tabs.filter(t => t.id !== tabId);
      
      if (newTabs.length === 0) {
        return {
          ...prev,
          isOpen: false,
          tabs: [],
          activeTabId: null,
        };
      }

      let newActiveId = prev.activeTabId;
      if (prev.activeTabId === tabId) {
        const closedIndex = prev.tabs.findIndex(t => t.id === tabId);
        newActiveId = newTabs[Math.min(closedIndex, newTabs.length - 1)]?.id || null;
      }

      return {
        ...prev,
        tabs: newTabs,
        activeTabId: newActiveId,
      };
    });
  }, []);

  const switchToTab = useCallback((tabId: string) => {
    setState(prev => ({
      ...prev,
      activeTabId: tabId,
    }));
  }, []);

  const updateTabUrl = useCallback((tabId: string, url: string) => {
    setState(prev => ({
      ...prev,
      tabs: prev.tabs.map(tab =>
        tab.id === tabId ? { ...tab, url } : tab
      ),
    }));
  }, []);

  const setTabLoading = useCallback((tabId: string, isLoading: boolean) => {
    setState(prev => ({
      ...prev,
      tabs: prev.tabs.map(tab =>
        tab.id === tabId ? { ...tab, isLoading } : tab
      ),
    }));
  }, []);

  const setTabTitle = useCallback((tabId: string, title: string) => {
    setState(prev => ({
      ...prev,
      tabs: prev.tabs.map(tab =>
        tab.id === tabId ? { ...tab, title } : tab
      ),
    }));
  }, []);

  const addBookmark = useCallback((url: string) => {
    setState(prev => {
      if (prev.bookmarks.includes(url)) return prev;
      const newBookmarks = [...prev.bookmarks, url];
      saveBookmarks(newBookmarks);
      return { ...prev, bookmarks: newBookmarks };
    });
  }, []);

  const removeBookmark = useCallback((url: string) => {
    setState(prev => {
      const newBookmarks = prev.bookmarks.filter(b => b !== url);
      saveBookmarks(newBookmarks);
      return { ...prev, bookmarks: newBookmarks };
    });
  }, []);

  const isBookmarked = useCallback((url: string): boolean => {
    return state.bookmarks.includes(url);
  }, [state.bookmarks]);

  return (
    <BrowserContext.Provider
      value={{
        ...state,
        openBrowser,
        closeBrowser,
        navigateToUrl,
        createTab,
        closeTab,
        switchToTab,
        updateTabUrl,
        setTabLoading,
        setTabTitle,
        addBookmark,
        removeBookmark,
        isBookmarked,
        getCurrentTab,
        getCurrentUrl,
      }}
    >
      {children}
    </BrowserContext.Provider>
  );
};

export const useBrowserContext = () => {
  const context = useContext(BrowserContext);
  if (!context) {
    throw new Error('useBrowserContext must be used within BrowserProvider');
  }
  return context;
};
