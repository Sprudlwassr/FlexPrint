import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Pictures/logo_brightmode_transparent.svg';
import { useMoonraker } from '../context/MoonrakerContext';

const StatusRow = ({ connected, label }) => (
  <div className="startStatusRow">
    <span className={`startStatusDot ${connected ? 'startStatusDotOn' : 'startStatusDotOff'}`} />
    {label}
  </div>
);

const StartScreen = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState('');
  const { moonrakerConnected, klipperState, temps } = useMoonraker();

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="startWrapper">

      {/* Header — identisch mit Dashboard */}
      <div className="header">
        <div className="headerLeft"></div>
        <div className="headerCenter"></div>
        <div className="headerRight">
          <div className="headerTemps">
            <span className="tempItem">🌡 {temps.extruder.toFixed(1)}°</span>
            <span className="tempItem">🛏 {temps.bed.toFixed(1)}°</span>
            <span className="tempItem">Pi: {temps.pi.toFixed(1)}°</span>
          </div>
          {time}
        </div>
      </div>

      {/* Body — Logo + Status */}
      <div className="startBody" style={{ borderTop: '1px solid #F2E8C6' }}>
        <img src={logo} alt="FlexPrint Logo" className="startLogo" />
        <div className="startDivider" />
        <div className="startStatusList">
          <StatusRow connected={moonrakerConnected} label={`Moonraker: ${moonrakerConnected ? 'connected' : 'disconnected'}`} />
          <StatusRow connected={klipperState === 'ready'} label={`Klipper: ${klipperState}`} />
        </div>
      </div>

      {/* Footer — gleicher Stil wie Dashboard */}
      <div className="menuFooter">

        <button className="footerBtn" onClick={() => {}}>
          <span className="footerBtnIcon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none"
                 stroke="currentColor" strokeWidth="1.8"
                 strokeLinecap="round" strokeLinejoin="round">
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
              <line x1="12" y1="2" x2="12" y2="12"/>
            </svg>
          </span>
          <span className="footerBtnLabel">Power On</span>
        </button>

        <button className="footerBtn" onClick={() => {}}>
          <span className="footerBtnIcon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none"
                 stroke="currentColor" strokeWidth="1.8"
                 strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
          </span>
          <span className="footerBtnLabel">Restart</span>
        </button>

        <button className="footerBtn footerBtnDanger" onClick={() => {}}>
          <span className="footerBtnIcon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none"
                 stroke="currentColor" strokeWidth="1.8"
                 strokeLinecap="round" strokeLinejoin="round">
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
              <line x1="12" y1="2" x2="12" y2="12"/>
            </svg>
          </span>
          <span className="footerBtnLabel">Shutdown</span>
        </button>

        <button className="footerBtn" onClick={() => navigate('/dashboard')}>
          <span className="footerBtnIcon">⊞</span>
          <span className="footerBtnLabel">Menu</span>
        </button>

        <button className="footerBtn" onClick={() => {}}>
          <span className="footerBtnIcon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none"
                 stroke="currentColor" strokeWidth="1.8"
                 strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </span>
          <span className="footerBtnLabel">Retry</span>
        </button>

      </div>
    </div>
  );
};

export default StartScreen;
