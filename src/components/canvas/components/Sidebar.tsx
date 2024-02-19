import { useCanvas } from "../context/useCanvas";
import { Elements, type ElementsType } from "./Elements";
import { ElementsSidebar } from "./ElementsSidebar";

export function Sidebar () {
  const { selectedElement } = useCanvas()

  console.log({ selectedElement })

  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {!selectedElement && <ElementsSidebar />}
      {selectedElement && <PropertiesElementSidebar />}
    </aside>
  )
}

function PropertiesElementSidebar () {
  const { selectedElement } = useCanvas()

  const Properties = Elements[selectedElement?.type].propertiesComponent
  return (
    <div className="flex flex-col p-2">
      <Properties />
    </div>
  )
}