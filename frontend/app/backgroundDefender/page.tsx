export default function BackgroundDefender() {
    return (
        <div className="h-screen flex flex-col">
            <div className="flex-1 bg-gray-100 flex items-center justify-between px-16">
                <img 
                    src="https://firebasestorage.googleapis.com/v0/b/personal-web-4022f.firebasestorage.app/o/certi.png?alt=media&token=7f462216-5dbe-42f6-89c2-281e890448f7" 
                    alt="employee of the month" 
                    className="max-w-[500px] h-auto pl-4 rotate-6" 
                />
                <img 
                    src="https://firebasestorage.googleapis.com/v0/b/personal-web-4022f.firebasestorage.app/o/sticky%20note_1.png?alt=media&token=14bd358e-6242-4eb6-8cb1-7d9937bd848c" 
                    alt="sticky note" 
                    className="max-w-[150px] h-auto -rotate-12" 
                />
            </div>
            <div className="h-1/3 bg-lightbrown"></div>
        </div>
    );
}