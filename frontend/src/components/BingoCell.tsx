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
      <Cell
        onClick={() => handleClick(cellIndex)}
        isChecked={isChecked}
        index={cellIndex}
      >
        {bingoIndex === cellIndex && <ConfettiExplosion />}
        {value}
        {bingoIndex === cellIndex && <ConfettiExplosion />}
      </Cell>
    </>
  );
};

const Cell = styled.button<{ isChecked: boolean; index: number }>`
  display: flex;
  background-color: rgba(255, 255, 255, 0.5);
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 70%;
  padding: 2px;
  text-align: center;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.8);
  border-left: 1px solid rgba(0, 0, 0, 0.8);

  border-bottom: ${({ index }) =>
    index > 19 ? "1px solid rgba(0, 0, 0, 0.8)" : 0};

  border-right: ${({ index }) =>
    index % 5 === 4 ? "1px solid rgba(0, 0, 0, 0.8)" : 0};

  font-size: 12px;
  overflow: hidden;
  word-break: break-word;
  align-items: center;
  justify-content: center;
  transition: 0.4s;
  color: ${({ isChecked }) => (isChecked ? "white" : "#2f2c2f")};
  background: ${({ isChecked }) => (isChecked ? "#d70926" : "white")};
`;
