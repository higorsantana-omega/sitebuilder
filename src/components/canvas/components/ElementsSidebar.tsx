import { Separator } from "~/components/ui/separator";
import { SideBarButton } from "./SidebarButton";
import { Elements } from "./Elements";

export function ElementsSidebar () {
  return (
    <div>
      <p className="text-sm text-foreground/70">Drag and drop elements</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">Layout elements</p>
        <SideBarButton element={Elements.Container} />
      </div>
    </div>
  )
}