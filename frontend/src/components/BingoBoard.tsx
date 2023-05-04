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
import logo from "../../public/logo.png"

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
      <Container>
        <TitleContainer>
          {bingoIndex !== null && <ConfettiExplosion />}
          {bingoIndex === null ? <img src={logo} style={{ height: '44px', width: '44px' }}/> : ""}
          <Title>
            {bingoIndex === null ? `Landsmøtebingo` : `🎉 BINGO 🎉`}
          </Title>
          {bingoIndex === null ? <img src={logo} style={{ height: '44px', width: '44px' }}/> : ""}
          {bingoIndex !== null && <ConfettiExplosion />}
          <MenuButton onClick={newBoard}>Nytt brett</MenuButton>
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
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  background-color: #efefef;
  width: 100vw;
  max-width: 110vh;
  height: 100vw;
  max-height: 75vh;
  min-height: 75vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 110vh;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    margin-bottom: 24px;
  }
`;

const MenuButton = styled.button`
  position: absolute;
  right: 0;
  border: 2px solid #b21c17;
  border-radius: 10px;
  cursor: pointer;
  background-color: #e21617;
  color: white;
  padding: 10px;
  font-size: 12px;

  @media only screen and (max-width: 600px) {
    position: unset;
  }
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
`;