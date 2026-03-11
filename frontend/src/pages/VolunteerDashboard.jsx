import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Truck, Map, Navigation, LogOut } from 'lucide-react';

export default function VolunteerDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-neutral-200 p-6 flex flex-col h-screen sticky top-0">
        <div className="flex items-center gap-2 mb-10">
          <div className="bg-primary p-2 rounded-xl text-white">
            <Truck size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-neutral-900">Volunteer<span className="text-primary">HUB</span></span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link to="/volunteer-dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium">
            <Map size={20} />
            Available Pickups
          </Link>
          <Link to="/volunteer-dashboard/active" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-100 text-neutral-600 font-medium transition-colors">
            <Navigation size={20} />
            My Deliveries
          </Link>
        </nav>

        <div className="pt-6 border-t border-neutral-200">
          <div className="mb-4">
            <p className="font-medium text-neutral-900">{user?.name}</p>
            <p className="text-sm text-neutral-500">{user?.email}</p>
          </div>
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleLogout}>
            <LogOut size={20} className="mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Volunteer Dashboard</h1>
          <p className="text-neutral-500 mt-2">Find and complete food pickups in your area.</p>
        </header>

        <Routes>
          <Route path="/" element={<DonationFeed />} />
          <Route path="/active" element={<ActiveDeliveries />} />
        </Routes>
      </main>
    </div>
  );
}

function DonationFeed() {
  const { api } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const { data } = await api.get('/donations');
        setDonations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, [api]);

  const acceptPickup = async (donationId) => {
    try {
      await api.post('/deliveries/accept', { donationId });
      alert('Pickup accepted! Please check your My Deliveries tab.');
      setDonations(donations.filter(d => d._id !== donationId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to accept pickup');
    }
  };

  if (loading) return <p>Loading donations...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {donations.length === 0 ? (
        <p className="text-neutral-500">No available donations at the moment.</p>
      ) : (
        donations.map(donation => (
          <div key={donation._id} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
             {donation.imageUrl && <img src={donation.imageUrl} alt="Food" className="w-full h-48 object-cover rounded-xl mb-4" />}
             <h3 className="text-lg font-semibold">{donation.foodType}</h3>
             <p className="text-sm text-neutral-500 mb-2">Quantity: {donation.quantity}</p>
             <p className="text-sm text-neutral-700 bg-neutral-100 p-3 rounded-lg flex items-center gap-2 mb-4"><Map size={16}/> {donation.pickupLocation}</p>
             <p className="text-sm font-medium mb-4">Window: {donation.pickupWindow}</p>
             <Button className="w-full" onClick={() => acceptPickup(donation._id)}>Accept Pickup</Button>
          </div>
        ))
      )}
    </div>
  );
}

function ActiveDeliveries() {
  const { api } = useContext(AuthContext);
  const [otp, setOtp] = useState('');
  const [deliveryId, setDeliveryId] = useState(''); // Simplified: normally we fetch active deliveries
  
  const handleVerify = async () => {
    try {
      await api.post('/deliveries/verify-otp', { deliveryId, otpCode: otp });
      alert('OTP verified! Food picked up successfully.');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to verify OTP');
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
      <h2 className="text-xl font-semibold mb-4">Your Active Deliveries</h2>
      <p className="text-neutral-500 mb-6">Enter OTP to verify pickup.</p>
      
      <div className="space-y-4 max-w-sm">
        <input 
          type="text" 
          placeholder="Delivery ID (demo temp)" 
          className="w-full h-11 px-4 rounded-xl border border-neutral-200 outline-none focus:ring-primary block"
          value={deliveryId}
          onChange={e => setDeliveryId(e.target.value)}
        />
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Enter 4-digit OTP" 
            className="flex-1 h-11 px-4 rounded-xl border border-neutral-200 outline-none focus:ring-primary"
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
          <Button onClick={handleVerify}>Verify OTP</Button>
        </div>
      </div>
    </div>
  );
}
