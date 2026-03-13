import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function VerifyOTP() {

    const [otp, setOtp] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const handleVerify = async (e) => {


        e.preventDefault();

        try {

            const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, otp })
            });

            const data = await res.json();

            if (res.ok) {

                alert("OTP verified successfully");

                navigate("/reset-password", {
                    state: { email }
                });

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);
            alert("Verification failed");

        }


    };

    return (
        <> <Navbar />


            <div className="min-h-screen flex justify-center items-center bg-neutral-50">

                <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">

                    <h2 className="text-2xl font-bold text-center mb-6">
                        Verify OTP
                    </h2>

                    <form onSubmit={handleVerify} className="space-y-4">

                        <Input
                            label="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />

                        <Button className="w-full">
                            Verify OTP
                        </Button>

                    </form>

                </div>
            </div>
        </>


    );
}
