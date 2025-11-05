"use client";
import React, { useState, useRef } from 'react';

export default function GeneratePage() {
  const [token, setToken] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (!token) {
      setMessage('Please enter your JWT token.');
      return;
    }
    if (!image) {
      setMessage('Please select an image to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('image', image);
    try {
      const res = await fetch('http://localhost:3000/api/generate', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Upload failed');
      }
      setMessage('Image uploaded and generation started!');
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f8fafc 0%, #fceabb 100%)', fontFamily: 'Poppins, Arial, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 420, width: '100%', background: 'rgba(255,255,255,0.95)', borderRadius: 18, boxShadow: '0 8px 32px rgba(60,60,60,0.12)', padding: 40, border: '1px solid #f3e9e1' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 700, fontSize: 32, marginBottom: 32, letterSpacing: 1, color: '#b76e79', fontFamily: 'Poppins, Arial, sans-serif' }}>Generate Fashion Image</h2>
        <form onSubmit={handleUpload}>
          <div style={{ marginBottom: 22 }}>
            <label htmlFor="token" style={{ fontWeight: 500, color: '#b76e79', fontSize: 15 }}>JWT Token</label>
            <input
              type="text"
              id="token"
              value={token}
              onChange={handleTokenChange}
              required
              style={{ width: '100%', padding: '12px 14px', marginTop: 6, borderRadius: 8, border: '1px solid #e2d4c6', fontSize: 16, fontFamily: 'inherit', background: '#f9f6f2', outline: 'none', transition: 'border 0.2s' }}
              placeholder="Paste your JWT token here"
            />
          </div>
          <div style={{ marginBottom: 22 }}>
            <label htmlFor="image" style={{ fontWeight: 500, color: '#b76e79', fontSize: 15 }}>Upload Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ width: '100%', padding: '12px 14px', marginTop: 6, borderRadius: 8, border: '1px solid #e2d4c6', fontSize: 16, fontFamily: 'inherit', background: '#f9f6f2', outline: 'none', transition: 'border 0.2s' }}
            />
          </div>
          {message && <div style={{ color: message.includes('failed') ? '#d7263d' : '#3bb273', marginBottom: 18, textAlign: 'center', fontWeight: 500 }}>{message}</div>}
          <button type="submit" style={{ width: '100%', padding: '12px 0', background: 'linear-gradient(90deg, #b76e79 0%, #fceabb 100%)', color: '#fff', fontWeight: 600, fontSize: 18, border: 'none', borderRadius: 8, boxShadow: '0 2px 8px #fceabb44', cursor: 'pointer', marginTop: 8, transition: 'background 0.2s' }}>
            Generate
          </button>
        </form>
      </div>
    </div>
  );
}
