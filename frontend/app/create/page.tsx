'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Create() {
    return (
        <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Pick your side:
            </h1>
            <div className="flex flex-col gap-4 mt-4">
                <Link href="/match" className="w-full">
                    <Button className="bg-custom-red w-full py-6 text-lg">
                        Attacker
                    </Button>
                </Link>
                <Link href="/match" className="w-full">
                    <Button className="bg-custom-navy w-full py-6 text-lg">
                        Defender
                    </Button>
                </Link>
            </div>
        </div>
    );
}
