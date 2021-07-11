import { MouseEvent } from 'react';

enum Button {
  LEFT = 1,
  RIGHT = 2,
  MIDDLE = 3
}

const isButtonDown = (e: MouseEvent, button: Button) => {
  return (e.buttons & (1 << (button - 1))) > 0;
}

export { Button, isButtonDown };
