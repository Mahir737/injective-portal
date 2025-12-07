import { useState } from 'react';
import { KeyRound, Download, Upload, Eye, EyeOff, Copy, Check, AlertTriangle } from 'lucide-react';

interface WalletSetupProps {
  onCreateWallet: (password: string) => Promise<string>;
  onImportWallet: (mnemonic: string, password: string) => Promise<void>;
}

const WalletSetup = ({ onCreateWallet, onImportWallet }: WalletSetupProps) => {
  const [mode, setMode] = useState<'choice' | 'create' | 'import'>('choice');
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [importMnemonic, setImportMnemonic] = useState('');
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [mnemonicConfirmed, setMnemonicConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateWallet = async () => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const generatedMnemonic = await onCreateWallet(password);
      setMnemonic(generatedMnemonic);
      setStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportWallet = async () => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!importMnemonic.trim()) {
      setError('Please enter your seed phrase');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await onImportWallet(importMnemonic.trim(), password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const copyMnemonic = async () => {
    await navigator.clipboard.writeText(mnemonic);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerStyle: React.CSSProperties = {
    padding: '20px',
    maxWidth: '500px',
    margin: '0 auto',
  };

  const cardStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '30px',
    backdropFilter: 'blur(10px)',
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #00F2FE 0%, #9E7FFF 100%)',
    border: 'none',
    borderRadius: '14px',
    color: '#000',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '20px',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '14px',
    marginBottom: '12px',
  };

  if (mode === 'choice') {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '24px',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '12px',
            textAlign: 'center',
          }}>
            Welcome to Injective Wallet
          </h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '14px',
            textAlign: 'center',
            marginBottom: '30px',
          }}>
            Create a new wallet or import an existing one
          </p>

          <button
            onClick={() => setMode('create')}
            style={{
              ...buttonStyle,
              marginTop: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <KeyRound size={20} />
            Create New Wallet
          </button>

          <button
            onClick={() => setMode('import')}
            style={{
              ...buttonStyle,
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <Upload size={20} />
            Import Existing Wallet
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'create') {
    if (step === 1) {
      return (
        <div style={containerStyle}>
          <div style={cardStyle}>
            <h2 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '20px',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '20px',
            }}>
              Create Password
            </h2>

            <input
              type="password"
              placeholder="Enter password (min 8 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={inputStyle}
            />

            {error && (
              <div style={{
                padding: '12px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                color: '#ef4444',
                fontSize: '13px',
                marginBottom: '12px',
              }}>
                {error}
              </div>
            )}

            <button
              onClick={handleCreateWallet}
              disabled={isLoading}
              style={buttonStyle}
            >
              {isLoading ? 'Creating...' : 'Continue'}
            </button>

            <button
              onClick={() => setMode('choice')}
              style={{
                ...buttonStyle,
                background: 'transparent',
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              Back
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={{
            padding: '16px',
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '12px',
            marginBottom: '20px',
            display: 'flex',
            gap: '12px',
          }}>
            <AlertTriangle size={20} color="#f59e0b" style={{ flexShrink: 0 }} />
            <div>
              <p style={{ color: '#f59e0b', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>
                Save Your Seed Phrase
              </p>
              <p style={{ color: 'rgba(245, 158, 11, 0.8)', fontSize: '12px', lineHeight: 1.5 }}>
                Write down these 12 words in order and store them safely. This is the ONLY way to recover your wallet.
              </p>
            </div>
          </div>

          <div style={{
            position: 'relative',
            padding: '20px',
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            marginBottom: '16px',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              filter: showMnemonic ? 'none' : 'blur(8px)',
            }}>
              {mnemonic.split(' ').map((word, index) => (
                <div
                  key={index}
                  style={{
                    padding: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    textAlign: 'center',
                  }}
                >
                  <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '11px' }}>
                    {index + 1}.
                  </span>
                  <span style={{ color: '#fff', fontSize: '13px', marginLeft: '6px', fontFamily: 'monospace' }}>
                    {word}
                  </span>
                </div>
              ))}
            </div>

            {!showMnemonic && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}>
                <button
                  onClick={() => setShowMnemonic(true)}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #00F2FE 0%, #9E7FFF 100%)',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#000',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Eye size={16} />
                  Reveal Seed Phrase
                </button>
              </div>
            )}
          </div>

          {showMnemonic && (
            <>
              <button
                onClick={copyMnemonic}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                }}
              >
                {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                marginBottom: '16px',
              }}>
                <input
                  type="checkbox"
                  checked={mnemonicConfirmed}
                  onChange={(e) => setMnemonicConfirmed(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '13px' }}>
                  I have saved my seed phrase in a safe place
                </span>
              </label>

              <button
                onClick={() => {/* Wallet is already created, just close setup */}}
                disabled={!mnemonicConfirmed}
                style={{
                  ...buttonStyle,
                  opacity: mnemonicConfirmed ? 1 : 0.5,
                  cursor: mnemonicConfirmed ? 'pointer' : 'not-allowed',
                }}
              >
                Complete Setup
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // Import mode
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '20px',
          fontWeight: 700,
          color: '#fff',
          marginBottom: '20px',
        }}>
          Import Wallet
        </h2>

        <textarea
          placeholder="Enter your 12-word seed phrase"
          value={importMnemonic}
          onChange={(e) => setImportMnemonic(e.target.value)}
          rows={4}
          style={{
            ...inputStyle,
            resize: 'none',
            fontFamily: 'monospace',
          }}
        />

        <input
          type="password"
          placeholder="Create password (min 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={inputStyle}
        />

        {error && (
          <div style={{
            padding: '12px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            color: '#ef4444',
            fontSize: '13px',
            marginBottom: '12px',
          }}>
            {error}
          </div>
        )}

        <button
          onClick={handleImportWallet}
          disabled={isLoading}
          style={buttonStyle}
        >
          {isLoading ? 'Importing...' : 'Import Wallet'}
        </button>

        <button
          onClick={() => setMode('choice')}
          style={{
            ...buttonStyle,
            background: 'transparent',
            color: 'rgba(255, 255, 255, 0.6)',
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default WalletSetup;
