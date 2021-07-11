import React from 'react';
import GridComponent from './components/GridComponent';
import UnitComponent from './components/UnitComponent';
import Coordinates from './types/Coordinates';
import Tile from './types/Tile';
import Unit from './types/Unit';

type Props = {
  cameraCoordinates: Coordinates,
  tiles: Tile[][];
  units: Unit[];
};

const Renderer = ({ cameraCoordinates, tiles, units }: Props) => (
  <>
    <GridComponent
      cameraCoordinates={cameraCoordinates}
      tiles={tiles}
    />
    {units.map(unit => (
      <UnitComponent
        unit={unit}
        cameraCoordinates={cameraCoordinates}
      />
    ))}
  </>
);

export default Renderer;
