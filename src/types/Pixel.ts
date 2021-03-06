import type { MouseEvent } from 'react';

type Pixel = {
  readonly x: number,
  readonly y: number
};

namespace Pixel {
  // TODO double check this
  export const fromMouseEvent = (e: MouseEvent): Pixel => ({
    x: e.clientX,
    y: e.clientY
  });

  export const toString = (pixel: Pixel) => `Pixel${JSON.stringify(pixel)}`;
}

export default Pixel;
