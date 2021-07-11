import React, { useEffect, useState } from 'react';
import Coordinates from '../types/Coordinates';
import styles from './UnitComponent.module.css';
import Unit from '../types/Unit';

type Props = {
  unit: Unit,
  cameraCoordinates: Coordinates
};

const UnitComponent = ({ unit: { color, coordinates }, cameraCoordinates }: Props) => {
  const [style, setStyle] = useState({});

  useEffect(
    () => setStyle({
      left: 32 * (coordinates.x - cameraCoordinates.x),
      top: 32 * (coordinates.y - cameraCoordinates.y),
      backgroundColor: color
    }),
    [color, coordinates, cameraCoordinates]
  );
  return (
    <div
      className={styles.unit}
      style={style}
      key={`unit_${coordinates.x}_${coordinates.y}}`}
    />
  );
}

export default UnitComponent;
