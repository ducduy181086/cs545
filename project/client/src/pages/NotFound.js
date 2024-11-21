import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

function NotFound() {
    // State to hold the countdown value
    const [countdown, setCountdown] = useState(10);  // 10 seconds countdown
    const navigate = useNavigate();  // React Router hook to navigate

    useEffect(() => {
        // If countdown reaches 0, navigate to home
        if (countdown === 0) {
            navigate('/');
        }

        // Set an interval to decrease the countdown every second
        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        // Clear interval when component unmounts or countdown reaches 0
        return () => clearInterval(interval);
    }, [countdown, navigate]);

    const handleClick = () => {
        // Manually navigate to home when button is clicked
        navigate('/');
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-9xl font-bold mb-4 text-gray-500">404</h1>
                <h1 className="text-5xl font-bold mb-4 text-blue-500">Hey hey, what are you doing?</h1>

                <div className='flex items-center justify-center border-b border-blue-100 pb-4  mt-12'>
                    <Button
                        onClick={handleClick}
                        sx={{
                            width: 72,
                            height: 72,
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 0,
                        }}
                    >
                        <span class="material-symbols-outlined">
                            arrow_back
                        </span>

                    </Button>
                    <p> Redirecting in {countdown} seconds..</p>
                </div>


            </div>
        </div>
    );
}

export default NotFound;