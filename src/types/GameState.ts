import Coordinates from './Coordinates';
import Tile from './Tile';
import Unit from './Unit';

type GameState = {
  tiles: Tile[][],
  units: Unit[],
  cameraCoordinates: Coordinates
};

export default GameState;
