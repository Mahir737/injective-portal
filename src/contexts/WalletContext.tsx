import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  walletType: string | null;
  connect: (type: string) => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<string | null>(null);

  const connect = useCallback(async (type: string) => {
    try {
      // Simplified wallet connection - just for UI demonstration
      // In production, you would integrate with actual wallet providers
      console.log(`Connecting to ${type} wallet...`);
      
      // Simulate connection
      const mockAddress = 'inj1' + Math.random().toString(36).substring(2, 15);
      setAddress(mockAddress);
      setWalletType(type);
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }, []);

  const disconnect = useCallback(() => {
    setIsConnected(false);
    setAddress(null);
    setWalletType(null);
  }, []);

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        walletType,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
