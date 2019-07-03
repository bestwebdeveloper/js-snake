export const HOT_KEYS = [
  {
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
    up: 'ArrowUp'
  }, {
    down: 's',
    left: 'a',
    right: 'd',
    up: 'w'
  }
];

export const DIRECTION_DELTAS = {
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  up: { x: 0, y: -1 }
};

export const OBJECTS = {
  EMPTY: 0,
  WALL: 1,
  SNAKE: 2,
  FOOD: 3
};

export const CONFIG = {
  HEIGHT: 50,
  IS_MAP_INFINITE: false,
  SNAKE_SIZE: 3,
  SNAKE_SPEED: 300,
  SNAKE_SPEED_MULTIPLIER: 0.9,
  WIDTH: 50
};
