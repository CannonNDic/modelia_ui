
"use client";
import React, { useState } from 'react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Sign in failed');
      }
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('jwt_token', data.token);
        // Redirect to dashboard or home
        window.location.href = '/';
      } else {
        throw new Error('No token received');
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(120deg, #f8fafc 0%, #fceabb 100%)',
      fontFamily: 'Poppins, Arial, sans-serif',
    }}>
      <div style={{
        maxWidth: 420,
        width: '100%',
        background: 'rgba(255,255,255,0.95)',
        borderRadius: 18,
        boxShadow: '0 8px 32px rgba(60,60,60,0.12)',
        padding: 40,
        border: '1px solid #f3e9e1',
      }}>
        <h2 style={{
          textAlign: 'center',
          fontWeight: 700,
          fontSize: 32,
          marginBottom: 32,
          letterSpacing: 1,
          color: '#b76e79',
          fontFamily: 'Poppins, Arial, sans-serif',
        }}>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 22 }}>
            <label htmlFor="email" style={{ fontWeight: 500, color: '#b76e79', fontSize: 15 }}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                marginTop: 6,
                borderRadius: 8,
                border: '1px solid #e2d4c6',
                fontSize: 16,
                fontFamily: 'inherit',
                background: '#f9f6f2',
                outline: 'none',
                transition: 'border 0.2s',
              }}
            />
          </div>
          <div style={{ marginBottom: 22 }}>
            <label htmlFor="password" style={{ fontWeight: 500, color: '#b76e79', fontSize: 15 }}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                marginTop: 6,
                borderRadius: 8,
                border: '1px solid #e2d4c6',
                fontSize: 16,
                fontFamily: 'inherit',
                background: '#f9f6f2',
                outline: 'none',
                transition: 'border 0.2s',
              }}
            />
          </div>
          {error && <div style={{ color: '#d7263d', marginBottom: 18, textAlign: 'center', fontWeight: 500 }}>{error}</div>}
          <button type="submit" style={{
            width: '100%',
            padding: '12px 0',
            background: 'linear-gradient(90deg, #b76e79 0%, #fceabb 100%)',
            color: '#fff',
            fontWeight: 600,
            fontSize: 18,
            border: 'none',
            borderRadius: 8,
            boxShadow: '0 2px 8px #fceabb44',
            cursor: 'pointer',
            marginTop: 8,
            transition: 'background 0.2s',
            opacity: loading ? 0.7 : 1,
          }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <span style={{ color: '#b76e79', fontWeight: 500 }}>Don't have an account? </span>
          <a href="/register" style={{ color: '#b76e79', textDecoration: 'underline', fontWeight: 600, marginLeft: 4 }}>Register</a>
        </div>
      </div>
    </div>
  );
}
