import React from "react";
import ResponseList from "./ResponseList";

interface MainContentProps {
  responses: string[];
}

export default function MainContent({ responses }: MainContentProps) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '40px 0 120px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 120px)' }}>
      <h2 style={{ fontWeight: 700, fontSize: 32, color: '#b76e79', marginBottom: 32, letterSpacing: 1 }}>Welcome to Modelia Home</h2>
      <ResponseList responses={responses} />
    </div>
  );
}
