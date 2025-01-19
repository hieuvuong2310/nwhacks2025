import ComputerPage from "../computer/page";

export default function BackgroundDefender() {
    return (
        <div className="bg-gray-700 h-screen w-screen overflow-hidden">
        <div className="absolute inset-0 z-10 flex items-center justify-center">
            <ComputerPage />
        </div>
        <div className="flex-1 flex items-center justify-between">
            <div className="flex flex-row m-0 overflow-hidden">
                <div className="flex flex-row items-center justify-center gap-80 w-full">
                    <div className="ml-[20px]"> {/* Adjust the negative margin as needed */}
                        <img 
                            src="https://firebasestorage.googleapis.com/v0/b/personal-web-4022f.firebasestorage.app/o/certi.png?alt=media&token=7f462216-5dbe-42f6-89c2-281e890448f7" 
                            alt="employee of the month" 
                            className="max-w-[550px] h-auto rotate-6" 
                        />
                    </div>
                    <div className="ml-[200px]"> {/* Adjust the negative margin as needed */}
                        <img 
                            src="https://firebasestorage.googleapis.com/v0/b/personal-web-4022f.firebasestorage.app/o/sticky%20note_1.png?alt=media&token=14bd358e-6242-4eb6-8cb1-7d9937bd848c" 
                            alt="sticky note" 
                            className="max-w-[150px] h-auto -rotate-12" 
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="h-2/3 bg-lightbrown"></div>
    </div>
    );
}