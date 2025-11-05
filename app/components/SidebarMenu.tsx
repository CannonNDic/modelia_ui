import React from "react";

interface SidebarMenuProps {
  open: boolean;
  toggle: () => void;
}

const menuItems = [
  { href: "/home", label: "Generate", icon: <span style={{ fontSize: 24, color: '#b76e79' }}>&#x1F4A1;</span> },
  { href: "/gallery", label: "Gallery", icon: <span style={{ fontSize: 24, color: '#b76e79' }}>&#x1F5BC;</span> },
  { href: "/history", label: "History", icon: <span style={{ fontSize: 24, color: '#b76e79' }}>&#x1F4D3;</span> },
  { href: "/signin", label: "Sign In", icon: <span style={{ fontSize: 24, color: '#b76e79' }}>&#x1F511;</span> },
  { href: "/signout", label: "Sign Out", icon: <span style={{ fontSize: 24, color: '#b76e79' }}>&#x274C;</span> },
];

export default function SidebarMenu({ open, toggle }: SidebarMenuProps) {
  return (
    <aside style={{
      width: open ? 220 : 60,
      background: '#fff',
      borderRight: '1.5px solid #f3e9e1',
      padding: '40px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      boxShadow: '2px 0 8px #fceabb22',
      transition: 'width 0.2s',
      position: 'relative',
      zIndex: 2,
    }}>
      <button
        onClick={toggle}
        style={{
          position: 'absolute',
          top: 16,
          right: open ? -18 : -18,
          background: '#b76e79',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: 32,
          height: 32,
          cursor: 'pointer',
          boxShadow: '0 2px 8px #fceabb44',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3,
        }}
        aria-label={open ? 'Collapse menu' : 'Expand menu'}
      >
        {open ? <span style={{ fontSize: 20 }}>&#x25C0;</span> : <span style={{ fontSize: 20 }}>&#x25B6;</span>}
      </button>
      {open && (
        <h2 style={{ fontWeight: 800, fontSize: 32, color: '#b76e79', marginBottom: 32, letterSpacing: 2 }}>Modelia</h2>
      )}
      <nav style={{ width: '100%' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {menuItems.map(item => (
            <li key={item.href}>
              <a href={item.href} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: open ? 18 : 0,
                width: open ? '100%' : 48,
                height: 48,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                color: '#b76e79',
                fontWeight: 600,
                textDecoration: 'none',
                borderRadius: 8,
                marginBottom: 8,
                transition: 'all 0.2s',
                background: 'none',
              }}>
                {open ? item.label : item.icon}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
