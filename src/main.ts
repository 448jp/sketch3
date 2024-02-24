import "./style.css"
import { Stage } from "./world/stage.ts"

new Stage({
  element: document.querySelector<HTMLDivElement>('#main')!,
})
