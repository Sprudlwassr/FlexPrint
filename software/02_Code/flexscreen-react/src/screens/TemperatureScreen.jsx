import { useState } from 'react';

const TempCard = ({ title, currentTemp, defaultTarget }) => {
  const [target, setTarget] = useState(defaultTarget);
  const [input, setInput] = useState(defaultTarget);

  const adjust = (delta) => setInput(prev => Math.max(0, prev + delta));
  const apply = () => setTarget(input);

  return (
    <div className="tempCard">
      <div className="tempCardTitle">{title}</div>

      <div className="tempCardCurrent">
        <span className="tempCardLabel">Aktuell</span>
        <span className="tempCardValue">{currentTemp}°C</span>
      </div>

      <div className="tempCardCurrent">
        <span className="tempCardLabel">Ziel</span>
        <span className="tempCardValue">{target}°C</span>
      </div>

      <div className="tempCardBottom">
        <input
          className="tempInput"
          type="number"
          value={input}
          placeholder="°C eingeben"
          onChange={e => setInput(Math.max(0, Number(e.target.value)))}
        />

        <div className="tempCardControls">
          <button className="tempBtn" onClick={() => adjust(-10)}>−10</button>
          <button className="tempBtn" onClick={() => adjust(-1)}>−1</button>
          <button className="tempBtn" onClick={() => adjust(1)}>+1</button>
          <button className="tempBtn" onClick={() => adjust(10)}>+10</button>
        </div>

        <button className="tempSetBtn" onClick={apply}>Setzen</button>
      </div>
    </div>
  );
};

const TemperatureScreen = () => (
  <div className="tempScreen">
    <TempCard title="Toolhead"   currentTemp={21} defaultTarget={200} />
    <TempCard title="Heated Bed" currentTemp={25} defaultTarget={60}  />
  </div>
);

export default TemperatureScreen;
