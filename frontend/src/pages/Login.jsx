import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Utensils } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const data = await login(email, password);
      if (data.role === 'donor') navigate('/donor-dashboard');
      else if (data.role === 'volunteer') navigate('/volunteer-dashboard');
      else navigate('/acceptor-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-neutral-50 page-enter">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-neutral-100">
        <div className="flex justify-center mb-8">
          <div className="bg-primary p-3 rounded-2xl text-white">
            <Utensils size={32} />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-neutral-500 text-center mb-8">Log in to continue your mission.</p>
        
        {error && <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input 
            label="Email Address" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="you@example.com"
          />
          <Input 
            label="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            placeholder="••••••••"
          />
          
          <Button type="submit" className="w-full mt-4" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-neutral-500 mt-8">
          Don't have an account? <Link className="text-primary font-medium hover:underline" to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}
