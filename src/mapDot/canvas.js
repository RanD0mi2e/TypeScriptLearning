class Canvas {
  dotList = []
  canvas

  constructor(mountedDOM, canvasId, width, height) {
    this.canvas = document.createElement('canvas')
    this.canvas.id = canvasId
    this.canvas.width = width
    this.canvas.height = height

    if(mountedDOM instanceof HTMLCanvasElement) {
      mountedDOM.appendChild(this.canvas)
    } else if(typeof mountedDOM === 'string') {
      if(!mountedDOM.startsWith('#')) {
        throw new Error('传入的id必须以#开头！')
      }
      const parentNode = document.querySelector(mountedDOM)
      if(parentNode) {
        parentNode.appendChild(this.canvas)
      }
    }
  }
}

class Dot {}