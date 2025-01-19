'use client';

import { useGame } from '@/contexts/GameContext';
import ComputerPage from '@/app/computer/page';

export default function RoleBackground({
    children,
}: {
    children: React.ReactNode;
}) {
    const { playerRole } = useGame();

    if (playerRole === 'defender') {
        return (
            <div className="h-screen w-screen flex flex-col m-0 overflow-hidden">
                <div className="flex-1 bg-gray-100 relative">
                    <div className="absolute inset-0 flex items-center justify-between px-16">
                        {/* STICKY NOTE AND CERTIFICATE */}
                        <div className="flex-1 flex items-center justify-between px-16">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/personal-web-4022f.firebasestorage.app/o/certi.png?alt=media&token=7f462216-5dbe-42f6-89c2-281e890448f7"
                                alt="employee of the month"
                                className="max-w-[550px] h-auto pl-4 rotate-6"
                            />
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/personal-web-4022f.firebasestorage.app/o/sticky%20note_1.png?alt=media&token=14bd358e-6242-4eb6-8cb1-7d9937bd848c"
                                alt="sticky note"
                                className="max-w-[150px] h-auto -rotate-12"
                            />
                        </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center translate-y-60">
                        {/* COMPUTER */}
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/personal-web-4022f.firebasestorage.app/o/computer_new.png?alt=media&token=9de90277-6dc9-42f5-88d5-59aceab4d96d"
                            alt="computer"
                            width={800}
                        />
                    </div>
                </div>

                <div className="h-1/3 bg-lightbrown"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    {children}
                </div>
            </div>
        );
    } else if (playerRole === 'attacker') {
        return (
            <div className="h-screen w-screen flex flex-col m-0 overflow-hidden">
                <div className="flex-1 bg-gray-100 flex items-center justify-between px-16">
                    {/* TODO: Add attacker background */}
                </div>
                <div className="h-1/3 bg-lightbrown"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    {children}
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
