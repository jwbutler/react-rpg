import Coordinates from './Coordinates';

type Controller = 'PLAYER' | 'ENEMY';

type Props = {
  coordinates: Coordinates,
  color: string,
  controller: Controller,
  isSelected?: boolean,
  targetCoordinates?: Coordinates
}

class Unit {
  readonly coordinates: Coordinates;
  readonly color: string;
  readonly controller: Controller;
  readonly isSelected: boolean;
  readonly targetCoordinates: Coordinates | null;

  constructor({ coordinates, color, controller, targetCoordinates, isSelected }: Props) {
    this.coordinates = coordinates;
    this.color = color;
    this.controller = controller;
    this.isSelected = isSelected || false;
    this.targetCoordinates = targetCoordinates || null;
  }
}

namespace Unit {
  export const toString = (unit: Unit) => `Unit${JSON.stringify({
    ...unit,
    coordinates: Coordinates.toString(unit.coordinates)
  })}`;
}

export default Unit;
