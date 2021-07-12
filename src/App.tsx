import React, { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import styles from './App.module.css';
import Renderer from './Renderer';
import Coordinates from './types/Coordinates';
import Pixel from './types/Pixel';
import Rect from './types/Rect';
import Tile from './types/Tile';
import Unit from './types/Unit';
import { getTileRect, pixelToCoordinates } from './utils/geometry';
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
  const playerUnit = new Unit({
    coordinates: { x: 5, y: 5 },
    color: '#FFFFFF',
    controller: 'PLAYER'
  });

  return [playerUnit];
}

const App = () => {
  const [tiles, setTiles] = useState<Tile[][]>(initializeTiles(20, 20));
  const [units, setUnits] = useState<Unit[]>(initializeUnits());
  const [cameraCoordinates, setCameraCoordinates] = useState<Coordinates>(Coordinates.ZERO);
  const [selectionStartPoint, setSelectionStartPoint] = useState<Pixel | null>(null);
  const [selectionEndPoint, setSelectionEndPoint] = useState<Pixel | null>(null);
  const [selectionStartTime, setSelectionStartTime] = useState<number | null>(null);

  const selectionRect: Rect | null = (selectionStartPoint != null)
    ? Rect.fromPoints(selectionStartPoint, selectionEndPoint || selectionStartPoint)
    : null;

  const onTick = (ticks: number) => {
    // WTF typescript?
    setUnits(units => units.map(unit =>
      ({
        ...unit,
        coordinates: unit.targetCoordinates || unit.coordinates,
        targetCoordinates: null
      })
    ));
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
      setUnits(units.map(unit => {
        const boundingRect = getTileRect(unit.coordinates, cameraCoordinates);
        let isSelected: boolean;
        if (new Date().getTime() - (selectionStartTime || 0) <= 100) {
          isSelected = Rect.containsRect(boundingRect, selectionRect);
        } else {
          isSelected = Rect.containsRect(selectionRect, boundingRect);
        }

        const updatedUnit: Unit = {
          ...unit,
          isSelected
        };

        return updatedUnit;
      }));
      setSelectionStartPoint(null);
      setSelectionEndPoint(null);
    }
    e.preventDefault();
    return true;
  }

  const handleRightClick = (e: MouseEvent): boolean => {
    const pixel = Pixel.fromMouseEvent(e);
    const coordinates = pixelToCoordinates(pixel, cameraCoordinates);
    const updatedUnits: Unit[] = [];
    for (const unit of units) {
      if (unit.isSelected) {
        updatedUnits.push({ ...unit, targetCoordinates: coordinates });
      } else {
        updatedUnits.push(unit);
      }
    }
    setUnits(updatedUnits);
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
        selectionRect={selectionRect}
      />
    </div>
  );
};

export default App;
