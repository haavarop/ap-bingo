import { useEffect, useState } from "react";
import { client } from "./client";
import { BingoBoard } from "./components/BingoBoard";
import { useLocalStorage } from "./hooks/useLocalStorage";

export type BingoDocumnet = {
  _id: string;
  bingoList: string[];
};

export type BingoBoard = [string, boolean][];

export const LOCALSTORAGE_KEY = "bingoBoard";

export async function getBingoBoard(): Promise<BingoDocumnet> {
  const data = (await client.fetch('*[_type == "bingo"][0]')) as BingoDocumnet;
  return data;
}

function App() {
  const [localData, setLocalData] = useLocalStorage<BingoBoard>(
    LOCALSTORAGE_KEY,
    []
  );

  useEffect(() => {
    
    const fetchData = async () => {
      
      if (localData.length === 0) {
        console.log("No localData");
        const data = await getBingoBoard();
        const playerData = data.bingoList.map(
          (s) => [s, false] as [string, boolean]
        );
        setLocalData(playerData);
      }
    };

    fetchData().catch(console.error);
  });

  return <BingoBoard />;
}

export default App;
