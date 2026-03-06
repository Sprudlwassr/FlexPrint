import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // Um zwischen verschieden HTML-Inhalten im Body zu wechseln
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <div className = "main">
        <div className = "header">
            <div className = "headerLeft">
                <button id="btnBack">Back</button>
            </div>
            <div className="headerCenter">
                Flexprint
            </div>
            <div className = "headerRight">
                Connected
            </div>
        </div>
        <div className = "menu">
            <Routes>
            <div className = "menuBody">
                Körper
            </div>
            </Routes>
            <div className = "menuFooter">
                <div className="dashboard">
                    <button id="btnDashboard">Dashboard</button>
                </div>
                <div className="job">
                    <button id="btnJob">Job</button>
                </div>
                <div className="system">
                    <button id="btnSystem">System</button>
                </div>
            </div>
        </div>
    </div>
    </BrowserRouter>
  )
}

export default App
