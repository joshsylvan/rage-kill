export class Animator {
  constructor(img) {
    this.animations = {};
    this.currentAnimation = null;
    this.state = null;
    this.currentTime = 0;
    this.currentFrame = 0;
    this.isActive = false;
    this.img = img;
  }

  addAnimation(name, animation) {
    this.animations[name] = animation;
  }

  setActive(isActive) { this.isActive = isActive; }
  setCurrentTime(currentTime) { this.currentTime = currentTime; }
  getCurrentAnimation() { return this.currentAnimation; }
  hasAnimationFinished() {
    const anim = this.animations[this.currentAnimation];
    if (anim.isLoop) return false;
    return this.currentFrame === anim.frameCount;
  }

  setAnimation(name) {
    if (name === this.currentAnimation) return;
    this.currentAnimation = name;
    this.currentTime = 0;
    this.currentFrame = 0;
  }

  render(deltaTime, canvas, ctx, xPos, yPos, scale) {
    const {
      x,
      y,
      tileWidth,
      tileHeight,
      frameDuration,
      frameCount,
      isLoop,
    } = this.animations[this.currentAnimation];
    if (!this.isActive) return;

    if (this.currentFrame === frameCount && !isLoop) {

    } else {
      this.currentTime += deltaTime;
      if (this.currentTime >= frameDuration) {
        const leftOverTime = this.currentTime - frameDuration;
        this.currentTime = leftOverTime;
        this.currentFrame++;
        if (this.currentFrame > frameCount) this.currentFrame = 0;
      }
    }


    ctx.drawImage(
      this.img,
      x + (this.currentFrame * tileWidth),
      y,
      tileWidth,
      tileHeight,
      xPos,
      yPos,
      tileWidth * scale,
      tileHeight * scale,
    );
  }
}

export class Animation {
  constructor(x, y, tileWidth, tileHeight, frameCount, frameDuration, isLoop) {
    this.x = x;
    this.y = y;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.frameCount = frameCount;
    this.frameDuration = frameDuration;
    this.loop = true;
    this.next = null;
    this.isLoop = isLoop;
  }
}