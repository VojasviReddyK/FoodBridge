import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import Navbar from "../components/ui/Navbar.jsx";
import { Utensils } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const redirectUser = (role) => {


    if (role === "donor") {
      navigate("/donor-dashboard");
    }

    else if (role === "volunteer") {
      navigate("/volunteer-dashboard");
    }

    else if (role === "acceptor") {
      navigate("/acceptor-dashboard");
    }


  };

  const handleSubmit = async (e) => {


    e.preventDefault();

    try {

      const data = await login(email, password);

      if (!data) {
        alert("Login failed");
        return;
      }

      localStorage.setItem("token", data.token);

      redirectUser(data.role);

    } catch (err) {
      console.error(err);
      alert("Login failed");
    }

  };

  return (
    <> <Navbar />

      <div className="min-h-screen flex justify-center items-center bg-neutral-50">

        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">

          <div className="flex justify-center mb-6">
            <Utensils size={32} className="text-primary" />
          </div>

          <h2 className="text-3xl font-bold text-center mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>

          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t"></div>
            <span className="px-3 text-sm text-neutral-500">OR</span>
            <div className="flex-1 border-t"></div>
          </div>

          <p className="text-center mt-6">

            Don't have an account?{" "}

            <Link to="/register" className="text-primary">
              Register
            </Link>

          </p>

        </div>
      </div>
    </>


  );
}
