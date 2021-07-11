import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import Renderer from './Renderer';
import Coordinates from './types/Coordinates';
import Tile from './types/Tile';
import Unit from './types/Unit';

const initializeTiles = (width: number, height: number): Tile[][] => {
  const tiles: Tile[][] = [];
  for (let y = 0; y < height; y++) {
    tiles[y] = [];
    for (let x = 0; x < width; x++) {
      const color = `rgb(${y * 4 % 256},${x * 4 % 256},${(x + y) * 4 % 256})`;
      tiles[y][x] = { color };
    }
  }
  return tiles;
}

const initializeUnits = (): Unit[] => {
  const playerUnit: Unit = {
    color: '#FFFFFF',
    coordinates: { x: 5, y: 5 },
    controller: 'PLAYER'
  };

  return [playerUnit];
}

const App = () => {
  const [tiles, setTiles] = useState<Tile[][]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [cameraCoordinates, setCameraCoordinates] = useState<Coordinates>({ x: 0, y: 0 });

  const onTick = (ticks: number) => {
    console.log(ticks);
  };

  useEffect(() => {
    setTiles(initializeTiles(20, 20));
  }, []);

  useEffect(() => {
    setUnits(initializeUnits());
  }, []);

  useEffect(() => {
    let ticks = 0;
    const intervalId = setInterval(() => {
      onTick(ticks);
      ticks++;
    }, 200);

    // cleanup function
    return () => {
      clearInterval(intervalId);
    }
  });

  return (
    <div className={styles.app}>
      <Renderer
        tiles={tiles}
        units={units}
        cameraCoordinates={cameraCoordinates}
      />
    </div>
  );
};

export default App;
