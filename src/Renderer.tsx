import React from 'react';
import GridComponent from './components/GridComponent';
import SelectionRectComponent from './components/SelectionRectComponent';
import UnitComponent from './components/UnitComponent';
import Coordinates from './types/Coordinates';
import Rect from './types/Rect';
import Tile from './types/Tile';
import Unit from './types/Unit';

type Props = {
  cameraCoordinates: Coordinates,
  tiles: Tile[][];
  units: Unit[];
  selectedUnits: Unit[];
  selectionRect: Rect | null
};

const Renderer = ({ cameraCoordinates, tiles, units, selectedUnits, selectionRect }: Props) => (
  <>
    <GridComponent
      cameraCoordinates={cameraCoordinates}
      tiles={tiles}
    />
    {units.map(unit => (
      <UnitComponent
        unit={unit}
        cameraCoordinates={cameraCoordinates}
        isSelected={selectedUnits.includes(unit)}
      />
    ))}
    {selectionRect && <SelectionRectComponent rect={selectionRect} />}
  </>
);

export default Renderer;
