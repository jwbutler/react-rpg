type Rect = {
  left: number,
  top: number,
  width: number,
  height: number
};

type Point = {
  x: number,
  y: number
}

namespace Rect {
  export const fromPoints = (first: Point, second: Point) => ({
    left: Math.min(first.x, second.x),
    top: Math.min(first.y, second.y),
    width: Math.abs(first.x - second.x),
    height: Math.abs(first.y - second.y),
  })

  export const containsPoint = (rect: Rect, point: Point) => {
    return point.x >= rect.left
      && point.y >= rect.top
      && point.x < (rect.left + rect.width)
      && point.y < (rect.top + rect.height);
  }

  export const containsRect = (parent: Rect, child: Rect) => {
    return child.left >= parent.left
      && child.top >= parent.top
      && (child.left + child.width) <= (parent.left + parent.width)
      && (child.top + child.height) <= (parent.top + parent.height);
  }

  export const toString = (rect: Rect) => `Rect${JSON.stringify(rect)}`;
}

export default Rect;
