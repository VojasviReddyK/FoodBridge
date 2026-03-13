import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function ResetPassword() {

    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const handleReset = async (e) => {


        e.preventDefault();

        try {

            const res = await fetch("http://localhost:5000/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {

                alert("Password updated successfully");

                navigate("/login");

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);
            alert("Password reset failed");

        }


    };

    return (
        <> <Navbar />


            <div className="min-h-screen flex justify-center items-center bg-neutral-50">

                <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">

                    <h2 className="text-2xl font-bold text-center mb-6">
                        Set New Password
                    </h2>

                    <form onSubmit={handleReset} className="space-y-4">

                        <Input
                            label="New Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <Button className="w-full">
                            Reset Password
                        </Button>

                    </form>

                </div>
            </div>
        </>


    );
}
