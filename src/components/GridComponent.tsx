import Coordinates from '../types/Coordinates';
import Tile from '../types/Tile';
import TileComponent from './TileComponent';

type Props = {
  tiles: Tile[][],
  cameraCoordinates: Coordinates
}

const GridComponent = ({ tiles, cameraCoordinates }: Props) => (
  <>
    {tiles.flatMap((row, y) =>
      row.flatMap((tile, x) => (
        <TileComponent
          coordinates={{x, y}}
          cameraCoordinates={cameraCoordinates}
          tile={tile}
        />
      ))
    )}
  </>
);

export default GridComponent;
