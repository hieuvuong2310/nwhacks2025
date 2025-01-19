'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function Create() {
    const [gameCode, setGameCode] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchGameCode = async () => {
            try {
                const response = await fetch(
                    'http://localhost:3030/game/create',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to create game');
                }

                const data = await response.json();
                setGameCode(data.gameId);
            } catch (err) {
                setError('Failed to create game. Please try again.');
                console.error('Error:', err);
            }
        };

        fetchGameCode();
    }, []);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Game code:
            </h1>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <p className="text-xl font-semibold">
                    {gameCode || 'Loading...'}
                </p>
            )}
            <Link href={`/game/${gameCode}`}>
                <Button disabled={!gameCode || !!error}>Start</Button>
            </Link>
        </div>
    );
}
