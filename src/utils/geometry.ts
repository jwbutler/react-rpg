import Coordinates from '../types/Coordinates';
import Rect from '../types/Rect';

const getTileRect = (coordinates: Coordinates, cameraCoordinates: Coordinates): Rect => ({
  left: 32 * (coordinates.x - cameraCoordinates.x),
  top: 32 * (coordinates.y - cameraCoordinates.y),
  width: 32,
  height: 32
});

export { getTileRect };
