import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Heart, Inbox, CheckCircle, LogOut } from "lucide-react";

export default function AcceptorDashboard() {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-neutral-200 p-6 flex flex-col h-screen sticky top-0">

        {/* Clickable FoodBridge Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 mb-10 hover:opacity-80 transition"
        >
          <div className="bg-primary p-2 rounded-xl text-white">
            <Heart size={24} />
          </div>

          <span className="text-xl font-bold tracking-tight text-neutral-900">
            FOOD<span className="text-primary">BRIDGE</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">

          <Link
            to="/acceptor-dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium"
          >
            <Inbox size={20} />
            Incoming Deliveries
          </Link>

          <Link
            to="/acceptor-dashboard/history"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-100 text-neutral-600 font-medium transition-colors"
          >
            <CheckCircle size={20} />
            History
          </Link>

        </nav>

        {/* User Info + Logout */}
        <div className="pt-6 border-t border-neutral-200">

          <div className="mb-4">
            <p className="font-medium text-neutral-900">
              {user?.name}
            </p>

            <p className="text-sm text-neutral-500">
              {user?.email}
            </p>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut size={20} className="mr-2" />
            Logout
          </Button>

        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">
            Acceptor Dashboard
          </h1>

          <p className="text-neutral-500 mt-2">
            Manage incoming food deliveries for your organization.
          </p>
        </header>

        <Routes>
          <Route path="/" element={<IncomingDeliveries />} />
          <Route path="/history" element={<DeliveryHistory />} />
        </Routes>

      </main>

    </div>
  );
}

function IncomingDeliveries() {

  const { api } = useContext(AuthContext);
  const [deliveryId, setDeliveryId] = useState("");

  const handleComplete = async () => {
    try {

      await api.post("/deliveries/complete", { deliveryId });

      alert("Delivery marked as completed successfully!");

      setDeliveryId("");

    } catch (err) {

      alert(err.response?.data?.message || "Failed to complete delivery");

    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 max-w-lg">

      <h2 className="text-xl font-semibold mb-4">
        Confirm Delivery Receipt
      </h2>

      <p className="text-neutral-500 mb-6">
        Enter the Delivery ID provided by the volunteer to confirm
        you have received the food.
      </p>

      <div className="flex gap-4">

        <input
          type="text"
          placeholder="Delivery ID"
          className="flex-1 h-11 px-4 rounded-xl border border-neutral-200 outline-none focus:ring-primary"
          value={deliveryId}
          onChange={(e) => setDeliveryId(e.target.value)}
        />

        <Button onClick={handleComplete}>
          Confirm
        </Button>

      </div>

    </div>
  );
}

function DeliveryHistory() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">

      <h2 className="text-xl font-semibold mb-4">
        Delivery History
      </h2>

      <p className="text-neutral-500">
        No past deliveries found yet.
      </p>

    </div>
  );
}