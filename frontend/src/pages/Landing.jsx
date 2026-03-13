import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, Truck, Utensils, ArrowRight, Globe, Users, Leaf } from "lucide-react";
import { Button } from "../components/ui/Button";
import Navbar from "../components/ui/Navbar.jsx";

export default function Landing() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (<div className="w-full bg-white"> <Navbar />

    {/* HERO SECTION */}
    <section className="relative overflow-hidden pt-28 pb-36 px-6 text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-green-300/20 rounded-full blur-[120px] -z-10"></div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto space-y-8"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl lg:text-7xl font-extrabold tracking-tight"
        >
          Bridging Food Surplus with{" "}
          <span className="text-green-600">
            Communities in Need
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl text-neutral-600 max-w-2xl mx-auto"
        >
          FoodBridge connects restaurants, volunteers and NGOs
          to rescue surplus food and deliver it to people who need it.
          Reduce waste. Feed communities. Create impact.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 pt-6"
        >
          <Button onClick={() => navigate("/register")}>
            Join the Movement
            <ArrowRight className="ml-2" size={18} />
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              document
                .getElementById("how-it-works")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Learn More
          </Button>
        </motion.div>
      </motion.div>
    </section>

    {/* HOW IT WORKS */}
    <section id="how-it-works" className="py-24 bg-white px-6">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          How FoodBridge Works
        </h2>
        <p className="text-neutral-500">
          Three simple roles, one shared mission.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        <div className="p-8 rounded-3xl bg-neutral-50 border hover:shadow-xl transition">
          <Utensils className="text-green-600 mb-4" size={32} />
          <h3 className="text-2xl font-bold mb-3">
            Donors
          </h3>
          <p className="text-neutral-600">
            Restaurants, events and households donate surplus
            food that would otherwise go to waste.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-neutral-50 border hover:shadow-xl transition">
          <Truck className="text-green-600 mb-4" size={32} />
          <h3 className="text-2xl font-bold mb-3">
            Volunteers
          </h3>
          <p className="text-neutral-600">
            Volunteers coordinate pickup and delivery to
            ensure food reaches those who need it quickly.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-neutral-50 border hover:shadow-xl transition">
          <Heart className="text-green-600 mb-4" size={32} />
          <h3 className="text-2xl font-bold mb-3">
            NGOs / Acceptors
          </h3>
          <p className="text-neutral-600">
            NGOs and shelters receive the donated food
            and distribute it to vulnerable communities.
          </p>
        </div>

      </div>
    </section>

    {/* WHY FOODBRIDGE */}
    <section className="py-24 bg-neutral-50 px-6">
      <div className="max-w-5xl mx-auto text-center">

        <h2 className="text-4xl font-bold mb-6">
          Why FoodBridge?
        </h2>

        <p className="text-neutral-600 text-lg mb-12">
          Millions of tons of food are wasted every year while
          millions go hungry. FoodBridge uses technology to
          connect donors, volunteers and NGOs in real-time
          to rescue food and create meaningful impact.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">
              Reduce Food Waste
            </h3>
            <p className="text-neutral-500">
              Prevent surplus food from ending up in landfills.
            </p>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">
              Empower Communities
            </h3>
            <p className="text-neutral-500">
              Connect people who want to help with those in need.
            </p>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">
              Technology for Good
            </h3>
            <p className="text-neutral-500">
              Use modern technology to solve real-world problems.
            </p>
          </div>

        </div>

      </div>
    </section>

    {/* CTA */}
    <section className="py-24 px-6 text-center bg-green-600 text-white">

      <h2 className="text-4xl font-bold mb-6">
        Join the Food Rescue Movement
      </h2>

      <p className="text-lg mb-8">
        Together we can reduce food waste and feed thousands.
      </p>

      <Button
        onClick={() => navigate("/register")}
        className="bg-white text-green-600 hover:bg-neutral-100"
      >
        Get Started
      </Button>

    </section>

    {/* FOOTER */}
    <footer className="bg-neutral-900 text-neutral-400 py-8 text-center">
      <p>© 2026 FoodBridge. All rights reserved.</p>
    </footer>
  </div>
  );
}