import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TypographyH1 } from '@/components/typography/typography';
export default function Home() {
    return (
        <div>
            <TypographyH1>Get started</TypographyH1>
            <div className="flex flex-col gap-4 mt-4">
                <Link href="/create" className="w-full">
                    <Button className="bg-custom-red w-full py-6 text-lg">
                        Start Game
                    </Button>
                </Link>
                <Button className="bg-custom-navy w-full py-6 text-lg">
                    Exit
                </Button>
            </div>
        </div>
    );
}
