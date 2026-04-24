import { useState } from 'react';

const STEPS = [0.01, 0.05, 0.1, 0.5];

const ConfigurationScreen = () => {
  const [offset, setOffset] = useState(-0.10);
  const [input, setInput] = useState('-0.10');
  const [applied, setApplied] = useState(-0.10);

  const adjust = (delta) => {
    const next = parseFloat((offset + delta).toFixed(3));
    setOffset(next);
    setInput(String(next));
  };

  const apply = () => {
    const val = parseFloat(input);
    if (!isNaN(val)) {
      setOffset(val);
      setApplied(val);
    }
  };

  return (
    <div className="configScreen">

      <div className="configCard">
        <div className="configCardTitle">Z-Offset</div>

        {/* Current applied value */}
        <div className="configRow">
          <span className="configLabel">Aktuell</span>
          <span className="configValue">{applied.toFixed(2)} mm</span>
        </div>

        {/* Pending value */}
        <div className="configRow">
          <span className="configLabel">Neu</span>
          <span className="configValue">{offset.toFixed(2)} mm</span>
        </div>

        <div className="configBottom">
          {/* Text input */}
          <input
            className="tempInput"
            type="number"
            step="0.01"
            value={input}
            placeholder="mm eingeben"
            onChange={e => {
              setInput(e.target.value);
              setOffset(parseFloat(e.target.value) || 0);
            }}
          />

          {/* Step buttons per row */}
          {[1, -1].map(sign => (
            <div key={sign} className="tempCardControls">
              {STEPS.map(step => (
                <button
                  key={step}
                  className="tempBtn"
                  onClick={() => adjust(sign * step)}
                >
                  {sign > 0 ? '+' : '−'}{step}
                </button>
              ))}
            </div>
          ))}

          <button className="tempSetBtn" onClick={apply}>Setzen</button>
        </div>
      </div>

    </div>
  );
};

export default ConfigurationScreen;
