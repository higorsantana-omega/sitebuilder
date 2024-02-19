import { type Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { SidebarBtnElementDragOverlay } from "./canvas/components/SidebarButton";
import { ElementInstance, Elements, type ElementsType } from "./canvas/components/Elements";
import { useCanvas } from "./canvas/context/useCanvas";

export function DragOverlayWrapper () {
  const { elements } = useCanvas()
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = <div>No drag overlay</div>;

  const isSiderbarButtonElement = draggedItem?.data?.current?.isCanvasButtonElement as boolean

  if (isSiderbarButtonElement) {
    const type = draggedItem?.data?.current?.type as ElementsType
    node = <SidebarBtnElementDragOverlay element={Elements[type]} />
  }

  const isCanvasElement = draggedItem?.data?.current?.isCanvasElement as boolean
  if (isCanvasElement) {
    const elementId = draggedItem.data?.current?.elementId as string
    const element = elements.find(e => e.id === elementId) as ElementInstance
    const CanvasElement = Elements[element.type].designerComponent
    node = (
      <div
        className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80"
      >
        <CanvasElement element={element} />
      </div>
    )
  }

  return <DragOverlay>{node}</DragOverlay>;
}