export class Collider {
  constructor(xOffset, yOffset, width, height, scale) {
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.isTrigger = false;
    this.isStatic = false;
    this.type = 'box';
  }
  
  render(deltaTime, canvas, ctx, x, y) {
    const { xOffset, yOffset, width, scale } = this;
    const xMult = xOffset === 0 ? 1 : xOffset;
    const yMult = yOffset === 0 ? 1 : yOffset;
    ctx.beginPath();
    ctx.strokeStyle = '#00ff00';
    ctx.rect(x + (xMult * scale), y + (yMult * scale), width * scale, this.height * scale);
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = '#000000';
  }
}

export const isPointInBox = (x, y, obj) => {
  const box = {
    left: obj.x + (obj.collider.xOffset * obj.scale),
    right: obj.x + (obj.collider.xOffset * obj.scale) + (obj.collider.width * obj.scale),
    top: obj.y + (obj.collider.yOffset * obj.scale),
    bottom: obj.y + (obj.collider.yOffset * obj.scale) + (obj.collider.height * obj.scale),
  };
  return x < box.right && x > box.left && y < box.bottom && y > box.top;
};

export const doesBoxCollideWith = (obj1, obj2) => {
  const a = {
    left: obj1.x + (obj1.collider.xOffset * obj1.scale),
    right: obj1.x + (obj1.collider.xOffset * obj1.scale) + (obj1.collider.width * obj1.scale),
    top: obj1.y + (obj1.collider.yOffset * obj1.scale),
    bottom: obj1.y + (obj1.collider.yOffset * obj1.scale) + (obj1.collider.height * obj1.scale),
  };
  const b = {
    left: obj2.x + (obj2.collider.xOffset * obj2.scale),
    right: obj2.x + (obj2.collider.xOffset * obj2.scale) + (obj2.collider.width * obj2.scale),
    top: obj2.y + (obj2.collider.yOffset * obj2.scale),
    bottom: obj2.y + (obj2.collider.yOffset * obj2.scale) + (obj2.collider.height * obj2.scale),
  };
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}