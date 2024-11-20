import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const [isCollapsed, setIsCollapsed] = useState(false); // Track header state
    const [lastScrollY, setLastScrollY] = useState(0); // Track scroll position

    const navigate = useNavigate();


    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        // Collapse when scrolling down, expand when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
            setIsCollapsed(true);
        } else {
            setIsCollapsed(false);
        }

        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]); // Effect runs when `lastScrollY` changes

    return (
        <header className={`fixed top-0 w-full z-50 transition-transform duration-300 bg-white shadow-md ${isCollapsed ? "-translate-y-full" : "translate-y-0"}`}>
            <div className="container mx-auto p-4">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Left Section */}
                    <div className="flex items-center space-x-4">
                        <h1 className="text-2xl font-bold text-primary" onClick={() => navigate('/')}>eGrocery Market</h1>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for products"
                                className="w-96 p-3 pl-10 bg-white border rounded-full text-sm shadow-sm focus:outline-none focus:ring focus:text-blue-100"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 material-symbols-outlined">
                                search
                            </span>
                        </div>
                    </div>
                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        <p>{window.location.pathname}</p>
                        {/* Notification Icon */}
                        <button className="relative" onClick={() => navigate('/cart')}>
                            <span className="w-8 material-symbols-outlined"> shopping_cart</span>
                            <span className=" absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                2
                            </span>
                        </button>

                        {/* Profile Section */}
                        <div className="flex items-center space-x-2">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="Profile"
                                className="w-10 h-10 rounded-full border"
                            />

                            <button className="text-gray-600" >
                                <span className="material-symbols-outlined">keyboard_arrow_down</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
