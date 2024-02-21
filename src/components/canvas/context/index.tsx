import { type Dispatch, type ReactNode, type SetStateAction, createContext, useState } from "react";

export type ElementsType =
  | "Container"

export type ElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, unknown>;
};

interface CanvasContextValue {
  elements: ElementInstance[];
  setElements: Dispatch<SetStateAction<ElementInstance[]>>;
  addElement: (index: number, element: ElementInstance) => void;
  removeElement: (id: string) => void

  selectedElement: ElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<ElementInstance | null>>

  updateElement: (id: string, element: ElementInstance) => void;

  elementUpdated: ElementInstance
}

export const CanvasContext = createContext({} as CanvasContextValue)

export function CanvasProvider ({ children }: { children: ReactNode }) {
  const [elements, setElements] = useState<ElementInstance[]>([]);
  const [selectedElement, setSelectedElement] = useState<ElementInstance | null>(null)
  const [elementUpdated, setElementUpdated] = useState<ElementInstance>({} as ElementInstance)

  const addElement = (index: number, element: ElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

  const updateElement = (id: string, element: ElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((el) => el.id === id);
      newElements[index] = element;
      if (index === newElements.length - 1) {
        setElementUpdated(element)
      }
      return newElements;
    });
  };

  return (
    <CanvasContext.Provider
      value={{
        elements,
        setElements,
        addElement,
        removeElement,

        selectedElement,
        setSelectedElement,

        updateElement,

        elementUpdated
      }}
    >
      {children}
    </CanvasContext.Provider>
  )
}