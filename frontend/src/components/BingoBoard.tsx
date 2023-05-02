import React, { useEffect, useState } from "react";
import { BingoBoard as BingoBoardType, LOCALSTORAGE_KEY } from "../App";
import styled from "styled-components";
import { BingoCell } from "./BingoCell";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const BingoBoard: React.FC = () => {
  const [localData, setLocalData] = useLocalStorage<BingoBoardType>(
    LOCALSTORAGE_KEY,
    []
  );
  const [board, setBoard] = useState(localData);

  const handleClick = (index: number) => {
    const cpy = [...board];
    cpy.splice(index, 1, [cpy[index][0], true]);
    setBoard(cpy);
  };

  useEffect(() => {
    if (board.length !== 0) {
      setLocalData(board);
    }
  }, [board, setLocalData]);

  return (
    <Board>
      {board.map(([value, isChecked], i) => (
        <BingoCell
          handleClick={handleClick}
          key={value}
          value={value}
          isChecked={isChecked}
          cellIndex={i}
        />
      ))}
    </Board>
  );
};

const Board = styled.div`
  width: 1000px;
  display: flex;
  flex-wrap: wrap;
`;
