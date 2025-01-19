import React from 'react';
import ComputerPage from '../computer/page';
export default function BackgroundAttacker() {
    return (
        <div className="h-screen flex flex-col">
            <div className="h-screen w-screen flex flex-col m-0 overflow-hidden">
            <div className="flex-1 bg-gray-700 flex items-center justify-between px-16">
            <ComputerPage />
            </div>
            <div className="h-1/3 bg-blackbean"></div>
        </div>
           
        </div>
    );
}