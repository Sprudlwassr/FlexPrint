import { useState } from 'react';

const DISTANCES = [0.1, 0.5, 1, 5, 10, 25, 50];

const IconHomeAll = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
    <polyline points="9 21 9 12 15 12 15 21"/>
    <polyline points="8 3 12 1 16 3"/>
  </svg>
);

const IconHomeXY = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
    <polyline points="9 21 9 12 15 12 15 21"/>
  </svg>
);

const IconArrowUp = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3"/>
    <polyline points="12 16 12 8"/>
    <polyline points="8 12 12 8 16 12"/>
  </svg>
);

const IconArrowDown = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3"/>
    <polyline points="12 8 12 16"/>
    <polyline points="8 12 12 16 16 12"/>
  </svg>
);

const IconArrowLeft = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3"/>
    <polyline points="16 12 8 12"/>
    <polyline points="12 8 8 12 12 16"/>
  </svg>
);

const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3"/>
    <polyline points="8 12 16 12"/>
    <polyline points="12 8 16 12 12 16"/>
  </svg>
);

const IconZUp = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5"/>
    <polyline points="8 9 12 5 16 9"/>
    <line x1="8" y1="19" x2="16" y2="19"/>
  </svg>
);

const IconZDown = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <polyline points="8 15 12 19 16 15"/>
    <line x1="8" y1="5" x2="16" y2="5"/>
  </svg>
);

const MoveBtn = ({ icon, label, axisColor }) => (
  <button className="actionMoveBtn" onClick={() => {}}>
    <span className="actionMoveBtnIcon">{icon}</span>
    <span className="actionMoveBtnLabel">{label}</span>
    <span className="actionMoveBtnBar" style={{ backgroundColor: axisColor }} />
  </button>
);

const ActionsScreen = () => {
  const [distance, setDistance] = useState(1);
  const pos = { x: '0.00', y: '0.00', z: '0.00' };

  return (
    <div className="actionsScreen">

      {/* Movement grid */}
      <div className="actionGrid">
        <MoveBtn icon={<IconHomeAll />} label="Home All" axisColor="#F2E8C6" />
        <MoveBtn icon={<IconArrowUp />} label="Y+"       axisColor="#e040fb" />
        <MoveBtn icon={<IconHomeXY />} label="Home XY"  axisColor="#F2E8C6" />
        <MoveBtn icon={<IconZUp />}    label="Z+"        axisColor="#00bcd4" />

        <MoveBtn icon={<IconArrowLeft />}  label="X-" axisColor="#8bc34a" />
        <MoveBtn icon={<IconArrowDown />}  label="Y-" axisColor="#e040fb" />
        <MoveBtn icon={<IconArrowRight />} label="X+" axisColor="#8bc34a" />
        <MoveBtn icon={<IconZDown />}      label="Z-" axisColor="#00bcd4" />
      </div>

      {/* Position display */}
      <div className="actionPosBar">
        <span className="actionPosItem">X: {pos.x}</span>
        <span className="actionPosItem">Y: {pos.y}</span>
        <span className="actionPosItem">Z: {pos.z}</span>
      </div>

      {/* Distance selector */}
      <div className="actionDistanceBar">
        <span className="actionDistanceLabel">Move Distance (mm)</span>
        <div className="actionDistanceBtns">
          {DISTANCES.map(d => (
            <button
              key={d}
              className={`actionDistanceBtn ${distance === d ? 'actionDistanceBtnActive' : ''}`}
              onClick={() => setDistance(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ActionsScreen;
