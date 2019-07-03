import Player from './player';
import {DIRECTION_DELTAS, OBJECTS, CONFIG, HOT_KEYS} from './constants';
import Snake from './snake';
import World from './world';

class Game {
  constructor({
    height,
    isMapInfinite,
    playersAmount,
    root,
    snakeSize,
    snakeSpeed,
    snakeSpeedMultiplier,
    width
  }) {
    this.root = root;
    // TODO: Find a better way of placing snakes on the field
    // TODO: Prevent snake overflowing the field
    this.snake = new Snake({
      initialX: Math.floor(width / 2),
      initialY: Math.floor((height - snakeSize) / 2),
      size: snakeSize,
      speed: snakeSpeed
    });
    this.snakeSpeedMultiplier = snakeSpeedMultiplier;
    this.ticker = null;
    this.world = new World({ isInfinite: isMapInfinite, height, root, width });

    this.updateWorld = this.updateWorld.bind(this);
    this.updateDirection = this.updateDirection.bind(this);
    this.keyDownListener = this.keyDownListener.bind(this);

    this.player = new Player(this.updateDirection, HOT_KEYS[0]);
    this.initController();
  }

  initController() {
    // TODO: Get the player id for the pressed key
    window.addEventListener('keydown', this.keyDownListener);
  }

  keyDownListener(event) {
    this.player.processKeypress(event.key);
  }

  init() {
    this.world.renderSnake(this.snake);

    // TODO: Consider using requestAnimationFrame instead of timeouts
    this.ticker = setTimeout(this.updateWorld, this.snake.speed);
  }

  stop() {
    clearTimeout(this.ticker);
    window.removeEventListener('keydown', this.keyDownListener);
    // window.removeEventListener('keyup', this.keyDownListener);
  }

  updateWorld() {
    const snakeHead = this.snake.head;
    const newX = snakeHead.x + DIRECTION_DELTAS[snakeHead.direction].x;
    const newY = snakeHead.y + DIRECTION_DELTAS[snakeHead.direction].y;

    // TODO: Rearrange into a single if-statement
    if (this.world.isInfinite || (newX >= 0 && newX < this.world.width && newY >= 0 && newY < this.world.height)) {
      const cellCoordinate = newX + newY * this.world.width;

      if ([OBJECTS.SNAKE, OBJECTS.WALL].indexOf(this.world.getCell(newX, newY)) === -1) {
        this.snake.prependNode(snakeHead.direction);
        if (this.world.getCell(newX, newY) === OBJECTS.FOOD) {
          // TODO: Consider different score values base on the food type
          this.player.addScore( 1);
          this.world.updateScore(this.player.score);

          // TODO: Consider different speed delta values base on the food type
          this.snake.increaseSpeed(this.snakeSpeedMultiplier);

          this.world.renderFood();
        } else {
          this.world.setCell(this.snake.tail.x, this.snake.tail.y, OBJECTS.EMPTY);
          this.snake.cutTail();
        }

        this.world.setCell(newX, newY, OBJECTS.SNAKE);
        this.world.renderSnake(this.snake);

        this.ticker = setTimeout(this.updateWorld, this.snake.speed);
      } else {
        this.gameOver();
      }
    } else {
      this.gameOver();
    }
  }

  gameOver() {
    // TODO: Add an ability to restart the game
    this.stop();
    this.world.renderGameOver();
  }

  updateDirection(direction) {
    const snakeHead = this.snake.head;

    // Prevent backward movement
    if (snakeHead.next && (
        snakeHead.next.x !== (DIRECTION_DELTAS[direction].x + snakeHead.x) ||
        snakeHead.next.y !== (DIRECTION_DELTAS[direction].y + snakeHead.y)
    )) {
      snakeHead.direction = direction;
    }
  }
}

export default Game;
