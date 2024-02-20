import { Button } from "../ui/button";
import { Cable } from 'lucide-react'

export function PublishButton () {
  return (
    <Button className="gap-2 text-white bg-gradient-to-r from-slate-400 to-red-400">
      <Cable className="h-6 w-6" />
      Publish
    </Button>
  )
}