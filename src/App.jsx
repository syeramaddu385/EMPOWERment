import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ProgramsPage from './pages/ProgramsPage.jsx';
import ResourcesPage from './pages/ResourcesPage.jsx';
import VolunteerPage from './pages/VolunteerPage.jsx';

function App() {
  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <NavBar />
      <main id="main" className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
