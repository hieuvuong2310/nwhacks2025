'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TypographyH3 } from '@/components/typography/typography';
import { useGame } from '@/contexts/GameContext';

export default function Match() {
    const { defenderMoney } = useGame();

    return (
        <div className="relative">
            {/* Background images */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute left-0 top-1/2 -translate-y-1/2">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/personal-web-4022f.firebasestorage.app/o/certi.png?alt=media&token=7f462216-5dbe-42f6-89c2-281e890448f7"
                        alt="employee of the month"
                        className="max-w-[550px] h-auto rotate-6"
                    />
                </div>
                <div className="absolute right-20 top-1/2 -translate-y-1/2">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/personal-web-4022f.firebasestorage.app/o/sticky%20note_1.png?alt=media&token=14bd358e-6242-4eb6-8cb1-7d9937bd848c"
                        alt="sticky note"
                        className="max-w-[150px] h-auto -rotate-12"
                    />
                </div>
                <div className="flex flex-col items-center justify-center my-20">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/personal-web-4022f.firebasestorage.app/o/computer_new.png?alt=media&token=9de90277-6dc9-42f5-88d5-59aceab4d96d"
                        alt="computer"
                        width={900}
                    />
                </div>
            </div>

            {/* Main content */}
            <div className="relative z-10">
                <Card>
                    <CardHeader>
                        <div className="flex flex-row gap-5 items-center">
                            <TypographyH3>
                                Select a move to defend the bank:
                            </TypographyH3>
                            <div className="bg-custom-blue rounded-lg px-2 py-1">
                                <p className="text-white">${defenderMoney}</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex w-full gap-2">
                                <Button className={`bg-custom-navy flex-1`}>
                                    Option 1
                                </Button>
                                <Button className={`bg-custom-navy flex-1`}>
                                    Option 2
                                </Button>
                            </div>
                            <div className="flex w-full gap-2">
                                <Button className={`bg-custom-navy flex-1`}>
                                    Option 3
                                </Button>
                                <Button className={`bg-custom-navy flex-1`}>
                                    Option 4
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
