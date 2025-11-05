"use client";
import React, { useState, useRef } from 'react';
import SidebarMenu from "../components/SidebarMenu";
import MainContent from "../components/MainContent";
import UploadPromptForm from "../components/UploadPromptForm";
import ToastMessage from "../components/ToastMessage";

export default function HomeLandingPage() {
  const [image, setImage] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState<string[]>([]); // URLs of generated images
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // fileInputRef removed, handled in UploadPromptForm

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!image) {
      setMessage({ type: 'error', text: 'Please select an image to upload.' });
      return;
    }
    if (!prompt.trim()) {
      setMessage({ type: 'error', text: 'Please enter a prompt.' });
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('prompt', prompt);
    try {
      // Replace with your actual API endpoint and JWT logic
      const token = localStorage.getItem('jwt_token');
      if (!token) throw new Error('No JWT token found. Please sign in again.');
      const res = await fetch('http://localhost:3000/api/generate', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Generation failed');
      }
      // Assume response returns { imageUrls: string[] }
      const data = await res.json();
      if (data.imageUrls && Array.isArray(data.imageUrls)) {
        setResponses(prev => [...data.imageUrls, ...prev]);
      }
      setMessage({ type: 'success', text: 'Image and prompt submitted! Generation started.' });
      setImage(null);
      setPrompt('');
      // fileInputRef reset handled in UploadPromptForm
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #f8fafc 0%, #fceabb 100%)',
        fontFamily: 'Poppins, Arial, sans-serif',
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
      }}
    >
      <SidebarMenu open={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'relative',
        }}
      >
        <div
          style={{
            flex: 1,
            width: '100%',
            maxWidth: 900,
            margin: '0 auto',
            padding: '32px 8px 120px 8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            boxSizing: 'border-box',
          }}
        >
          <MainContent responses={responses} />
        </div>
        <div
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255,255,255,0.98)',
            borderTop: '1.5px solid #f3e9e1',
            boxShadow: '0 -2px 8px #fceabb22',
            padding: '16px 8px',
            display: 'flex',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <div style={{ width: '100%', maxWidth: 900 }}>
            <UploadPromptForm
              image={image}
              prompt={prompt}
              loading={loading}
              onImageChange={handleFileChange}
              onPromptChange={e => setPrompt(e.target.value)}
              onSubmit={handleGenerate}
            />
          </div>
        </div>
        <ToastMessage message={message} />
      </main>
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          main {
            max-width: 100vw !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .sidebar {
            width: 60px !important;
          }
        }
        @media (max-width: 600px) {
          main {
            padding-top: 8px !important;
            padding-bottom: 80px !important;
          }
          .sidebar {
            display: none !important;
          }
          .upload-form {
            flex-direction: column !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}


