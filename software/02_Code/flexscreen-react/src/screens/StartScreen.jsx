import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Pictures/logo_brightmode_transparent.svg';

// ─────────────────────────────────────────────
// Farben direkt aus deiner index.css übernommen:
//   Hintergrund: #bd9a76
//   Text:        #232e4c
//   Trennlinie:  #F2E8C6
// ─────────────────────────────────────────────

const StatusRow = ({ connected, label }) => (
  <div className="flex items-center gap-3 text-sm"
       style={{ color: '#232e4c', fontFamily: 'Coolvetica Rg, sans-serif' }}>
    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
      connected
        ? 'bg-green-600'
        : 'bg-red-500'
    }`} />
    {label}
  </div>
);

const SidebarBtn = ({ children, label, muted = false, onClick }) => (
  <button
    title={label}
    onClick={onClick}
    className="w-11 h-11 rounded-lg flex items-center justify-center
               transition-colors duration-150"
    style={{
      color: muted ? '#232e4c44' : '#232e4c99',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
    }}
  >
    {children}
  </button>
);

const ActionBtn = ({ children, label, onClick, accent = false, danger = false }) => (
  <button
    onClick={onClick}
    className="flex-1 flex flex-col items-center justify-center gap-1.5
               py-3 min-h-[72px] text-xs font-medium
               transition-colors duration-150 leading-tight text-center"
    style={{
      fontFamily: 'Coolvetica Rg, sans-serif',
      fontSize: '2vh',
      color: danger ? '#b91c1c' : '#232e4c',
      background: 'transparent',
      border: 'none',
      borderRight: '1px solid #F2E8C6',
      cursor: 'pointer',
    }}
  >
    {children}
    <span style={{ whiteSpace: 'pre-line' }}>{label}</span>
  </button>
);

// ─────────────────────────────────────────────

const StartScreen = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState('');

  // Live-Uhr — läuft einmal beim Start, dann alle 10 Sekunden
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col h-screen select-none"
         style={{ backgroundColor: '#bd9a76' }}>  {/* ← deine exakte Farbe */}

      {/* ── Topbar ── */}
      <div className="flex justify-between items-center px-4 h-10"
           style={{ borderBottom: '1px solid #F2E8C6' }}>  {/* ← deine Trennlinie */}

        <span style={{
          fontFamily: 'Coolvetica Rg, sans-serif',
          fontSize: '3vh',
          color: '#232e4c',
        }}>
          FlexPrint
        </span>

        <span style={{
          fontFamily: 'Coolvetica Rg, sans-serif',
          fontSize: '3vh',
          color: '#232e4c',
          fontVariantNumeric: 'tabular-nums',
        }}>
          {time}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <div className="flex flex-col items-center w-14 py-3 gap-1"
             style={{ borderRight: '1px solid #F2E8C6' }}>

          <SidebarBtn label="Zurück">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none"
                 stroke="currentColor" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </SidebarBtn>

          <SidebarBtn label="Menü">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none"
                 stroke="currentColor" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
            </svg>
          </SidebarBtn>

          <SidebarBtn label="Weiter">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none"
                 stroke="currentColor" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </SidebarBtn>

          <div className="flex-1" />   {/* ← schiebt Info-Button nach unten */}

          <SidebarBtn label="Info" muted>
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none"
                 stroke="currentColor" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <circle cx="12" cy="16" r="0.5" fill="currentColor"/>
            </svg>
          </SidebarBtn>
        </div>

        {/* ── Mitte: Logo + Statusanzeigen ── */}
        <div className="flex flex-1 items-center justify-center gap-10 px-8">

          {/* Logo — genau wie dein header-logo */}
          <img
            src={logo}
            alt="FlexPrint Logo"
            style={{ maxHeight: '26vh', width: 'auto', display: 'block' }}
          />

          {/* Trennstrich zwischen Logo und Status */}
          <div style={{ width: '2px', height: '16vh', background: '#F2E8C6' }} />

          {/* Statusanzeigen */}
          <div className="flex flex-col gap-4">
            <StatusRow connected={true}  label="Moonraker: connected"  />
            <StatusRow connected={false} label="Klipper: disconnected" />
          </div>

        </div>
      </div>

      {/* ── Action-Buttons ── */}
      <div className="flex"
           style={{ borderTop: '1px solid #F2E8C6' }}>

        <ActionBtn label={"Power On\nPrinter"} onClick={() => {}}>
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none"
               stroke="currentColor" strokeWidth="1.8"
               strokeLinecap="round" strokeLinejoin="round">
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
            <line x1="12" y1="2" x2="12" y2="12"/>
          </svg>
        </ActionBtn>

        <ActionBtn label={"System\nRestart"} onClick={() => {}}>
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none"
               stroke="currentColor" strokeWidth="1.8"
               strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
        </ActionBtn>

        <ActionBtn label={"System\nShutdown"} danger onClick={() => {}}>
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none"
               stroke="currentColor" strokeWidth="1.8"
               strokeLinecap="round" strokeLinejoin="round">
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
            <line x1="12" y1="2" x2="12" y2="12"/>
          </svg>
        </ActionBtn>

        <ActionBtn label="Menu" accent onClick={() => navigate('/dashboard')}>
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none"
               stroke="currentColor" strokeWidth="1.8"
               strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
          </svg>
        </ActionBtn>

        {/* Letzter Button: kein borderRight */}
        <button
          onClick={() => {}}
          className="flex-1 flex flex-col items-center justify-center gap-1.5
                     py-3 min-h-[72px] transition-colors duration-150"
          style={{
            fontFamily: 'Coolvetica Rg, sans-serif',
            fontSize: '2vh',
            color: '#232e4c',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none"
               stroke="currentColor" strokeWidth="1.8"
               strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
          <span>Retry</span>
        </button>

      </div>
    </div>
  );
};

export default StartScreen;