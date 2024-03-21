class Canvas {
  dotList = [];
  canvas;

  constructor(mountedDOM, canvasId, width, height) {
    this.canvas = document.createElement("canvas");
    this.canvas.id = canvasId;
    this.canvas.width = width;
    this.canvas.height = height;

    if (mountedDOM instanceof HTMLCanvasElement) {
      mountedDOM.appendChild(this.canvas);
    } else if (typeof mountedDOM === "string") {
      if (!mountedDOM.startsWith("#")) {
        throw new Error("传入的id必须以#开头！");
      }
      const parentNode = document.querySelector(mountedDOM);
      if (parentNode) {
        parentNode.appendChild(this.canvas);
      }
    }

    this.canvas.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX - this.canvas.getBoundingClientRect().left;
      const mouseY = e.clientY - this.canvas.getBoundingClientRect().top;
      this.dotList.forEach((dot) => dot.isMounseInside(mouseX, mouseY));
    });
  }

  addDot(x, y, radius, style) {
    const ctx = this.canvas.getContext("2d");
    const newDot = new Dot(ctx, x, y, radius, style);
    this.dotList.push(newDot);
  }
}

class Dot {
  x;
  y;
  radius;
  style;
  color;
  random;

  constructor(ctx, x, y, radius, style) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = style.color;
    this.draw(ctx);
    this.random = Math.floor(Math.random() * 1000);
  }

  draw(ctx) {
    if (ctx instanceof CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  }

  isMounseInside(mouseX, mouseY) {
    const distance = Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2);
    if (distance < this.radius) {
      console.log(`在实例圆${this.random}内`);
    }
    return distance < this.radius;
  }
}
