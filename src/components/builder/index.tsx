import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { Canvas } from "../canvas";
import { CanvasProvider } from "../canvas/context";
import { DragOverlayWrapper } from "../DragOverlayWrapper";

export function Builder () {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <CanvasProvider>
      <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent">
        <DndContext sensors={sensors}>
          <Canvas />

          <DragOverlayWrapper />
        </DndContext>
      </div>
    </CanvasProvider>
  )
}