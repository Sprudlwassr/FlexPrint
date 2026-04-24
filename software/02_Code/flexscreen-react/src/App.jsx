import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

import Dashboard from './components/widgets/dashboardWidgets.jsx';
import StartScreen from './screens/StartScreen';
import TemperatureScreen from './screens/TemperatureScreen';
import PrintScreen from './screens/PrintScreen';
import ActionsScreen from './screens/ActionsScreen';
import JobScreen from './screens/JobScreen';
import ConfigurationScreen from './screens/ConfigurationScreen';
import logo from './assets/Pictures/logo_brightmode_transparent.svg';

const System = () => <div className="menuBody"></div>;

const printerTemps = { extruder: 21, bed: 25, pi: 44 };

const START_PAGES = ['/dashboard', '/jobs', '/system'];

function Layout({ time }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isStartPage = START_PAGES.includes(location.pathname);

  return (
    <div className="main">
      <div className="header">
        <div className="headerLeft">
          {isStartPage
            ? <Link to="/" className="headerStartBtn">Start</Link>
            : <button className="headerBackBtn" onClick={() => navigate(-1)}>Back</button>
          }
        </div>
        <div className="headerCenter">
          <Link to="/"><img src={logo} alt="Flexprint" className="header-logo"/></Link>
        </div>
        <div className="headerRight">
          <div className="headerTemps">
            <span className="tempItem">🌡 {printerTemps.extruder}°</span>
            <span className="tempItem">🛏 {printerTemps.bed}°</span>
            <span className="tempItem">Pi: {printerTemps.pi}°</span>
          </div>
          {time}
        </div>
      </div>

      <div className="menu">
        <div className="menuBody">
          <div className="menuBodyContentWrapper">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/jobs" element={<JobScreen />} />
              <Route path="/system" element={<System />} />
              <Route path="/temperature" element={<TemperatureScreen />} />
              <Route path="/print" element={<PrintScreen />} />
              <Route path="/actions" element={<ActionsScreen />} />
              <Route path="/configuration" element={<ConfigurationScreen />} />
            </Routes>
          </div>
        </div>
        <div className="menuFooter">
          <Link to="/dashboard" className="footerBtn">
            <span className="footerBtnIcon">⊞</span>
            <span className="footerBtnLabel">Dashboard</span>
          </Link>
          <Link to="/jobs" className="footerBtn">
            <span className="footerBtnIcon">⬡</span>
            <span className="footerBtnLabel">Job</span>
          </Link>
          <Link to="/system" className="footerBtn">
            <span className="footerBtnIcon">⚙</span>
            <span className="footerBtnLabel">System</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="*" element={<Layout time={time} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
