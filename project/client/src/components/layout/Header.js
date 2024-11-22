import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import HomeDropdownMenu from "./HomeDropdownMenu";
import logo from '../../assets/icons/lad-ico.svg';
import { CartContext } from 'context/CartContext';
import AuthContext from "context/AuthContext";

const Header = ({ showSearchBar = false, onKeywordChanged, delay=500 }) => {
    const [isCollapsed, setIsCollapsed] = useState(false); // Track header state
    const [lastScrollY, setLastScrollY] = useState(0); // Track scroll position
    const [searchText, setSearchText] = useState(""); // Track search text
    const [debouncedText, setDebouncedText] = useState(searchText); // Track debounced search text


    const navigate = useNavigate();
    const { counter } = useContext(CartContext);
    const { user } = useContext(AuthContext)

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


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedText(searchText);
        }, delay);

        return () => clearTimeout(handler);
    }, [searchText, delay]);

    useEffect(() => {
        if (onKeywordChanged) {
            onKeywordChanged(debouncedText);
        }
    }, [debouncedText, onKeywordChanged]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setSearchText(newValue);
    };

    return (
        <header className={`fixed top-0 w-full z-50 transition-transform duration-300 bg-white shadow-md ${isCollapsed ? "-translate-y-full" : "translate-y-0"}`}>
            <div className="container mx-auto">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Left Section */}
                    <div className="flex items-center space-x-4">

                        <img className="w-32 h-16 cursor-pointer object-cover" src={logo} alt="home" onClick={() => navigate('/')} />

                        {showSearchBar && <div className=" ml-8 relative">
                            <input
                                type="text"
                                placeholder="Search for products"
                                value={searchText}
                                onChange={handleChange}
                                className="w-96 p-3 pl-10 bg-white border rounded-full text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:text-black"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 material-symbols-outlined">
                                search
                            </span>
                        </div>}
                    </div>
                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        {user?.role !== 'SELLER' && user?.role !== 'ADMIN' && <button className="relative" onClick={() => navigate('/cart')}>
                            <span className="w-8 material-symbols-outlined"> shopping_cart</span>
                            {counter > 0 && <span className=" absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                {counter}
                            </span>}
                        </button>}

                        <HomeDropdownMenu />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
