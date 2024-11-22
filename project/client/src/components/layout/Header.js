import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import HomeDropdownMenu from "./HomeDropdownMenu";
import logo from '../../assets/icons/lad-icon.png';
import { CartContext } from 'context/CartContext';
import AuthContext from "context/AuthContext";

const Header = () => {
    const [isCollapsed, setIsCollapsed] = useState(false); // Track header state
    const [lastScrollY, setLastScrollY] = useState(0); // Track scroll position

    const navigate = useNavigate();
    const { counter } = useContext(CartContext);
    const { isAuthenticated } = useContext(AuthContext);


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
            <div className="container mx-auto">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Left Section */}
                    <div className="flex items-center space-x-4">

                        <img className="w-32 h-16 cursor-pointer object-cover" src={logo} alt="home" onClick={() => navigate('/')} />

                        <div className=" ml-8 relative">
                            <input
                                type="text"
                                placeholder="Search for products"
                                className="w-96 p-3 pl-10 bg-white border rounded-full text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:text-black"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 material-symbols-outlined">
                                search
                            </span>
                        </div>
                    </div>
                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        {/* Notification Icon */}
                        <button className="relative" onClick={() => navigate('/cart')}>
                            <span className="w-8 material-symbols-outlined"> shopping_cart</span>
                            {counter > 0 && <span className=" absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                {counter}
                            </span>}
                        </button>

                        {/* Profile Section */}
                        <HomeDropdownMenu />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
