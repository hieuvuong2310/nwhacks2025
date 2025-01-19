import React from 'react';
import Computer from '@/components/Computer';

export default function BackgroundAttacker() {
    return (
        <div className="bg-gray-700 h-screen w-screen overflow-hidden">
            <div className="absolute inset-0 z-10 flex items-center justify-center">
                <Computer />
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
        </div>
    );
}
