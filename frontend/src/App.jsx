import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import DonorDashboard from './pages/DonorDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import AcceptorDashboard from './pages/AcceptorDashboard';

function App() {
  return (
    <div className="min-h-screen bg-background font-sans text-neutral-900 selection:bg-primary/20">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donor-dashboard/*" element={<DonorDashboard />} />
        <Route path="/volunteer-dashboard/*" element={<VolunteerDashboard />} />
        <Route path="/acceptor-dashboard/*" element={<AcceptorDashboard />} />
      </Routes>
    </div>
  );
}
<h1 className="text-4xl text-primary font-bold">Tailwind Working</h1>

export default App;
