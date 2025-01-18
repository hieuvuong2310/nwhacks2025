import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Game of Threats
            </h1>
            <div className="flex flex-col space-y-4">
                <Link href="/create">
                    <Button>Create a game</Button>
                </Link>
                <Link href="/join">
                    <Button>Join a game</Button>
                </Link>
            </div>
        </div>
    );
}
