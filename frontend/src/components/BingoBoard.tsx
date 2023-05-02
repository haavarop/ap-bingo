import React, { useEffect, useState } from "react";
import { BingoBoard as BingoBoardType, LOCALSTORAGE_KEY } from "../App";
import styled from "styled-components";
import { BingoCell } from "./BingoCell";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Props = {
  initialBoard?: BingoBoardType;
};

export const BingoBoard: React.FC<Props> = ({ initialBoard }) => {
  const [localData, setLocalData] = useLocalStorage<BingoBoardType>(
    LOCALSTORAGE_KEY,
    []
  );

  const [board, setBoard] = useState(localData);

  const handleClick = (index: number) => {
    const cpy = [...board];
    cpy.splice(index, 1, [cpy[index][0], !cpy[index][1]]);
    setBoard(cpy);
  };

  useEffect(() => {
    if (initialBoard) {
      setBoard(initialBoard);
    }
  }, [initialBoard]);

  useEffect(() => {
    if (board.length !== 0) {
      setLocalData(board);
    }
  }, [board, setLocalData]);

  return (
    <Container>
      <Title>Årsmøtebingo</Title>
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
    </Container>
  );
};

const Board = styled.div`
  width: calc(800px + 16 * 4px);
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  color: #2f2c2f;
  font-size: 72px;
`;
