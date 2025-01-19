'use client';


import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useGame } from '@/contexts/GameContext';

// 1) Import the chart libraries
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// 2) Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function End() {
  const searchParams = useSearchParams();
  const winner = searchParams.get('winner'); // 'attacker' | 'defender' | null


  // 3) Destructure the scoreHistory from GameContext
  const { scoreHistory } = useGame();

  // 4) Prepare Chart Data
  //    The X‐axis labels can be [1..scoreHistory.length], 
  //    The Y values are the actual scores from your array
  const labels = scoreHistory.map((_, i) => i + 1);

  const data = {
    labels,
    datasets: [
      {
        label: 'Game Score (Attacker leads > 0, Defender leads < 0)',
        data: scoreHistory,
        borderColor: 'rgba(255, 99, 132, 1)',  // e.g. red line
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.2,  // makes the line a bit curved
      },
    ],
  };

  // 5) Optional: ChartJS config options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Score History',
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Move # (1 to N)' },
      },
      y: {
        title: { display: true, text: 'Score (Attacker – Defender)' },
      },
    },
  };

  // 6) Restart logic
  const handleRestart = () => {
    window.location.href = '/';
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-gray-800 text-white p-4">

      <h1 className="text-3xl font-bold mb-4">
        {winner === 'attacker' && 'Attackers Win!'}
        {winner === 'defender' && 'Defenders Win!'}
        {!winner && 'No Winner Determined'}
      </h1>

      
      {/* 7) Render the chart in a container */}
      <div className="bg-white text-black rounded-md p-4 w-full max-w-2xl">
        <Line data={data} options={options} />
      </div>

      {/* 8) A restart button */}
      <Link href="/">
        <button
          onClick={handleRestart}
          className="mt-4 px-4 py-2 bg-custom-red-dark text-white rounded hover:bg-custom-red"
        >

          Restart Game
        </button>
      </Link>
    </div>
  );
}
