'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function End() {
  const searchParams = useSearchParams();
  const winner = searchParams.get('winner'); // 'attacker' | 'defender' | null

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-4">
        {winner === 'attacker' && 'Attackers Win!'}
        {winner === 'defender' && 'Defenders Win!'}
        {!winner && 'No Winner Determined'}
      </h1>
      <Link href="/">
        <button onClick={() => window.location.href = '/'}
        className="px-4 py-2 bg-custom-red-dark text-white rounded hover:bg-custom-red">
          Restart Game
        </button>
      </Link>
    </div>
  );
}
