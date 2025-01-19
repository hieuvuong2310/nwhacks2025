'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TypographyH3 } from '@/components/typography/typography';
import { useGame } from '@/contexts/GameContext';

export default function Match() {
    const { attackerMoney } = useGame();

    return (
        <div>
            <Card>
                <CardHeader>
                    <div className="flex flex-row gap-5 items-center">
                        <TypographyH3>
                            Select a move to attack the bank:
                        </TypographyH3>
                        <div className="bg-custom-red-dark rounded-lg px-2 py-1">
                            <p className="text-white">${attackerMoney}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex w-full gap-2">
                            <Button className={`bg-custom-red flex-1`}>
                                Option 1
                            </Button>
                            <Button className={`bg-custom-red flex-1`}>
                                Option 2
                            </Button>
                        </div>
                        <div className="flex w-full gap-2">
                            <Button className={`bg-custom-red flex-1`}>
                                Option 3
                            </Button>
                            <Button className={`bg-custom-red flex-1`}>
                                Option 4
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
