import Navbar from "../components/ui/Navbar";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {

    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (res.ok) {

                alert("OTP will be sent to your email");

                navigate("/verify-otp", {
                    state: { email }
                });

            } else {
                alert(data.message || "Failed to send OTP");
            }

        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen flex justify-center items-center bg-neutral-50">

                <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">

                    <h2 className="text-2xl font-bold text-center mb-6">
                        Reset Password
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <Input
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Button className="w-full">
                            Send OTP
                        </Button>

                    </form>

                </div>
            </div>
        </>
    );


}
