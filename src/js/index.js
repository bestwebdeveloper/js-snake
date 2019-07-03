import Game from './game';
import { CONFIG } from './constants';

import '!file-loader?name=[name].[ext]!../favicon.ico';

import '../css/normalize.css';
import '../css/main.css';

const root = document.getElementById('app');
const game = new Game({
  height: CONFIG.HEIGHT,
  isMapInfinite: CONFIG.IS_MAP_INFINITE,
  root: root,
  snakeSize: CONFIG.SNAKE_SIZE,
  snakeSpeed: CONFIG.SNAKE_SPEED,
  snakeSpeedMultiplier: CONFIG.SNAKE_SPEED_MULTIPLIER,
  width: CONFIG.WIDTH
});

window.onload = () => game.init();

