import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const ProductDetailHeader = () => {
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
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ProductDetailHeader;
