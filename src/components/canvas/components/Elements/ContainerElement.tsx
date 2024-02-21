import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { type ElementInstance, type ElementPayload } from "."
import { Monitor as ContainerIcon } from 'react-feather'
import { useForm } from "react-hook-form"
import { Slider } from "~/components/ui/slider"
import { useEffect } from "react"
import { useCanvas } from "../../context/useCanvas"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const extraAttributes = {
  height: 200
}

type CustomInstance = ElementInstance & {
  extraAttributes: typeof extraAttributes
}

const propertiesSchema = z.object({
  height: z.number().min(200).max(1000)
})

type PropertiesSchemaType = z.infer<typeof propertiesSchema>

export const ContainerElement: ElementPayload = {
  build: (id) => ({
    id,
    type: 'Container',
    extraAttributes
  }),
  canvasButtonElement: {
    icon: ContainerIcon,
    label: 'Container'
  },
  type: 'Container',
  designerComponent: CanvasComponent,
  propertiesComponent: PropertiesComponent,
  elementComponent: () => <div>Element Container</div>,
}

function CanvasComponent ({
  element
}: { element: ElementInstance }) {
  return (
    <div>
      Teste
    </div>
  )
}

function PropertiesComponent ({ elementInstance }: { elementInstance: ElementInstance }) {
  const { updateElement } = useCanvas()

  const element = elementInstance as CustomInstance

  const form = useForm({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      height: element.extraAttributes.height
    },
  })

  useEffect(() => {
    form.reset(element.extraAttributes)
  }, [element, form])

  function applyChanges(values: PropertiesSchemaType) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        height: values.height
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name='height'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height(px): {form.watch('height')}</FormLabel>
              <FormControl className="pt-2">
                <Slider
                  defaultValue={[field.value]}
                  min={200}
                  max={1000}
                  step={1}
                  onValueChange={(value) => {
                    field.onChange(value[0])
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        >
        </FormField>
      </form>
    </Form>
  )
}