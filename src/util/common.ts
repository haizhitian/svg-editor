import { FElement } from "../element/baseElement"
import { Box, IBox } from "../element/box"
import { FSVG } from "../element/index"

export function isVaildColorVal() {
  // TODO:
  // 1. all color brower supported
  // 2. #fff and #f0f0f0
  // 3. rgb(x,x,x)
  // ...
}

export function getElementsInBox(box: IBox, parent: SVGElement) {
  const tagNameForbidList = ['g']
  box = new FSVG.Box(box)
  const elsInBox: Array<FElement> = []

  function r(box: Box, parent: SVGElement) {
    const elements = parent.children
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i] // FSVG.create(elements[i])

      if (!tagNameForbidList.includes(el.tagName)) {
        const bbox = (el as SVGGraphicsElement).getBBox()
        if (box.contains(bbox)) {
          elsInBox.push( FSVG.create(el as SVGElement))
        }
      }

      if (el.children.length > 0) r(box, el as SVGElement)
    }
  }
  r(box as Box, parent)
  return elsInBox
}

export function uniq(arr: any[]) {
  return Array.from(new Set(arr))
}