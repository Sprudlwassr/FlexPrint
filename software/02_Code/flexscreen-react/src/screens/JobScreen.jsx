const CircularProgress = ({ value }) => {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <circle cx="55" cy="55" r={r} fill="none" stroke="#e8d9ac" strokeWidth="8"/>
      <circle cx="55" cy="55" r={r} fill="none" stroke="#232e4c" strokeWidth="8"
              strokeDasharray={circ} strokeDashoffset={offset}
              strokeLinecap="round" transform="rotate(-90 55 55)"/>
      <text x="55" y="50" textAnchor="middle"
            fill="#232e4c" fontSize="18" fontFamily="Coolvetica Rg, sans-serif" fontWeight="bold">
        {value}%
      </text>
      <text x="55" y="68" textAnchor="middle"
            fill="#232e4c" fontSize="10" fontFamily="Coolvetica Rg, sans-serif" opacity="0.6">
        done
      </text>
    </svg>
  );
};

const StatChip = ({ icon, label, value }) => (
  <div className="jobStatChip">
    <span className="jobStatChipIcon">{icon}</span>
    <div className="jobStatChipText">
      <span className="jobStatChipLabel">{label}</span>
      <span className="jobStatChipValue">{value}</span>
    </div>
  </div>
);

const IconPause = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="10" y1="15" x2="10" y2="9"/>
    <line x1="14" y1="15" x2="14" y2="9"/>
  </svg>
);

const IconCancel = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/>
    <rect x="9" y="9" width="6" height="6"/>
  </svg>
);

const IconTuning = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="4" y1="6" x2="20" y2="6"/>
    <line x1="4" y1="12" x2="20" y2="12"/>
    <line x1="4" y1="18" x2="20" y2="18"/>
    <circle cx="8"  cy="6"  r="2.2" fill="#232e4c" stroke="none"/>
    <circle cx="16" cy="12" r="2.2" fill="#232e4c" stroke="none"/>
    <circle cx="10" cy="18" r="2.2" fill="#232e4c" stroke="none"/>
  </svg>
);

const IconSettings = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33
             1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33
             l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4
             h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06
             A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51
             a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9
             a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const job = {
  filename: 'Tests/No-extusion',
  status: 'Printing',
  layer: 1,
  totalLayers: 100,
  material: 'Printalot PETG',
  progress: 0,
  extruderTemp: 21,
  bedTemp: 24,
  fanSpeed: 100,
  feedrate: 37,
  zPos: 0.28,
  flow: 100,
  elapsed: '25s',
  remaining: '16m',
};

const JobScreen = () => (
  <div className="jobScreen">

    {/* Top: filename + status */}
    <div className="jobHeader">
      <div className="jobHeaderLeft">
        <span className="jobFileName">{job.filename}</span>
        <div className="jobMeta">
          <span className="jobStatusBadge">{job.status}</span>
          <span className="jobLayer">Layer {job.layer}/{job.totalLayers} · {job.material}</span>
        </div>
      </div>
    </div>

    {/* Middle: progress + stats */}
    <div className="jobContent">
      <div className="jobProgressArea">
        <CircularProgress value={job.progress} />
      </div>

      <div className="jobStatsArea">
        <StatChip icon="🌡" label="Extruder"  value={`${job.extruderTemp}°C`} />
        <StatChip icon="🛏" label="Bed"        value={`${job.bedTemp}°C`} />
        <StatChip icon="↓"  label="Z"          value={`${job.zPos} mm`} />
        <StatChip icon="⚡" label="Feedrate"   value={`${job.feedrate} mm/s`} />
        <StatChip icon="⏱" label="Elapsed"    value={job.elapsed} />
        <StatChip icon="⏳" label="Remaining"  value={job.remaining} />
      </div>
    </div>

    {/* Progress bar */}
    <div className="jobProgressBar">
      <div className="jobProgressFill" style={{ width: `${job.progress}%` }} />
    </div>

    {/* Action buttons */}
    <div className="jobActions">
      {[
        { icon: <IconPause />,    label: 'Pause',       color: '#e040fb' },
        { icon: <IconCancel />,   label: 'Cancel',      color: '#ff7043' },
        { icon: <IconTuning />,   label: 'Fine Tuning', color: '#8bc34a' },
        { icon: <IconSettings />, label: 'Settings',    color: '#00bcd4' },
      ].map(({ icon, label, color }) => (
        <button key={label} className="jobActionBtn" onClick={() => {}}>
          <span className="jobActionBtnBar" style={{ backgroundColor: color }} />
          <span className="jobActionBtnIcon">{icon}</span>
          <span className="jobActionBtnLabel">{label}</span>
        </button>
      ))}
    </div>

  </div>
);

export default JobScreen;
