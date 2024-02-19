import type React from "react";
import { ContainerElement } from "./ContainerElement";

export type ElementsType =
  | "Container"

export type ElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, unknown>
}

export type ElementPayload = {
  build: (id: string) => ElementInstance
  canvasButtonElement: {
    icon: React.ElementType
    label: string
  }

  type: ElementsType
  designerComponent: React.FC<{
    element: ElementInstance
  }>
  elementComponent: React.FC
  propertiesComponent: React.FC
}

type ElementsObj = {
  [key in ElementsType]: ElementPayload
}

export const Elements: ElementsObj = {
  Container: ContainerElement
}
