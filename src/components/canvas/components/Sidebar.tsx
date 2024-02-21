import { Button } from "~/components/ui/button";
import { useCanvas } from "../context/useCanvas";
import { Elements } from "./Elements";
import { ElementsSidebar } from "./ElementsSidebar";
import { X } from "lucide-react";
import { Separator } from "~/components/ui/separator";

export function Sidebar () {
  const { selectedElement } = useCanvas()

  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {!selectedElement && <ElementsSidebar />}
      {selectedElement && <PropertiesElementSidebar />}
    </aside>
  )
}

function PropertiesElementSidebar () {
  const { selectedElement, setSelectedElement } = useCanvas()
  if (!selectedElement) return null

  const Properties = Elements[selectedElement?.type].propertiesComponent

  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Element properties</p>
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={() => setSelectedElement(null)}
        >
          <X />
        </Button>
      </div>
      <Separator className="mb-6" />
      <Properties elementInstance={selectedElement}/>
    </div>
  )
}
