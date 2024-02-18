import { useContext } from "react";
import { CanvasContext } from ".";

export function useCanvas() {
  return useContext(CanvasContext)
}