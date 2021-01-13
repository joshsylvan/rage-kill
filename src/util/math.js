Math.distance = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

Math.moveTowards = (targetX, targetY, currentX, currentY, speed) => {
  const angle = Math.atan2(targetY - currentY, targetX - currentX);
  return {
    x: currentX + (Math.cos(angle) * speed),
    y: currentY + (Math.sin(angle) * speed),
  };
};