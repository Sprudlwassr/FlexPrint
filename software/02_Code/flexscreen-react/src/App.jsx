import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // Um zwischen verschieden HTML-Inhalten im Body zu wechseln
import { useNavigate } from 'react-router-dom'; // Für den Startscreen

//
import Dashboard from './components/widgets/dashboardWidgets.jsx';
import logo from './assets/Pictures/logo_brightmode_transparent.svg';
import StartScreen from './screens/StartScreen';
//import Job from './menu_content/Job.jsx';
//import System from './menu_content/System.jsx';

//import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

//import { Rnd } from 'react-rnd'; // Für die Widgets innerhalb des Menüs
//import Dashboard from './pages/Dashboard';
//import Jobs from './pages/Jobs';

//Startscreen - Zeigt die wichtigstes Infos an
// const StartScreen = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="start-screen" onClick={() => navigate('/dashboard')}>
//         <img src={logo} className="start-logo" />
//     </div>
//   );

// };


// Platzhalter, inhalte für die Widgets
//const Dashboard = () => <div className="menuBody"></div>;
const Job = () => <div className="menuBody">Körper: Job Liste</div>;
const System = () => <div className="menuBody">Körper: Systemeinstellungen</div>;

function App() {
  const [count, setCount] = useState(0)
  return (
    <BrowserRouter> {/* Braucht es, damit man navigieren kann */}
    <Routes>
    <Route path="/" element={<StartScreen />} /> {/* 1. Startscreen/Infoscreen (ohne Header/Footer) */}
    <Route path="*" element={    
        <div className = "main">
            <div className = "header">
                <div className = "headerLeft">
                    <Link to="/">
                    <button id="btnBack">Back</button>
                    </Link>
                </div>
                <div className="headerCenter">
                    <img src={logo} alt="Flexprint" className="header-logo"/>
                </div>
                <div className = "headerRight">
                    Connected
                </div>
            </div>

            <div className = "menu">
                <div className = "menuBody">
                    <div className="menuBodyHeader">
                        <div className="header-item">Homing</div>
                        <div className="header-item">Temperature</div>
                        <div className="header-item">Print</div>
                        <div className="header-item">Actions</div>
                        <div className="header-item">Configuration</div>
                    </div>
                    <div className="menuBodyContentWrapper">
                        <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/jobs" element={<Job />} />
                            <Route path="/system" element={<System />} />
                        </Routes>
                    </div>
                </div>
                <div className = "menuFooter">
                    <div className="dashboard">
                        <Link to="/dashboard">
                            <button id="btnDashboard">Dashboard</button>
                        </Link>
                    </div>
                    <div className="job">
                        <Link to="/jobs">
                            <button id="btnJob">Job</button>
                        </Link>
                    </div>
                    <div className="system">
                        <Link to="/system">
                            <button id="btnSystem">System</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    } />
    </Routes>
    </BrowserRouter>
  );
}

export default App
