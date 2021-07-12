import React from 'react';
import type { MouseEvent } from 'react';
import Coordinates from '../types/Coordinates';
import { getTileRect } from '../utils/geometry';
import styles from './UnitComponent.module.css';
import Unit from '../types/Unit';

type Props = {
  unit: Unit,
  cameraCoordinates: Coordinates
};

const handleRightClick = (e: MouseEvent) => {
  // TODO
};

const UnitComponent = ({ unit, cameraCoordinates }: Props) => {
  const tileRect = getTileRect(unit.coordinates, cameraCoordinates);
  const style = {
    left: tileRect.left,
    top: tileRect.top,
    backgroundColor: unit.color
  };

  const { x, y } = unit.coordinates;
  const className = [styles.unit, [...unit.isSelected ? [styles.selected] : []]].join(' ');
  return (
    <div
      className={className}
      style={style}
      key={`unit_${x}_${y}}`}
      onContextMenu={handleRightClick}
    />
  );
}

export default UnitComponent;
