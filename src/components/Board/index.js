import {Square} from "../Square/index.js";

export const Board = ({xIsNext, squares, onPlay}) => {
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
        onPlay(nextSquares)
    }

    const winner = calculateWinner(squares);

    let status;
    let isWinner;
    const squaresColour = (x) =>{
        if (winner && (x === winner[0] || x === winner[1]|| x === winner[2])){
            isWinner = true;
        } else if (winner && (x !== winner[0] || x !== winner[1]|| x !== winner[2])){
            isWinner = false;
        }
        return isWinner;
    }
    if (winner){
        status = "winner: " + winner[0];
    } else{
        status = "Next player: " + (xIsNext ? "X" : "O");
    }
    let row = [];
    let rows = Array(3);

    for (let i = 0; i < rows.length; i++){
        for (let x = 0; x < squares.length; x++){

            row.push(<Square value={squares[x]} onSquareClick={() => handleClick(x)} isWinner={squaresColour(x)}/>)
            if (x === 2 || x === 5 || x === 8){
                rows.push(<div className="board-row">{row}</div>);
                rows.shift();
                row = [];
            }
        }
        console.log(winner)
        return rows;
    }
    return (
        <>
            <div className="status">{status}</div>
            {rows}
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
    for(let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return [a, b, c];
        }
    }
    return null;
}