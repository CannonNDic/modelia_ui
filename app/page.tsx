import Image from "next/image";

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f8fafc 0%, #fceabb 100%)', fontFamily: 'Poppins, Arial, sans-serif' }}>
      <header style={{ width: '100%', padding: '32px 0 0 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: 48, fontWeight: 800, color: '#b76e79', letterSpacing: 2, marginBottom: 8, fontFamily: 'inherit' }}>Modelia</h1>
        <nav style={{ marginTop: 16 }}>
          <a href="/generate" style={{ margin: '0 18px', color: '#b76e79', fontWeight: 600, fontSize: 20, textDecoration: 'none' }}>Generate</a>
          <a href="/signin" style={{ margin: '0 18px', color: '#b76e79', fontWeight: 600, fontSize: 20, textDecoration: 'none' }}>Sign In</a>
          <a href="/register" style={{ margin: '0 18px', color: '#b76e79', fontWeight: 600, fontSize: 20, textDecoration: 'none' }}>Register</a>
        </nav>
      </header>
      <main style={{ maxWidth: 600, margin: '60px auto', background: 'rgba(255,255,255,0.95)', borderRadius: 18, boxShadow: '0 8px 32px rgba(60,60,60,0.12)', padding: 40, border: '1px solid #f3e9e1', textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: '#b76e79', marginBottom: 24 }}>Welcome to Modelia</h2>
        <p style={{ fontSize: 20, color: '#b76e79', marginBottom: 32 }}>
          Your fashion designer e-commerce platform for creative image generation and more.
        </p>
        <Image src="/next.svg" alt="Next.js logo" width={100} height={20} priority />
      </main>
    </div>
  );
}
