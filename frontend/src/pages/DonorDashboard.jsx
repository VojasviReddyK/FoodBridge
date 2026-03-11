import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Utensils, Plus, List, LogOut } from 'lucide-react';

export default function DonorDashboard() {
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
            <Utensils size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-neutral-900">FOOD<span className="text-primary">BRIDGE</span></span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link to="/donor-dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium">
            <List size={20} />
            My Donations
          </Link>
          <Link to="/donor-dashboard/create" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-100 text-neutral-600 font-medium transition-colors">
            <Plus size={20} />
            Donate Food
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
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-neutral-900">Donor Dashboard</h1>
          <Button onClick={() => navigate('/donor-dashboard/create')}><Plus size={20} className="mr-2" /> New Donation</Button>
        </header>

        <Routes>
          <Route path="/" element={
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
              <h2 className="text-xl font-semibold mb-4">Your Active Donations</h2>
              {/* Fetch and display donations logic would go here */}
              <p className="text-neutral-500">You can see all your posted donations here.</p>
            </div>
          } />
          <Route path="/create" element={<CreateDonationForm />} />
        </Routes>
      </main>
    </div>
  );
}

function CreateDonationForm() {
  const { api } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    foodType: '', quantity: '', expiryTime: '', pickupLocation: '', pickupWindow: '', image: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let imageUrl = '';
      if (formData.image) {
        const imgData = new FormData();
        imgData.append('image', formData.image);
        const { data: uploadData } = await api.post('/upload', imgData, {
           headers: { 'Content-Type': 'multipart/form-data' }
        });
        imageUrl = uploadData.imageUrl;
      }

      await api.post('/donations/create', {
        ...formData,
        imageUrl
      });
      navigate('/donor-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 max-w-2xl">
      <h2 className="text-xl font-semibold mb-6">Create New Donation</h2>
      {error && <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-neutral-700 block mb-1">Food Type</label>
          <input type="text" className="w-full h-11 px-4 rounded-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" required value={formData.foodType} onChange={e => setFormData({...formData, foodType: e.target.value})} placeholder="e.g., 50 boxes of cooked rice and curry" />
        </div>
        <div>
          <label className="text-sm font-medium text-neutral-700 block mb-1">Quantity/Weight</label>
          <input type="text" className="w-full h-11 px-4 rounded-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" required value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} placeholder="e.g., enough for 20 people" />
        </div>
        <div>
          <label className="text-sm font-medium text-neutral-700 block mb-1">Expiry Time (Approx)</label>
          <input type="datetime-local" className="w-full h-11 px-4 rounded-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" required value={formData.expiryTime} onChange={e => setFormData({...formData, expiryTime: e.target.value})} />
        </div>
        <div>
          <label className="text-sm font-medium text-neutral-700 block mb-1">Pickup Location</label>
          <input type="text" className="w-full h-11 px-4 rounded-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" required value={formData.pickupLocation} onChange={e => setFormData({...formData, pickupLocation: e.target.value})} placeholder="123 Main St, New York" />
        </div>
        <div>
          <label className="text-sm font-medium text-neutral-700 block mb-1">Pickup Window</label>
          <input type="text" className="w-full h-11 px-4 rounded-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" required value={formData.pickupWindow} onChange={e => setFormData({...formData, pickupWindow: e.target.value})} placeholder="e.g., Between 2 PM and 5 PM" />
        </div>
        <div>
          <label className="text-sm font-medium text-neutral-700 block mb-1">Food Image</label>
          <input type="file" accept="image/*" className="w-full h-11 pt-2 px-4 rounded-xl border border-neutral-200 outline-none" onChange={e => setFormData({...formData, image: e.target.files[0]})} />
        </div>
        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? 'Posting...' : 'Post Donation'}
        </Button>
      </form>
    </div>
  );
}
