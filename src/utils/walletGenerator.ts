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

export const importFromPrivateKey = (privateKeyHex: string): GeneratedWallet => {
  const privateKey = PrivateKey.fromHex(privateKeyHex);
  const publicKey = privateKey.toPublicKey().toBase64();
  const ethAddress = privateKey.toAddress().address;
  const injectiveAddress = getInjectiveAddress(ethAddress);

  return {
    mnemonic: '',
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

export const decryptData = async (encryptedData: string, password: string): Promise<string> => {
  const combined = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
  const salt = combined.slice(0, 16);
  const iv = combined.slice(16, 28);
  const data = combined.slice(28);

  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

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
    ['decrypt']
  );

  const decryptedData = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );

  const decoder = new TextDecoder();
  return decoder.decode(decryptedData);
};

// Add the missing decryptPrivateKey export
export const decryptPrivateKey = async (encryptedPrivateKey: string, password: string): Promise<string> => {
  return await decryptData(encryptedPrivateKey, password);
};

// Add encryptPrivateKey for completeness
export const encryptPrivateKey = async (privateKey: string, password: string): Promise<string> => {
  return await encryptData(privateKey, password);
};
