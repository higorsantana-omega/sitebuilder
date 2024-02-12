import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function SideBarButton () {
  return (
    <Button
      variant={"outline"}
      className={cn(
        "flex flex-col gap-2 h-[120px] w-[120px] cursor-grab",
        // draggable.isDragging && "ring-2 ring-primary",
      )}
    >
      <p className="text-xs">{'teste'}</p>
    </Button>
  )
}