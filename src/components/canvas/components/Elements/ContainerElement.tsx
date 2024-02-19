import { type ElementInstance, type ElementPayload } from ".";
import { Monitor as ContainerIcon } from 'react-feather'

export const ContainerElement: ElementPayload = {
  build: (id) => ({
    id,
    type: 'Container',
    extraAttributes: {}
  }),
  canvasButtonElement: {
    icon: ContainerIcon,
    label: 'Container'
  },
  type: 'Container',
  designerComponent: CanvasComponent,
  propertiesComponent: () => <div>Propersites Container</div>,
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