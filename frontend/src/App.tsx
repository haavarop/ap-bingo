import { useEffect, useState } from "react";
import { client } from "./client";
import { BingoBoard } from "./components/BingoBoard";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./index.css";

export type BingoDocumnet = {
  _id: string;
  bingoList: string[];
};

export type BingoBoard = [string, boolean][];

export const LOCALSTORAGE_KEY = "bingoBoard";

const shuffleArray = (array: BingoBoard) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

export async function getBingoBoard(): Promise<BingoDocumnet> {
  const data = (await client.fetch('*[_type == "bingo"][0]')) as BingoDocumnet;
  return data;
}

function App() {
  const [localData, setLocalData] = useLocalStorage<BingoBoard>(
    LOCALSTORAGE_KEY,
    []
  );

  const [initialBoard, setInitialboard] = useState<BingoBoard | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      if (localData.length === 0) {
        console.log("No localData");
        const data = await getBingoBoard();
        const playerData = data.bingoList.map(
          (s) => [s, false] as [string, boolean]
        );

        shuffleArray(playerData);

        setLocalData(playerData.slice(0, 25));
        setInitialboard(playerData.slice(0, 25));
      }
    };

    fetchData().catch(console.error);
  });

  return <BingoBoard initialBoard={initialBoard} />;
}

export default App;
