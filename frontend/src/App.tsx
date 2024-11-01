import { useState } from 'react';
import { Trophy, X, Circle } from 'lucide-react';

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');

  const handleClick = (index: number) => {
    if (squares[index] || checkWinner(squares)) return;
    const newSquares = squares.slice();
    newSquares[index] = currentPlayer;
    setSquares(newSquares);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const checkWinner = (squares: (string | null)[]) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of winningCombinations) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = checkWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);

  const PlayerCard = ({ player, isActive }: { player: string, isActive: boolean }) => (
    <div className={`rounded-xl p-4 transition-all duration-300 ${
      isActive ? 'bg-white/15 shadow-lg scale-105' : 'bg-white/5'
    } backdrop-blur-lg border border-white/10`}>
      <div className="flex items-center gap-3">
        {player === 'X' ? (
          <X className={`w-6 h-6 ${isActive ? 'text-blue-400' : 'text-white/60'}`} />
        ) : (
          <Circle className={`w-6 h-6 ${isActive ? 'text-pink-400' : 'text-white/60'}`} />
        )}
        <div>
          <p className={`font-medium ${isActive ? 'text-white' : 'text-white/60'}`}>
            Player {player}
          </p>
          <p className="text-xs text-white/40">
            {isActive ? 'Your turn' : 'Waiting...'}
          </p>
        </div>
      </div>
    </div>
  );

  const Square = ({ value, onClick }: { value: string | null; onClick: () => void }) => (
      <button
        onClick={onClick}
        className={`w-20 h-20 rounded-xl transition-all duration-300 
          ${value ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'} 
          backdrop-blur-sm border border-white/10 flex items-center justify-center
          ${!value && !winner && 'hover:scale-105'}`}
        disabled={Boolean(winner || value)}
      >
      {value && (
        <span className={`text-4xl font-bold ${
          value === 'X' ? 'text-blue-400' : 'text-pink-400'
        }`}>
          {value === 'X' ? <X size={36} /> : <Circle size={36} />}
        </span>
      )}
    </button>
  );
  
  const restart = () => {
    setSquares(Array(9).fill(null));
    setCurrentPlayer('X');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.7),rgba(17,24,39,1))]" />
      </div>

      <div className="relative z-10 max-w-2xl w-full space-y-8">
        {/* Header Component TicTacToe Part*/}
        <div className="text-center space-y-2">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-pink-300">
            Tic Tac Toe
          </h1>
          <p className="text-white/60">A classic game with a modern twist</p>
        </div>

        {/* Which Player is active */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <PlayerCard player="X" isActive={currentPlayer === 'X' && !winner} />
          <PlayerCard player="O" isActive={currentPlayer === 'O' && !winner} />
        </div>

        {/* Game Board */}
        {!(winner || isDraw) &&
          <div className="backdrop-blur-xl bg-white/5 p-8 rounded-xl border border-white/10">
            <div className="grid grid-cols-3 gap-4 w-fit mx-auto">
              {squares.map((value, index) => (
                <Square key={index} value={value} onClick={() => handleClick(index)} />
              ))}
            </div>
          </div>
        }

        {/* Winner or Draw */}
        {(winner || isDraw) && (
          <div className="text-center space-y-4">
            <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-lg rounded-xl border border-white/10">
              {winner ? (
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-medium">
                    Player {winner} Wins!
                  </span>
                </div>
              ) : (
                <span className="text-white/80">It's a Draw!</span>
              )}
            </div>
            <div>
              <button 
                onClick={restart}
                className="px-6 py-2 bg-white/10 hover:bg-white/15 backdrop-blur-lg rounded-xl border border-white/10 text-white/80 transition-all hover:scale-105"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;