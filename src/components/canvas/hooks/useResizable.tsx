import { useState } from "react";

export function useResizable () {
  const [sizes, setSizes] = useState<number[]>([])

  const handleResize = (index: number, height: number) => {
    console.log({ index, height })
    const newSizes = [...sizes];
    const currentSize = newSizes[index] ?? 0;
    const newSize = currentSize + height;
    newSizes[index] = newSize;
    setSizes(newSizes);
  }

  return { sizes, handleResize }
}