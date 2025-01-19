import React from 'react';
import ComputerPage from '../computer/page';
export default function BackgroundAttacker() {
    return (
<<<<<<< HEAD
        <div className="bg-gray-700 h-screen w-screen overflow-hidden">
            <div className="absolute inset-0 z-10 flex items-center justify-center">
                <ComputerPage />
            </div>
            <div className="flex-1 flex items-center justify-between">
                <div className="flex flex-row m-0 overflow-hidden">
                    <div className="flex flex-row items-center justify-center gap-80 w-full">
                        <div className="ml-[20px]"> {/* Adjust the negative margin as needed */}
                            <img 
                                src="https://firebasestorage.googleapis.com/v0/b/personal-web-4022f.firebasestorage.app/o/sticky%20note_3.png?alt=media&token=1cebf760-f4b7-4065-8e8f-822d48f53144" 
                                alt="sticky" 
                                className="max-w-[300px] h-auto rotate-6" 
                            />
                        </div>
                        <div className="ml-[500px]"> {/* Adjust the negative margin as needed */}
                            <img 
                                src="https://firebasestorage.googleapis.com/v0/b/personal-web-4022f.firebasestorage.app/o/sticky%20note_2.png?alt=media&token=ee991e7a-7e5a-4725-b871-f4ba95e1cf72" 
                                alt="sticky note" 
                                className="max-w-[300px] h-auto -rotate-12" 
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-60 h-2/3 bg-blackbean"></div>
=======
        <div className="h-screen flex flex-col">
            <div className="h-screen w-screen flex flex-col m-0 overflow-hidden">
                <div className="flex-1 bg-gray-700 flex items-center justify-between px-16">
                    <ComputerPage />
                </div>
                <div className="h-1/3 bg-blackbean"></div>
            </div>
>>>>>>> cbe422a (new attacker/defender pages)
        </div>
    );
}
