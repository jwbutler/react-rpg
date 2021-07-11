import React from 'react';
import type { MouseEvent } from 'react';
import Coordinates from '../types/Coordinates';
import { getTileRect } from '../utils/geometry';
import styles from './UnitComponent.module.css';
import Unit from '../types/Unit';

type Props = {
  unit: Unit,
  cameraCoordinates: Coordinates,
  isSelected: boolean
};

const handleRightClick = (e: MouseEvent) => { console.log(e); return true; };

const UnitComponent = ({ unit, cameraCoordinates, isSelected }: Props) => {
  const tileRect = getTileRect(unit.coordinates, cameraCoordinates);
  const style = {
    left: tileRect.left,
    top: tileRect.top,
    backgroundColor: unit.color
  };

  const { x, y } = unit.coordinates;
  const className = [styles.unit, [...isSelected ? [styles.selected] : []]].join(' ');
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
