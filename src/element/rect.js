
/**
 * 对 rect 元素的简单封装
 */

import { NS } from "../constants"
import { FElement } from "./baseElement"

export class Rect extends FElement {
  // constructor(x: number, y: number, w: number, h: number);
  // constructor(el: SVGElement);
  constructor(x, y, w, h) {
    super()
    if (typeof x == 'object') {
      this.el_ = x
    } else {
      this.el_ = document.createElementNS(NS.SVG, 'rect')
      this.el_.setAttr('x', x)
      this.el_.setAttr('y', y)
      this.el_.setAttr('width', w)
      this.el_.setAttr('height', h)
    }
  }
  getPos() {
    const x = parseFloat(this.getAttr('x'))
    const y = parseFloat(this.getAttr('y'))
    return { x, y }
  }
  dmove(dx, dy) {
    const pos = this.getPos()
    this.setAttr('x', pos.x + dx)
    this.setAttr('y', pos.y + dy)
  }
}