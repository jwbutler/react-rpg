import React, { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import styles from './App.module.css';
import Renderer from './Renderer';
import GameState from './types/GameState';
import Pixel from './types/Pixel';
import Rect from './types/Rect';
import Tile from './types/Tile';
import Unit from './types/Unit';
import { getTileRect } from './utils/geometry';
import { Button, isButtonDown } from './utils/input';

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

const getInitialState = (): GameState => ({
  tiles: initializeTiles(20, 20),
  units: initializeUnits(),
  cameraCoordinates: { x: 0, y: 0 }
});

const App = () => {
  const [state, setState] = useState<GameState>(getInitialState());
  const [selectionStartPoint, setSelectionStartPoint] = useState<Pixel | null>(null);
  const [selectionEndPoint, setSelectionEndPoint] = useState<Pixel | null>(null);
  const [selectionStartTime, setSelectionStartTime] = useState<number | null>(null);
  const [selectedUnits, setSelectedUnits] = useState<Unit[]>([]);
  const { tiles, units, cameraCoordinates } = state;

  const selectionRect: Rect | null = (selectionStartPoint != null)
    ? Rect.fromPoints(selectionStartPoint, selectionEndPoint || selectionStartPoint)
    : null;

  const onTick = (ticks: number) => {
    //console.log(ticks);
  };

  const handleMouseDown = (e: MouseEvent): boolean => {
    if (isButtonDown(e, Button.LEFT)) {
      const pixel = Pixel.fromMouseEvent(e);
      setSelectionStartPoint(pixel);
      setSelectionStartTime(new Date().getTime());
    }
    e.preventDefault();
    return true;
  }

  const handleMouseMove = (e: MouseEvent): boolean => {
    if (isButtonDown(e, Button.LEFT)) {
      setSelectionEndPoint(Pixel.fromMouseEvent(e));
    }
    e.preventDefault();
    return true;
  }

  const handleMouseUp = (e: MouseEvent): boolean => {
    if (selectionRect) {
      setSelectedUnits(units.filter(unit => {
        const boundingRect = getTileRect(unit.coordinates, cameraCoordinates);
        if (new Date().getTime() - (selectionStartTime || 0) <= 100) {
          return Rect.containsRect(boundingRect, selectionRect);
        } else {
          return Rect.containsRect(selectionRect, boundingRect);
        }
      }));
      setSelectionStartPoint(null);
      setSelectionEndPoint(null);
    }
    e.preventDefault();
    return true;
  }

  const handleRightClick = (e: MouseEvent): boolean => {
    e.preventDefault();
    return true;
  }

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
  }, []);

  return (
    <div
      className={styles.app}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove} // TODO DEBOUNCE THIS
      onContextMenu={handleRightClick}
    >
      <Renderer
        tiles={tiles}
        units={units}
        cameraCoordinates={cameraCoordinates}
        selectedUnits={selectedUnits}
        selectionRect={selectionRect}
      />
    </div>
  );
};

export default App;
