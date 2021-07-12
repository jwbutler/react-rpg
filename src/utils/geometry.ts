import Coordinates from '../types/Coordinates';
import Pixel from '../types/Pixel';
import Rect from '../types/Rect';

const getTileRect = (coordinates: Coordinates, cameraCoordinates: Coordinates): Rect => ({
  left: 32 * (coordinates.x - cameraCoordinates.x),
  top: 32 * (coordinates.y - cameraCoordinates.y),
  width: 32,
  height: 32
});

const pixelToCoordinates = (pixel: Pixel, cameraCoordinates: Coordinates): Coordinates => ({
  x: Math.floor(pixel.x / 32 + cameraCoordinates.x),
  y: Math.floor(pixel.y / 32 + cameraCoordinates.y)
});

export { getTileRect, pixelToCoordinates };
