import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const job = {
  status: 'Printing',
  filename: 'Tests/No-extusion',
  layer: 1,
  totalLayers: 100,
  progress: 0,
  extruderTemp: 21,
  bedTemp: 24,
  zPos: 0.28,
  elapsed: '25s',
  remaining: '16m',
};

const StatRow = ({ label, value }) => (
  <div className="dashStatRow">
    <span className="dashStatLabel">{label}</span>
    <span className="dashStatValue">{value}</span>
  </div>
);

const Dashboard = () => {
  const [log, setLog] = useState([
    { type: 'info', text: 'Konsole bereit.' },
  ]);
  const [input, setInput] = useState('');
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log]);

  const send = () => {
    const cmd = input.trim();
    if (!cmd) return;
    setLog(prev => [
      ...prev,
      { type: 'send', text: `> ${cmd}` },
      { type: 'recv', text: 'ok' },
    ]);
    setInput('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') send();
  };

  return (
    <div className="dashboardContainer">
      <div className="menuBodyHeader">
        <div className="header-item">Homing</div>
        <Link to="/temperature"  className="header-item">Temperature</Link>
        <Link to="/print"        className="header-item">Print</Link>
        <Link to="/actions"      className="header-item">Actions</Link>
        <Link to="/configuration" className="header-item">Configuration</Link>
      </div>

      <div className="dashBody">

        {/* Left: status + progress */}
        <div className="dashLeft">
          <div className="dashCard">
            <div className="dashCardTitle">Druckerstatus</div>
            <span className="dashStatusBadge">{job.status}</span>
            <span className="dashFileName">{job.filename}</span>
            <StatRow label="Layer"    value={`${job.layer} / ${job.totalLayers}`} />
            <StatRow label="Extruder" value={`${job.extruderTemp}°C`} />
            <StatRow label="Bed"      value={`${job.bedTemp}°C`} />
            <StatRow label="Z"        value={`${job.zPos} mm`} />
          </div>

          <div className="dashCard">
            <div className="dashCardTitle">Fortschritt</div>
            <div className="dashProgressWrap">
              <div className="dashProgressBar">
                <div className="dashProgressFill" style={{ width: `${job.progress}%` }} />
              </div>
              <span className="dashProgressPct">{job.progress}%</span>
            </div>
            <StatRow label="Elapsed"   value={job.elapsed} />
            <StatRow label="Remaining" value={job.remaining} />
          </div>
        </div>

        {/* Right: G-code console */}
        <div className="dashCard dashConsole">
          <div className="dashCardTitle">G-Code Konsole</div>

          <div className="dashLog">
            {log.map((entry, i) => (
              <div key={i} className={`dashLogLine dashLogLine--${entry.type}`}>
                {entry.text}
              </div>
            ))}
            <div ref={logEndRef} />
          </div>

          <div className="dashConsoleInput">
            <input
              className="dashGcodeInput"
              type="text"
              value={input}
              placeholder="G-Code eingeben…"
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button className="dashSendBtn" onClick={send}>Send</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
