import { cn, generateRandomID } from "~/lib/utils"
import { Sidebar } from "./components/Sidebar"
import { type DragEndEvent, useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core"
import { useCanvas } from "./context/useCanvas"
import { useRef, useState } from "react"
import { type ElementInstance } from "./context"
import { Elements, type ElementsType } from "./components/Elements"
import { Resizable } from "re-resizable"
import { useResizable } from "./hooks/useResizable"

export function Canvas () {
  const { elements, addElement, selectedElement, setSelectedElement, removeElement } = useCanvas()
  const { sizes, handleResize } = useResizable()

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isCanvasDropArea: true,
    },
  })

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event
      if (!active || !over) return

      const data = active.data?.current

      const isCanvasButtonElement = data?.isCanvasButtonElement as boolean
      const isDroppingOverCanvasDropArea = over.data?.current?.isCanvasDropArea as boolean
      const droppingSidebarBtnOverCanvasDropArea = isCanvasButtonElement && isDroppingOverCanvasDropArea
      if (droppingSidebarBtnOverCanvasDropArea) {
        const type = data?.type as ElementsType
        const builtElement = Elements[type].build(generateRandomID())

        addElement(0, builtElement)
      }

      const isDroppingOverCanvasElementTopHalf = over.data?.current?.isTopHalfCanvasElement as boolean
      const isDroppingOverCanvasElementBottomHalf = over.data?.current?.isBottomHalfCanvasElement as boolean
      const isDroppingOverCanvasElement = isDroppingOverCanvasElementTopHalf || isDroppingOverCanvasElementBottomHalf
      const droppingSidebarBtnOverCanvasElement = isCanvasButtonElement && isDroppingOverCanvasElement
      if (droppingSidebarBtnOverCanvasElement) {
        const type = data?.type as ElementsType
        const builtElement = Elements[type].build(generateRandomID())
        const overId = over.data?.current?.elementId as string
        const elementIndex = elements.findIndex(e => e.id === overId)

        addElement(isDroppingOverCanvasElementBottomHalf ? elementIndex + 1 : elementIndex, builtElement)
      }

      const isCanvasElement = active?.data?.current?.isCanvasElement as boolean
      const draggingCanvasElementOverAnotherCanvasElement =
        isDroppingOverCanvasElement && isCanvasElement

      if (draggingCanvasElementOverAnotherCanvasElement) {
        const activeId = active.data?.current?.elementId as string
        const overId = over.data?.current?.elementId as string

        const activeElementIndex = elements.findIndex((el) => el.id === activeId)
        const overElementIndex = elements.findIndex((el) => el.id === overId)

        const activeElement = { ...elements[activeElementIndex] } as ElementInstance
        removeElement(activeId)

        let indexForNewElement = overElementIndex
        if (isDroppingOverCanvasElementBottomHalf) {
          indexForNewElement = overElementIndex + 1
        }

        addElement(indexForNewElement, activeElement)
      }
    }
  })

  return (
    <div className='flex w-full h-full'>
      <div
        className='p-4 w-full'
        onClick={() => {
          if (selectedElement) setSelectedElement(null)
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background w-full h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-4 ring-primary ring-inset",
          )}
        >
          {!droppable.isOver && !elements.length && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">Drop here</p>
          )}

          {droppable.isOver && !elements.length && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}

          {elements.length && (
            <div className="flex flex-col w-full h-full gap-2 p-4">
              {elements.map((element, index) => (
                <DesignerElementWrapper
                  key={element.id}
                  index={index}
                  element={element} 
                  handleResize={handleResize}
                  sizes={sizes}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Sidebar />
    </div>
  )
}

function DesignerElementWrapper ({
  element, index, sizes, handleResize
}: {
  element: ElementInstance,
  index: number
  sizes: number[],
  handleResize (index: number, height: number): void
}) {
  const { setSelectedElement, removeElement } = useCanvas()

  const ref = useRef(null)
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false)

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfCanvasElement: true,
    },
  })

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfCanvasElement: true,
    },
  })

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isCanvasElement: true,
    },
  })
  if (draggable.isDragging) return null

  const CanvasElement = Elements[element.type].designerComponent

  return (
    <Resizable
      ref={ref}
      className="relative mt-4 flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      minWidth='auto'
      defaultSize={{
        width: 'auto',
        height: 200
      }}
      size={{
        width: 'auto',
        height: sizes[index]! ?? 200
      }}
      onResizeStop={(e, direction, ref, delta) => handleResize(index, delta.height)}
    >
      <div
        ref={draggable.setNodeRef}
        {...draggable.listeners}
        {...draggable.attributes}
        // className="relative mt-4 flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
        onMouseEnter={() => {
          setMouseIsOver(true)
        }}
        onMouseLeave={() => {
          setMouseIsOver(false)
        }}
        onClick={(e) => {
          e.stopPropagation()
          setSelectedElement(element)
        }}
      >
        <div ref={topHalf.setNodeRef} className="absolute w-full h-1/2 rounded-t-md" />
        <div ref={bottomHalf.setNodeRef} className="absolute w-full bottom-0 h-1/2 rounded-b-md" />
        {/* {mouseIsOver && (
          <>
            <div className="absolute right-0 h-full">
              <Button
                className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
                variant={"outline"}
                onClick={(e) => {
                  e.stopPropagation() // avoid selection of element while deleting
                  removeElement(element.id)
                }}
              >
                <Trash className="h-6 w-6" />
              </Button>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
              <p className="text-muted-foreground text-sm">Click for properties or drag to move</p>
            </div>
            {bottomHalf.isOver && <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />}
          </>
        )} */}
        {topHalf.isOver && <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />}
        <div
          className={cn(
            "flex w-full items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
            `h-[${sizes[index]}px]`,
            mouseIsOver && "opacity-30",
          )}
        >
          <CanvasElement element={element} />
        </div>
        {bottomHalf.isOver && <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />}
      </div>
    </Resizable>
  )
}
