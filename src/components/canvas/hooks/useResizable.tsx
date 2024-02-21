import { useCallback, useState } from "react";

export function useResizable () {
  const [sizes, setSizes] = useState<number[]>([])

  const handleResize = useCallback((index: number, height: number) => {
    const newSizes = [...sizes];
    const currentSize = newSizes[index] ?? 0;
    const newSize = currentSize + height;
    newSizes[index] = newSize;
    setSizes(newSizes);
  }, [sizes])

  return { sizes, handleResize }
}