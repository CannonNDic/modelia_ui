import React, { useRef } from "react";

interface UploadPromptFormProps {
  image: File | null;
  prompt: string;
  loading: boolean;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPromptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function UploadPromptForm({ image, prompt, loading, onImageChange, onPromptChange, onSubmit }: UploadPromptFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 24,
        alignItems: 'flex-end',
        maxWidth: 700,
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          flex: '1 1 160px',
          minWidth: 140,
          maxWidth: 180,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <label htmlFor="image" style={{ fontWeight: 500, color: '#b76e79', fontSize: 15, marginBottom: 10 }}>Upload Image</label>
        <label htmlFor="image" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80, background: '#f9f6f2', borderRadius: 16, border: '2px dashed #e2d4c6', boxShadow: '0 2px 8px #fceabb44', marginBottom: 8 }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#b76e79" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={onImageChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
        </label>
        {image && <span style={{ fontSize: 13, color: '#b76e79', marginTop: 4, maxWidth: 120, textAlign: 'center', wordBreak: 'break-all' }}>{image.name}</span>}
      </div>
      <div
        style={{
          flex: '2 1 220px',
          minWidth: 180,
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          marginBottom: 12,
        }}
      >
        <label htmlFor="prompt" style={{ fontWeight: 500, color: '#b76e79', fontSize: 15, marginBottom: 10 }}>Text Prompt</label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={onPromptChange}
          required
          rows={4}
          style={{
            width: '100%',
            padding: '16px 18px',
            borderRadius: 12,
            border: '1.5px solid #e2d4c6',
            fontSize: 17,
            fontFamily: 'inherit',
            background: '#f9f6f2',
            outline: 'none',
            transition: 'border 0.2s',
            resize: 'vertical',
            minWidth: 120,
            boxSizing: 'border-box',
            color: '#6d2c37',
          }}
          placeholder="Describe your fashion idea..."
        />
      </div>
      <button
        type="submit"
        style={{
          padding: '18px 32px',
          background: 'linear-gradient(90deg, #b76e79 0%, #fceabb 100%)',
          color: '#fff',
          fontWeight: 600,
          fontSize: 20,
          border: 'none',
          borderRadius: 10,
          boxShadow: '0 2px 8px #fceabb44',
          cursor: 'pointer',
          marginLeft: 0,
          marginBottom: 12,
          transition: 'background 0.2s',
          opacity: loading ? 0.7 : 1,
          minWidth: 120,
          width: '100%',
          maxWidth: 180,
        }}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>
    </form>
  );
}
