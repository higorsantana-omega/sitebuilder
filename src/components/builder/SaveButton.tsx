import { Button } from "../ui/button";
import { Save as SaveIcon } from 'lucide-react'

export function SaveButton () {
  return (
    <Button
      variant={"outline"}
      className="gap-2"
      // disabled={loading}
      // onClick={() => {
      //   startTransition(updateFormContent);
      // }}
    >
      <SaveIcon className="h-6 w-6" />
      Save
      {/* {loading && <FaSpinner className="animate-spin" />} */}
    </Button>
  )
}