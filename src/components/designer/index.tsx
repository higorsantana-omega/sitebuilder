import { cn } from "~/lib/utils";
import { Sidebar } from "./components/Sidebar";
import { useDroppable } from "@dnd-kit/core";


export function Designer () {
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  return (
    <div className='flex w-full h-full'>
      <div className='p-4 w-full'>
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background w-full h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-4 ring-primary ring-inset",
          )}
        >
          {!droppable.isOver && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">Drop here</p>
          )}

          {droppable.isOver && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
        </div>
      </div>

      <Sidebar />
    </div>
  )
}