import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Utensils, Heart, Truck } from 'lucide-react';
import { clsx } from "clsx";

export default function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'donor', location: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const data = await register(formData);
      if (data.role === 'donor') navigate('/donor-dashboard');
      else if (data.role === 'volunteer') navigate('/volunteer-dashboard');
      else navigate('/acceptor-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    { id: 'donor', icon: Utensils, label: 'Donor' },
    { id: 'volunteer', icon: Truck, label: 'Volunteer' },
    { id: 'acceptor', icon: Heart, label: 'Acceptor' }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-6 bg-neutral-50 page-enter">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 border border-neutral-100">
        <h2 className="text-3xl font-bold text-center mb-2">Create an Account</h2>
        <p className="text-neutral-500 text-center mb-8">Join the platform to make a difference.</p>

        {error && <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Full Name / Organization" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe or Fresh Foods" />
          <Input label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="contact@example.com" />
          <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" />
          <Input label="Location (City or Address)" name="location" value={formData.location} onChange={handleChange} required placeholder="New York, NY" />
          
          <div>
            <label className="text-sm font-medium text-neutral-700 block mb-3">Select your role</label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map(r => {
                const Icon = r.icon;
                const active = formData.role === r.id;
                return (
                  <button
                    type="button"
                    key={r.id}
                    onClick={() => setFormData({ ...formData, role: r.id })}
                    className={clsx(
                      "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                      active ? "border-primary bg-primary/5 text-primary" : "border-neutral-200 hover:border-primary/50 text-neutral-500"
                    )}
                  >
                    <Icon size={24} />
                    <span className="text-sm font-medium">{r.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <Button type="submit" className="w-full mt-4" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <p className="text-center text-neutral-500 mt-8">
          Already have an account? <Link className="text-primary font-medium hover:underline" to="/login">Log in here</Link>
        </p>
      </div>
    </div>
  );
}
