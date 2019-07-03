import { DIRECTION_DELTAS } from './constants';

class Snake {
  constructor({ initialDirection = 'up', initialX = 0, initialY = 0, size = 3, speed }) {
    this.head = {
      direction: initialDirection,
      next: null,
      prev: null,
      x: initialX,
      y: initialY
    };
    this.size = 1;
    this.speed = speed;
    this.tail = this.head;

    for (let nodeIndex = 0; nodeIndex < size - 1; nodeIndex++) {
      this.appendNode(initialDirection);
    }
  }

  appendNode(direction) {
    const newNode = {
      direction,
      next: null,
      prev: this.tail,
      x: this.tail.x - DIRECTION_DELTAS[direction].x,
      y: this.tail.y - DIRECTION_DELTAS[direction].y
    };

    this.tail.next = newNode;
    this.tail = newNode;
    this.size += 1;

    return this;
  }

  prependNode(direction) {
    let newX = this.head.x + DIRECTION_DELTAS[direction].x;
    let newY = this.head.y + DIRECTION_DELTAS[direction].y;

    const newNode = {
      direction,
      next: this.head,
      prev: null,
      x: newX >= 0 && newX < 50 ? newX : (newX >= 50 ? 0 : 49),
      y: newY >= 0 && newY < 50 ? newY : (newY >= 50 ? 0 : 49)
    };
    this.head.prev = newNode;
    this.head = newNode;
    this.size += 1;

    return this;
  }

  increaseSpeed(speedDelta) {
    // TODO: think of better speed incrementation, eg. multiplication
    this.speed *= speedDelta;
  }

  cutTail() {
    this.tail = this.tail.prev;
    this.tail.next = null;
    this.size -= 1;

    return this;
  }
}

export default Snake;
