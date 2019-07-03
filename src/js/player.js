import { HOT_KEYS } from './constants';

class Player {
  // score
  // allowedKeys
  constructor(updateDirectionFunction, hotKeys) {
    this.score = 0;
    this.hotKeys = hotKeys;
    this.updateDirectionFunction = updateDirectionFunction;
  }

  processKeypress(key) {
    const direction = Object.keys(this.hotKeys).find((direction) => this.hotKeys[direction] === key);

    if (direction) {
      this.updateDirectionFunction(direction);
    }
  }

  addScore(score) {
    this.score += score;
  }

  getScore() {
    return this.score;
  }

  switchOff() {
    window.removeEventListener('keydown');
    window.removeEventListener('keyup');
  }
}

export default Player;
