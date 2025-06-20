import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";
import { navItems } from "../constants";

const Navbar = () => {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    const toggleNavbar = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    };

    return (
        <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg">
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex justify-between items-center">
                    {/* Logo Section - Left */}
                    <div className="flex items-center flex-shrink-0">
                        <img className="h-8 w-8 mr-2" src={logo} alt="" />
                        <span className="text-xl tracking-tight">SADIQ</span>
                    </div>

                    {/* Navigation Items + Login Button - Right (Desktop) */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {/* Navigation Items */}
                        <ul className="flex space-x-8">
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <a 
                                        href={item.href}
                                        className="hover:text-[#A8D608] transition-colors duration-200"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        
                        {/* Login Button */}
                        <a 
                            href="#" 
                            className="bg-[#006837] text-white py-2 px-4 rounded-md hover:bg-[#005a2f] transition-colors duration-200"
                        >
                            Log In / Sign Up
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden md:flex flex-col justify-end">
                        <button onClick={toggleNavbar}>
                            {mobileDrawerOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer */}
                {mobileDrawerOpen && (
                    <div className="fixed right-0 z-20 bg-white w-full p-12 flex flex-col justify-center items-center lg:hidden">
                        <ul>
                            {navItems.map((item, index) => (
                                <li key={index} className="py-2">
                                    <a href={item.href} className="text-gray-800 hover:text-[#A8D608] transition-colors duration-200">
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4">
                            <a 
                                href="#" 
                                className="bg-[#006837] text-white py-2 px-4 rounded-md hover:bg-[#005a2f] transition-colors duration-200"
                            >
                                Log In / Sign Up
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;