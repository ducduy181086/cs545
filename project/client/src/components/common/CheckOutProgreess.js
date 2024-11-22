
import { Button } from "@mui/material";
import React from "react";

const CheckOutProgress = ({ step, totalSteps, title, onBack }) => {
    const progressPercentage = (step / totalSteps) * 100;

    return (
        <div className="w-full flex items-center space-x-4 px-4 py-2  align-center">
            {/* Back Button */}
            <Button
                onClick={onBack}
                color="black"
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
                <span className="material-symbols-outlined">
                    arrow_back
                </span>
            </Button>

            {/* Step Indicator */}
            <div className="flex-1">
                <p className="text-center font-medium">
                    {step}/{totalSteps} {title}
                </p>

                {/* Progress Bar */}
                <div className="relative mt-2 h-1 bg-gray-200 rounded">
                    <div
                        className="absolute top-0 left-0 h-1 bg-black rounded"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default CheckOutProgress;