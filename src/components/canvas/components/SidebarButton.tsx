import { useDraggable } from "@dnd-kit/core";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { type ElementPayload } from "./Elements";

interface SidebarButtonProps {
  element: ElementPayload
}

export function SideBarButton ({ element }: SidebarButtonProps) {
  const { icon: Icon, label } = element.canvasButtonElement

  const draggable = useDraggable({
    id: `canvas-btn-${element.type}`,
    data: {
      type: element.type,
      isCanvasButtonElement: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant={"outline"}
      className={cn(
        "flex flex-col gap-2 h-[120px] w-[120px] cursor-grab",
        draggable.isDragging && "ring-2 ring-primary",
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  )
}

interface SidebarBtnElementDragOverlayProps {
  element: ElementPayload
}

export function SidebarBtnElementDragOverlay ({ element }: SidebarBtnElementDragOverlayProps) {
  const { icon: Icon, label } = element.canvasButtonElement

  return (
    <Button variant={"outline"} className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab">
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}