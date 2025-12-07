import { useState, useCallback, useMemo, useEffect } from 'react';
import { ChainId, EvmChainId } from '@injectivelabs/ts-types';
import { Network, getNetworkEndpoints } from '@injectivelabs/networks';
import { MsgBroadcaster } from '@injectivelabs/wallet-core';
import { Wallet } from '@injectivelabs/wallet-base';
import { WalletStrategy } from '@injectivelabs/wallet-strategy';
import { getInjectiveAddress, MsgSend } from '@injectivelabs/sdk-ts';
import { BigNumberInBase } from '@injectivelabs/utils';

export type WalletType = 'metamask' | 'keplr' | 'leap' | 'rabby';

interface WalletState {
  address: string;
  injectiveAddress: string;
  balance: string;
  walletType: WalletType | null;
  isConnecting: boolean;
  isConnected: boolean;
  error: string | null;
}

const NETWORK = Network.Mainnet;
const CHAIN_ID = ChainId.Mainnet;
const EVM_CHAIN_ID = EvmChainId.Mainnet;

const walletStrategy = new WalletStrategy({
  chainId: CHAIN_ID,
  evmOptions: {
    rpcUrl: 'https://sentry.evm-rpc.injective.network/',
    evmChainId: EVM_CHAIN_ID,
  },
  strategies: {},
});

const msgBroadcaster = new MsgBroadcaster({
  walletStrategy,
  simulateTx: true,
  network: NETWORK,
  endpoints: getNetworkEndpoints(NETWORK),
  gasBufferCoefficient: 1.1,
});

export const useWallet = () => {
  const [state, setState] = useState<WalletState>({
    address: '',
    injectiveAddress: '',
    balance: '0',
    walletType: null,
    isConnecting: false,
    isConnected: false,
    error: null,
  });

  const injectiveAddress = useMemo(() => {
    if (state.address) {
      try {
        return getInjectiveAddress(state.address);
      } catch {
        return state.address;
      }
    }
    return '';
  }, [state.address]);

  useEffect(() => {
    if (injectiveAddress !== state.injectiveAddress) {
      setState(prev => ({ ...prev, injectiveAddress }));
    }
  }, [injectiveAddress, state.injectiveAddress]);

  const fetchBalance = useCallback(async (injAddress: string) => {
    try {
      const response = await fetch(
        `https://sentry.lcd.injective.network/cosmos/bank/v1beta1/balances/${injAddress}`
      );
      if (response.ok) {
        const data = await response.json();
        const injBalance = data.balances?.find((b: { denom: string }) => b.denom === 'inj');
        if (injBalance) {
          const balance = new BigNumberInBase(injBalance.amount).toWei().toFixed(4);
          setState(prev => ({ ...prev, balance }));
        }
      }
    } catch (err) {
      console.error('Failed to fetch balance:', err);
    }
  }, []);

  const connect = useCallback(async (walletType: WalletType) => {
    setState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      let wallet: Wallet;
      
      switch (walletType) {
        case 'metamask':
          wallet = Wallet.Metamask;
          break;
        case 'keplr':
          wallet = Wallet.Keplr;
          break;
        case 'leap':
          wallet = Wallet.Leap;
          break;
        case 'rabby':
          wallet = Wallet.Metamask; // Rabby uses Metamask interface
          break;
        default:
          throw new Error('Unsupported wallet');
      }

      walletStrategy.setWallet(wallet);
      const addresses = await walletStrategy.getAddresses();

      if (addresses.length === 0) {
        throw new Error('No addresses found');
      }

      const address = addresses[0];
      const injAddress = getInjectiveAddress(address);

      setState(prev => ({
        ...prev,
        address,
        injectiveAddress: injAddress,
        walletType,
        isConnected: true,
        isConnecting: false,
      }));

      // Fetch balance after connection
      await fetchBalance(injAddress);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect wallet';
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: errorMessage,
      }));
    }
  }, [fetchBalance]);

  const disconnect = useCallback(() => {
    setState({
      address: '',
      injectiveAddress: '',
      balance: '0',
      walletType: null,
      isConnecting: false,
      isConnected: false,
      error: null,
    });
  }, []);

  const sendTransaction = useCallback(async (
    toAddress: string,
    amount: string,
    denom: string = 'inj'
  ) => {
    if (!state.injectiveAddress) {
      throw new Error('Wallet not connected');
    }

    const msg = MsgSend.fromJSON({
      amount: {
        denom,
        amount: new BigNumberInBase(amount).toWei().toFixed(),
      },
      srcInjectiveAddress: state.injectiveAddress,
      dstInjectiveAddress: toAddress,
    });

    const result = await msgBroadcaster.broadcastV2({
      injectiveAddress: state.injectiveAddress,
      msgs: [msg],
    });

    // Refresh balance after transaction
    await fetchBalance(state.injectiveAddress);

    return result;
  }, [state.injectiveAddress, fetchBalance]);

  const signMessage = useCallback(async (message: string) => {
    if (!state.address) {
      throw new Error('Wallet not connected');
    }

    const signature = await walletStrategy.signArbitrary(
      state.address,
      message
    );

    return signature;
  }, [state.address]);

  return {
    ...state,
    connect,
    disconnect,
    sendTransaction,
    signMessage,
    refreshBalance: () => fetchBalance(state.injectiveAddress),
  };
};
