import { useState, useCallback } from 'react';
import { getInjectiveAddress } from '@injectivelabs/sdk-ts';
import { BigNumberInBase } from '@injectivelabs/utils';
import { generateWallet, encryptPrivateKey, decryptPrivateKey } from '../utils/walletGenerator';

interface WalletData {
  address: string;
  mnemonic: string;
  privateKey: string;
}

interface StandaloneWalletState {
  address: string;
  balance: string;
  isUnlocked: boolean;
  hasWallet: boolean;
  isCreating: boolean;
  error: string | null;
}

export const useStandaloneWallet = () => {
  const [state, setState] = useState<StandaloneWalletState>({
    address: '',
    balance: '0',
    isUnlocked: false,
    hasWallet: false,
    isCreating: false,
    error: null,
  });

  const fetchBalance = useCallback(async (injAddress: string) => {
    try {
      const response = await fetch(
        `https://sentry.lcd.injective.network/cosmos/bank/v1beta1/balances/${injAddress}`
      );
      if (response.ok) {
        const data = await response.json();
        const injBalance = data.balances?.find((b: { denom: string; amount: string }) => b.denom === 'inj');
        if (injBalance) {
          const balance = new BigNumberInBase(injBalance.amount).dividedBy(1e18).toFixed(4);
          setState(prev => ({ ...prev, balance }));
        }
      }
    } catch (err) {
      console.error('Failed to fetch balance:', err);
    }
  }, []);

  const createWallet = useCallback(async (password: string): Promise<WalletData> => {
    setState(prev => ({ ...prev, isCreating: true, error: null }));

    try {
      const wallet = generateWallet();
      const encryptedKey = await encryptPrivateKey(wallet.privateKey, password);
      
      localStorage.setItem('injective_wallet_encrypted', encryptedKey);
      localStorage.setItem('injective_wallet_address', wallet.address);

      const injAddress = getInjectiveAddress(wallet.address);

      setState(prev => ({
        ...prev,
        address: injAddress,
        isUnlocked: true,
        hasWallet: true,
        isCreating: false,
      }));

      await fetchBalance(injAddress);

      return wallet;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create wallet';
      setState(prev => ({
        ...prev,
        isCreating: false,
        error: errorMessage,
      }));
      throw err;
    }
  }, [fetchBalance]);

  const unlockWallet = useCallback(async (password: string) => {
    setState(prev => ({ ...prev, error: null }));

    try {
      const encryptedKey = localStorage.getItem('injective_wallet_encrypted');
      const storedAddress = localStorage.getItem('injective_wallet_address');

      if (!encryptedKey || !storedAddress) {
        throw new Error('No wallet found');
      }

      await decryptPrivateKey(encryptedKey, password);
      const injAddress = getInjectiveAddress(storedAddress);

      setState(prev => ({
        ...prev,
        address: injAddress,
        isUnlocked: true,
        hasWallet: true,
      }));

      await fetchBalance(injAddress);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to unlock wallet';
      setState(prev => ({
        ...prev,
        error: errorMessage,
      }));
      throw err;
    }
  }, [fetchBalance]);

  const lockWallet = useCallback(() => {
    setState({
      address: '',
      balance: '0',
      isUnlocked: false,
      hasWallet: true,
      isCreating: false,
      error: null,
    });
  }, []);

  const checkWalletExists = useCallback(() => {
    const hasWallet = !!localStorage.getItem('injective_wallet_encrypted');
    setState(prev => ({ ...prev, hasWallet }));
    return hasWallet;
  }, []);

  return {
    ...state,
    createWallet,
    unlockWallet,
    lockWallet,
    checkWalletExists,
    refreshBalance: () => fetchBalance(state.address),
  };
};
