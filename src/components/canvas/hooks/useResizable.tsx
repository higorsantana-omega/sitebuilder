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

  const updateSizes = (newIndex: number, size: number) => {
    setSizes((prev) => prev.filter(prevSize => prevSize !== size))

    setSizes((prev) => {
      const newSizes = [...prev]
      newSizes.splice(newIndex, 0, size)
      return newSizes
    });
  }

  return { sizes, handleResize, updateSizes }
}