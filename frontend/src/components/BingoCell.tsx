import React from "react";
import styled from "styled-components";
import ConfettiExplosion from "react-confetti-explosion";
import logo from "../../public/logo.png"

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
  background-color: rgba(255, 255, 255, 0.5);
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 70%;
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 10px;
  text-align: center;
  font-size: 13px;
  display: flex;
  overflow: hidden;
  word-break: break-word;
  transition: 0.4s;
  color: ${({ isChecked }) => (isChecked ? "white" : "#2f2c2f")};
  background: ${({ isChecked }) => (isChecked ? "#d70926" : "white")};
`;
