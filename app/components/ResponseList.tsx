import React from "react";

interface ResponseListProps {
  responses: string[];
}

export default function ResponseList({ responses }: ResponseListProps) {
  if (!responses.length) return null;
  return (
    <div style={{ width: '100%', maxWidth: 600, margin: '0 auto', marginBottom: 32 }}>
      <h3 style={{ color: '#b76e79', fontWeight: 600, fontSize: 20, marginBottom: 16 }}>Generated Images</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {responses.map((url, idx) => (
          <div key={idx} style={{ width: '100%', background: '#f9f6f2', borderRadius: 12, boxShadow: '0 2px 8px #fceabb44', border: '1px solid #e2d4c6', padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={url} alt={`Generated ${idx + 1}`} style={{ width: '100%', maxWidth: 400, height: 'auto', borderRadius: 8, marginBottom: 8 }} />
            <span style={{ fontSize: 13, color: '#b76e79' }}>Image {idx + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
