import React, { useState } from 'react';
import { Shield, Lock, Key, Eye, EyeOff } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import { useStandaloneWallet } from '../../hooks/useStandaloneWallet';

const SecuritySettings: React.FC = () => {
  const { settings, updateSecurity } = useSettings();
  const { exportMnemonic, exportPrivateKey, isUnlocked } = useStandaloneWallet();
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const autoLockOptions = [
    { value: 1, label: '1 minute' },
    { value: 5, label: '5 minutes' },
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
  ];

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setMessage('Password must be at least 8 characters');
      return;
    }
    // In production, this would update the encrypted wallet
    setMessage('Password changed successfully');
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleExportMnemonic = () => {
    if (!isUnlocked) {
      setMessage('Please unlock wallet first');
      return;
    }
    try {
      const mnemonic = exportMnemonic();
      navigator.clipboard.writeText(mnemonic);
      setMessage('Seed phrase copied to clipboard');
      setShowMnemonic(true);
    } catch (error) {
      setMessage('Failed to export seed phrase');
    }
  };

  const handleExportPrivateKey = () => {
    if (!isUnlocked) {
      setMessage('Please unlock wallet first');
      return;
    }
    try {
      const privateKey = exportPrivateKey();
      navigator.clipboard.writeText(privateKey);
      setMessage('Private key copied to clipboard');
      setShowPrivateKey(true);
    } catch (error) {
      setMessage('Failed to export private key');
    }
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '24px',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
    marginBottom: '8px',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '14px',
    marginBottom: '12px',
  };

  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #00F2FE 0%, #9E7FFF 100%)',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const dangerButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  };

  const toggleStyle = (active: boolean): React.CSSProperties => ({
    width: '48px',
    height: '28px',
    borderRadius: '14px',
    background: active 
      ? 'linear-gradient(135deg, #00F2FE 0%, #9E7FFF 100%)'
      : 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  });

  const toggleKnobStyle = (active: boolean): React.CSSProperties => ({
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    background: '#fff',
    position: 'absolute',
    top: '3px',
    left: active ? '23px' : '3px',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  });

  const messageStyle: React.CSSProperties = {
    padding: '12px',
    background: 'rgba(0, 242, 254, 0.1)',
    border: '1px solid rgba(0, 242, 254, 0.3)',
    borderRadius: '8px',
    color: '#00F2FE',
    fontSize: '14px',
    marginTop: '12px',
  };

  return (
    <div>
      {/* Auto-Lock Timer */}
      <div style={sectionStyle}>
        <label style={labelStyle}>
          <Lock size={16} style={{ display: 'inline', marginRight: '8px' }} />
          Auto-Lock Timer
        </label>
        <select
          style={selectStyle}
          value={settings.security.autoLockMinutes}
          onChange={(e) => updateSecurity({ autoLockMinutes: Number(e.target.value) })}
        >
          {autoLockOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Biometric Authentication */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label style={labelStyle}>
            <Shield size={16} style={{ display: 'inline', marginRight: '8px' }} />
            Biometric Authentication
          </label>
          <div 
            style={toggleStyle(settings.security.biometricEnabled)}
            onClick={() => updateSecurity({ biometricEnabled: !settings.security.biometricEnabled })}
          >
            <div style={toggleKnobStyle(settings.security.biometricEnabled)} />
          </div>
        </div>
        <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '4px' }}>
          Use fingerprint or face recognition to unlock
        </p>
      </div>

      {/* Require Password for Transactions */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label style={labelStyle}>
            <Key size={16} style={{ display: 'inline', marginRight: '8px' }} />
            Require Password for Transactions
          </label>
          <div 
            style={toggleStyle(settings.security.requirePasswordForTransactions)}
            onClick={() => updateSecurity({ requirePasswordForTransactions: !settings.security.requirePasswordForTransactions })}
          >
            <div style={toggleKnobStyle(settings.security.requirePasswordForTransactions)} />
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div style={sectionStyle}>
        <label style={labelStyle}>Change Password</label>
        <input
          type="password"
          placeholder="Current Password"
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          style={inputStyle}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          style={inputStyle}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button style={buttonStyle} onClick={handleChangePassword}>
          Update Password
        </button>
      </div>

      {/* Export Seed Phrase */}
      <div style={sectionStyle}>
        <label style={labelStyle}>Backup Seed Phrase</label>
        <button 
          style={dangerButtonStyle} 
          onClick={handleExportMnemonic}
          disabled={!isUnlocked}
        >
          {showMnemonic ? <Eye size={16} /> : <EyeOff size={16} />}
          <span style={{ marginLeft: '8px' }}>
            {showMnemonic ? 'Hide' : 'Show'} Seed Phrase
          </span>
        </button>
        <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px' }}>
          ⚠️ Never share your seed phrase with anyone
        </p>
      </div>

      {/* Export Private Key */}
      <div style={sectionStyle}>
        <label style={labelStyle}>Export Private Key</label>
        <button 
          style={dangerButtonStyle} 
          onClick={handleExportPrivateKey}
          disabled={!isUnlocked}
        >
          {showPrivateKey ? <Eye size={16} /> : <EyeOff size={16} />}
          <span style={{ marginLeft: '8px' }}>
            {showPrivateKey ? 'Hide' : 'Show'} Private Key
          </span>
        </button>
        <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px' }}>
          ⚠️ Keep your private key secure and never share it
        </p>
      </div>

      {message && <div style={messageStyle}>{message}</div>}
    </div>
  );
};

export default SecuritySettings;
