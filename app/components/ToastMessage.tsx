import React from "react";

interface ToastMessageProps {
  message: { type: 'success' | 'error'; text: string } | null;
}

export default function ToastMessage({ message }: ToastMessageProps) {
  if (!message) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 32,
      right: 32,
      zIndex: 9999,
      background: message.type === 'success' ? '#3bb273' : '#d7263d',
      color: '#fff',
      padding: '16px 32px',
      borderRadius: 8,
      fontWeight: 600,
      boxShadow: '0 2px 8px #fceabb44',
      transition: 'opacity 0.3s',
    }}>
      {message.text}
    </div>
  );
}
