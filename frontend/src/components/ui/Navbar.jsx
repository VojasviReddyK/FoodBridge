import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Utensils, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    return (<nav className="flex justify-between items-center p-6 lg:px-12 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-neutral-100">


        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">

            <div className="bg-primary p-2 rounded-xl text-white">
                <Utensils size={24} />
            </div>

            <span className="text-xl font-bold tracking-tight text-neutral-900">
                FOOD<span className="text-primary">BRIDGE</span>
            </span>

        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-6">

            <a
                href="#how-it-works"
                className="text-neutral-600 hover:text-primary transition"
            >
                How it works
            </a>

            <Button
                variant="ghost"
                onClick={() => navigate("/login")}
            >
                Login
            </Button>

            <Button
                onClick={() => navigate("/register")}
            >
                Get Started
            </Button>

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
        >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* MOBILE MENU */}
        {menuOpen && (
            <div className="absolute top-full left-0 w-full bg-white border-t border-neutral-100 md:hidden">

                <div className="flex flex-col items-center py-6 gap-6">

                    <a
                        href="#how-it-works"
                        className="text-neutral-600 hover:text-primary"
                        onClick={() => setMenuOpen(false)}
                    >
                        How it works
                    </a>

                    <Button
                        variant="ghost"
                        onClick={() => {
                            setMenuOpen(false);
                            navigate("/login");
                        }}
                    >
                        Login
                    </Button>

                    <Button
                        onClick={() => {
                            setMenuOpen(false);
                            navigate("/register");
                        }}
                    >
                        Get Started
                    </Button>

                </div>

            </div>
        )}

    </nav>

    );
}
