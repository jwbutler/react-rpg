type Coordinates = {
  readonly x: number;
  readonly y: number;
};

namespace Coordinates {
  export const equals = (first: Coordinates, second: Coordinates) =>
    first.x === second.x
    && first.y === second.y;

  export const toString = (coordinates: Coordinates) => `Coordinates${JSON.stringify(coordinates)}`;

  export const ZERO: Coordinates = { x: 0, y: 0 };
}

export default Coordinates;
