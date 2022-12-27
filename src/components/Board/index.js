import {Square} from "../Square/index.js";
import {useState} from "react";

export const Board = () => {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));

    const handleClick = (i) => {
        if (squares[i] || calculateWinner(squares)){
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext){
            nextSquares[i] = 'X';
        } else{
            nextSquares[i] = 'O';
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner){
        status = "winner: " + winner;
    } else{
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <>
            <div className={status}>{status}</div>
            <div className="board-row">
                <Square values={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square values={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square values={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square values={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square values={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square values={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className="board-row">
                <Square values={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square values={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square values={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
        </>
    )
};
const calculateWinner = (squares) => {
    const lines =[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
        return null;
    }
}