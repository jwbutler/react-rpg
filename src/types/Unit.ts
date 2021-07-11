import Coordinates from './Coordinates';

type Controller = 'PLAYER' | 'ENEMY';

type Unit = {
  coordinates: Coordinates,
  color: string,
  controller: Controller
};

export default Unit;
