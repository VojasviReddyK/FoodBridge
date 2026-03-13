import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import Navbar from "../components/ui/Navbar";
import { Utensils, Truck, Heart } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

export default function Register() {

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
    location: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleSelect = (role) => {
    setFormData({
      ...formData,
      role
    });
  };

  const redirectUser = (role) => {
    if (role === "donor") navigate("/donor-dashboard");
    else if (role === "volunteer") navigate("/volunteer-dashboard");
    else navigate("/acceptor-dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {

      const data = await register(formData);

      if (!data) {
        alert("Registration failed");
        return;
      }

      localStorage.setItem("token", data.token);

      redirectUser(data.role);

    } catch (err) {

      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed";

      alert(errorMessage);

    }


  };

  return (
    <> <Navbar />

      <div className="min-h-screen flex justify-center items-center bg-neutral-50">

        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg">

          <h2 className="text-3xl font-bold text-center mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            {/* ROLE SELECTION */}
            <div className="grid grid-cols-3 gap-4">

              <div
                onClick={() => handleRoleSelect("donor")}
                className={`cursor-pointer p-4 rounded-xl border flex flex-col items-center justify-center
            ${formData.role === "donor"
                    ? "border-primary bg-primary/10"
                    : "border-neutral-200 hover:bg-neutral-100"}`}
              >
                <Utensils size={28} className="text-primary mb-2" />
                <p className="text-sm font-medium">Donor</p>
              </div>

              <div
                onClick={() => handleRoleSelect("volunteer")}
                className={`cursor-pointer p-4 rounded-xl border flex flex-col items-center justify-center
            ${formData.role === "volunteer"
                    ? "border-primary bg-primary/10"
                    : "border-neutral-200 hover:bg-neutral-100"}`}
              >
                <Truck size={28} className="text-primary mb-2" />
                <p className="text-sm font-medium">Volunteer</p>
              </div>

              <div
                onClick={() => handleRoleSelect("acceptor")}
                className={`cursor-pointer p-4 rounded-xl border flex flex-col items-center justify-center
            ${formData.role === "acceptor"
                    ? "border-primary bg-primary/10"
                    : "border-neutral-200 hover:bg-neutral-100"}`}
              >
                <Heart size={28} className="text-primary mb-2" />
                <p className="text-sm font-medium">Acceptor</p>
              </div>

            </div>

            <Button className="w-full">
              Create Account
            </Button>

          </form>

          <p className="text-center mt-6">
            Already have an account?
            <Link to="/login" className="text-primary ml-2">
              Login
            </Link>
          </p>



        </div>

      </div>

    </>


  );
}
