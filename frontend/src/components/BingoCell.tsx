import React from "react";
import styled from "styled-components";
import ConfettiExplosion from "react-confetti-explosion";

type Props = {
  value: string;
  isChecked: boolean;
  handleClick: (index: number) => void;
  cellIndex: number;
  bingoIndex: number | null;
};

export const BingoCell: React.FC<Props> = ({
  value,
  isChecked,
  handleClick,
  cellIndex,
  bingoIndex,
}) => {
  return (
    <>
      <Cell onClick={() => handleClick(cellIndex)} isChecked={isChecked}>
        {bingoIndex === cellIndex && <ConfettiExplosion />}
        {value}
        {bingoIndex === cellIndex && <ConfettiExplosion />}
      </Cell>
    </>
  );
};

const Cell = styled.button<{ isChecked: boolean }>`
  border: 1px solid black;
  width: 160px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: 0.4s;
  color: ${({ isChecked }) => (isChecked ? "white" : "#2f2c2f")};
  background: ${({ isChecked }) => (isChecked ? "#d70926" : "white")};
`;
