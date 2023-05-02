import React, { useEffect, useState } from "react";
import {
  BingoBoard as BingoBoardType,
  LOCALSTORAGE_KEY,
  getBingoBoard,
  shuffleArray,
} from "../App";
import styled from "styled-components";
import { BingoCell } from "./BingoCell";
import { useLocalStorage } from "../hooks/useLocalStorage";
import ConfettiExplosion from "react-confetti-explosion";
import success from "../../public/Success.mp3";

type Props = {
  initialBoard?: BingoBoardType;
};

const validate = (board: BingoBoardType, index: number) => {
  // Validate row
  const rowStart = index - (index % 5);
  const rowEnd = rowStart + 5;
  const cpy = [...board].slice(rowStart, rowEnd);
  const rowBingo = cpy.filter((cell) => cell[1]).length === 5;

  const remainder = index % 5;
  const colBingo =
    board.filter((cell, i) => i % 5 === remainder && cell[1]).length === 5;

  const leftDiagBingo =
    index % 6 === 0 &&
    board.filter((cell, i) => i % 6 === 0 && cell[1]).length === 5;

  const rightDiagBingo =
    index % 4 === 0 &&
    index !== 0 &&
    board.filter((cell, i) => i % 4 === 0 && i !== 0 && cell[1]).length === 5;

  if (rowBingo || colBingo || leftDiagBingo || rightDiagBingo) {
    return true;
  }
  return false;
};

export const BingoBoard: React.FC<Props> = ({ initialBoard }) => {
  const [localData, setLocalData] = useLocalStorage<BingoBoardType>(
    LOCALSTORAGE_KEY,
    []
  );

  const [board, setBoard] = useState<BingoBoardType>(localData);
  const [bingoIndex, setBingoIndex] = useState<number | null>(null);

  const [sound] = useState(new Audio(success));

  const newBoard = async () => {
    const data = await getBingoBoard();
    const playerData = data.bingoList.map(
      (s) => [s, false] as [string, boolean]
    );
    shuffleArray(playerData);
    setLocalData(playerData.slice(0, 25));
    setBoard(playerData.slice(0, 25));
    setBingoIndex(null);
  };

  const handleClick = (index: number) => {
    const cpy = [...board];
    cpy.splice(index, 1, [cpy[index][0], !cpy[index][1]]);
    const isBingo = validate(cpy, index);
    if (isBingo) {
      setBingoIndex(index);
      sound.play();
    }
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
    <>
      <Menu>
        <button onClick={newBoard}>🔄</button>
      </Menu>
      <Container>
        <TitleContainer>
          {bingoIndex !== null && <ConfettiExplosion />}
          <Title>
            {bingoIndex === null ? `🌹 Landsmøtebingo 🌹` : `🎉 BINGO 🎉`}
          </Title>
          {bingoIndex !== null && <ConfettiExplosion />}
        </TitleContainer>
        <Board>
          {board.map(([value, isChecked], i) => (
            <BingoCell
              bingoIndex={bingoIndex}
              handleClick={handleClick}
              key={i}
              value={value}
              isChecked={isChecked}
              cellIndex={i}
            />
          ))}
        </Board>
      </Container>
    </>
  );
};

const Board = styled.div`
  width: calc(800px + 16 * 4px);
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Menu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
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
