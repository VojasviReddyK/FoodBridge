import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Truck, Utensils, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function Landing() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="w-full">
      {/* Navigation Bar Placeholder */}
      <nav className="flex justify-between items-center p-6 lg:px-12 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-xl text-white">
            <Utensils size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-neutral-900">FOOD<span className="text-primary">BRIDGE</span></span>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
          <Button onClick={() => navigate('/register')}>Get Started</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-48 px-6 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            Bridging Food Surplus with <span className="text-primary inline-block">Communities in Need.</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-neutral-600 max-w-2xl mx-auto">
            A seamless platform connecting restaurants, volunteers, and NGOs to eliminate food waste and feed the hungry.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button size="lg" className="w-full sm:w-auto text-lg no-underline" onClick={() => navigate('/register')}>
              Join the Movement <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg" onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}>
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* How it works / Roles Overview */}
      <section id="how-it-works" className="py-24 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How FoodBridge Works</h2>
            <p className="text-lg text-neutral-500">Three simple roles, one massive impact.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <Utensils size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3">1. Donors</h3>
              <p className="text-neutral-600 mb-6">Restaurants, hotels, or households can post surplus quality food in seconds.</p>
              <ul className="space-y-2 text-neutral-500 font-medium">
                <li>• Quick listing</li>
                <li>• Real-time tracking</li>
                <li>• Reduce waste</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100 hover:shadow-xl transition-all duration-300 transform md:-translate-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Truck size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3">2. Volunteers</h3>
              <p className="text-neutral-600 mb-6">Heroes on the ground pick up donations and deliver them to designated locations.</p>
              <ul className="space-y-2 text-neutral-500 font-medium">
                <li>• Secure OTP verification</li>
                <li>• Built-in navigation</li>
                <li>• Flexible schedule</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-orange-100 text-secondary rounded-2xl flex items-center justify-center mb-6">
                <Heart size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3">3. Acceptors</h3>
              <p className="text-neutral-600 mb-6">NGOs, orphanages, and shelters receive the food safely to distribute to those in need.</p>
              <ul className="space-y-2 text-neutral-500 font-medium">
                <li>• Quality verified food</li>
                <li>• Direct alerts</li>
                <li>• Feedback system</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Utensils size={24} className="text-primary" />
            <span className="text-xl font-bold tracking-tight text-white">FOOD<span className="text-primary">BRIDGE</span></span>
          </div>
          <p>© 2026 FoodBridge Initiative. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
