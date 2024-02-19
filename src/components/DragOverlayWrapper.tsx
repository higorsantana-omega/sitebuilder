import { type Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { SidebarBtnElementDragOverlay } from "./canvas/components/SidebarButton";
import { Elements, type ElementsType } from "./canvas/components/Elements";

export function DragOverlayWrapper () {
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

  const isSiderbarButtonElement = draggedItem?.data?.current?.isDesignerBtnElement as boolean

  if (isSiderbarButtonElement) {
    const type = draggedItem?.data?.current?.type as ElementsType
    node = <SidebarBtnElementDragOverlay element={Elements[type]} />
  }

  return <DragOverlay>{node}</DragOverlay>;
}