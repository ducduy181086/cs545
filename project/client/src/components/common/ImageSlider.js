import React, { useState, useEffect } from 'react';

const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to go to the next image
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Function to go to the previous image
    const prevSlide = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
    };

    // Optional: Auto slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(nextSlide, 5000); // Change image every 5 seconds
        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            {/* Image container */}
            <div className="flex  justify-center text-center overflow-hidden rounded-lg">
                <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex}`}
                    className="w-80 h-80 object-cover rounded-md transition-all duration-500 justify-center"
                />
            </div>

            {/* Navigation buttons */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500 text-4xl cursor-pointer">
                <button onClick={prevSlide}><span class="material-symbols-outlined">
                    arrow_back_ios
                </span></button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 text-4xl cursor-pointer">
                <button onClick={nextSlide}><span class="material-symbols-outlined">
                    arrow_forward_ios
                </span></button>
            </div>

            {/* Optional: Indicator dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`w-2 h-2 rounded-full cursor-pointer ${currentIndex == index ? 'bg-blue-500' : 'bg-white'
                            }`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
