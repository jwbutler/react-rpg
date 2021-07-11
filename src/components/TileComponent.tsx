import { useEffect, useState } from 'react';
import Coordinates from '../types/Coordinates';
import Tile from '../types/Tile';
import styles from './TileComponent.module.css';

type TileProps = {
  tile: Tile,
  coordinates: Coordinates,
  cameraCoordinates: Coordinates
};

const TileComponent = ({ tile, coordinates, cameraCoordinates }: TileProps) => {
  const [style, setStyle] = useState({});

  useEffect(
    () => setStyle({
      left: 32 * (coordinates.x - cameraCoordinates.x),
      top: 32 * (coordinates.y - cameraCoordinates.y),
      backgroundColor: tile.color
    }),
    [tile, coordinates, cameraCoordinates]
  );

  return (
    <div
      className={styles.tile}
      style={style}
      key={`tile_${coordinates.x}_${coordinates.y}}`}
    />
  );
};

export default TileComponent;
