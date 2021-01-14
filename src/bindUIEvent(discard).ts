import Editor from './Editor'

function bindUIEvent(editor: Editor) {
  function activeBtn(name: string) {
    const selector = ({
      select: 'btn-select',
      addRect: 'btn-add-rect',
      dragCanvas: 'btn-drag-canvas',
      pencil: 'btn-pencil',
      addPath: 'btn-add-path',
      zoom: 'btn-zoom',
    } as {[key: string]: string})[name]
    if (name === undefined) return

    const toolBar = document.querySelector('#tool-bar')
    const toolBtns = Array.prototype.slice.call(toolBar.children)
    toolBtns.forEach((item: Element) => {
      item.classList.remove('active')
    })
    document.getElementById(selector).classList.add('active')
  }


  editor.toolManager.onSwitchTool((name: string) => {
    console.log('switched tool:', name)
    activeBtn(name)
  })


  function bindClickHandler(selector: string, fn: GlobalEventHandlers['onclick']) {
    const el: HTMLElement = document.querySelector(selector)
    el.onclick = fn
  }
  // undo
  bindClickHandler('#btn-undo', () => { editor.executeCommand('undo') })
  // redo
  bindClickHandler('#btn-redo', () => { editor.executeCommand('redo') })
  // zoomIn
  bindClickHandler('#btn-zoom-in', () => { editor.viewport.zoomIn() })
  // zoomOut
  bindClickHandler('#btn-zoom-out', () => { editor.viewport.zoomOut() })

  // addRect tool
  bindClickHandler('#btn-add-rect', () => { editor.setCurrentTool('addRect') })
  // dragcanvas tool
  bindClickHandler('#btn-drag-canvas', () => { editor.setCurrentTool('dragCanvas') })
  // pencil
  bindClickHandler('#btn-pencil', () => { editor.setCurrentTool('pencil') })
  // add-path
  bindClickHandler('#btn-add-path', () => { editor.setCurrentTool('addPath') })
  // select
  bindClickHandler('#btn-select', () => { editor.setCurrentTool('select') })
  // zoom
  bindClickHandler('#btn-zoom', () => { editor.setCurrentTool('zoom') })

  // delete selected elements
  bindClickHandler('#btn-delete', () => {
    if (editor.activedElsManager.isNoEmpty()) {
      editor.executeCommand('removeElements')
    }
  })
  // front elements
  bindClickHandler('#btn-front', () => {
    if (editor.activedElsManager.isNoEmpty()) {
      editor.executeCommand('front')
    }
  })
  bindClickHandler('#btn-forward', () => {
    if (editor.activedElsManager.isNoEmpty()) {
      editor.executeCommand('forward')
    }
  })
  bindClickHandler('#btn-backward', () => {
    if (editor.activedElsManager.isNoEmpty()) {
      editor.executeCommand('backward')
    }
  })
  bindClickHandler('#btn-back', () => {
    if (editor.activedElsManager.isNoEmpty()) {
      editor.executeCommand('back')
    }
  })

  // fill value control
  const fillTextNode = document.querySelector('#element-info-fill')
  fillTextNode.innerHTML = editor.setting.get('fill')
  editor.setting.on('fill', (val: string) => {
    fillTextNode.innerHTML = val
  })
  bindClickHandler('#set-fill-btn', () => {
    const fill = window.prompt('Please input valid color value（like #ffce43）', editor.setting.get('fill'))
    if (!fill) return
    fillTextNode.innerHTML = fill

    editor.setting.setFill(fill)
    editor.activedElsManager.setElsAttr('fill', fill)
  })
  // stroke value control
  const strokeTextNode = document.querySelector('#element-info-stroke')
  strokeTextNode.innerHTML = editor.setting.get('stroke')
  editor.setting.on('stroke', (val: string) => {
    strokeTextNode.innerHTML = val
  })
  bindClickHandler('#set-stroke-btn', () => {
    const stroke = window.prompt('Please input valid color value（like #ffce43）', editor.setting.get('stroke'))
    if (!stroke) return
    strokeTextNode.innerHTML = stroke

    editor.setting.setStroke(stroke)
    editor.activedElsManager.setElsAttr('stroke', stroke)
  })
  // stroke-width value control
  const strokeWidthTextNode = document.querySelector('#element-info-stroke-width')
  strokeWidthTextNode.innerHTML = editor.setting.get('stroke-width')
  editor.setting.on('stroke-width', (val: string) => {
    strokeWidthTextNode.innerHTML = val
  })
  bindClickHandler('#set-stroke-width-btn', () => {
    const strokeWidth = window.prompt('Please input value(like 6px)', editor.setting.get('stroke-width'))
    if (!strokeWidth) return
    strokeWidthTextNode.innerHTML = strokeWidth

    editor.setting.set('stroke-width', strokeWidth)
    editor.activedElsManager.setElsAttr('stroke-width', strokeWidth)
  })

  // register shortcut
  editor.shortcut.register('Undo', 'Cmd+Z', () => {
    editor.executeCommand('undo')
  })
  editor.shortcut.register('Undo', 'Ctrl+Z', () => {
    editor.executeCommand('undo')
  })
  editor.shortcut.register('Redo', 'Cmd+Shift+Z', () => {
    editor.executeCommand('redo')
  })
  editor.shortcut.register('Redo', 'Ctrl+Shift+Z', () => {
    editor.executeCommand('redo')
  })
  editor.shortcut.register('Delete', 'Backspace', () => {
    if (editor.activedElsManager.isNoEmpty()) {
      editor.executeCommand('removeElements')
    }
  })
  document.querySelector('#shortcut').innerHTML = editor.shortcut.formatPrint()
}

export default bindUIEvent