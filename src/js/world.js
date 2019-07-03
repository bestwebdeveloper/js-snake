import { OBJECTS } from './constants';

class World {
  constructor({ height, isInfinite, root, width }) {
    this.height = height;
    this.isInfinite = isInfinite;
    this.map = [];
    this.width = width;

    this.initLayout(root);
  }

  createBlock(type, classes) {
    const block = document.createElement('div');

    block.className = classes;

    return block;
  }

  initLayout(root) {
    this.fieldsLayer = this.createBlock('div', 'fields-layer');
    this.snakeLayer = this.createBlock('div', 'snake-layer');
    this.foodLayer = this.createBlock('div', 'food-layer');
    this.scoreLayer = this.createBlock('div', 'score-layer');
    this.fadeLayer = this.createBlock('div', 'fade-layer');

    this.fieldsLayer.appendChild(this.generateField());

    root.appendChild(this.fieldsLayer);
    root.appendChild(this.snakeLayer);
    root.appendChild(this.foodLayer);
    root.appendChild(this.scoreLayer);
    root.appendChild(this.fadeLayer);

    this.updateScore();
    this.renderFood();
  }

  renderSnake(snake) {
    // TODO: Make the update incremental
    this.cleanLayer(this.snakeLayer);

    let node = snake.head;

    while (node) {
      const x = 2 + node.x * 10;
      const y = 2 + node.y * 10;
      const block = this.createBlock('div', `snake-block ${node === snake.head ? 'snake-block-head' : ''}`);

      this.setCell(node.x, node.y, OBJECTS.SNAKE);

      block.style.top = `${y}px`;
      block.style.left = `${x}px`;

      this.snakeLayer.appendChild(block);

      node = node.next;
    }
  }

  renderFood() {
    const emptyCells = this.map.reduce((emptyCellsAcc, cell, index) => {
      if (cell === OBJECTS.EMPTY) {
        emptyCellsAcc.push(index);
      }

      return emptyCellsAcc;
    }, []);
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const x = randomCell % this.height;
    const y = Math.floor(randomCell / this.height);

    this.setCell(x, y, OBJECTS.FOOD);

    const block = this.createBlock('div', 'food-block');

    block.style.top = `${2 + y * 10}px`;
    block.style.left = `${2 + x * 10}px`;

    this.cleanLayer(this.foodLayer);
    this.foodLayer.appendChild(block);
  }

  updateScore(score = 0) {
    this.scoreLayer.innerText = `Score: ${score}`
  }

  renderGameOver() {
    this.fadeLayer.style.visibility = 'visible';
    this.fadeLayer.innerText = 'Game Over';
  }

  cleanLayer(layer) {
    while (layer.firstChild) {
      layer.removeChild(layer.firstChild);
    }
  }

  generateField() {
    const fields = document.createDocumentFragment();

    for (let x = 0; x < this.width; x++) {
      const row = document.createElement('div');
      row.className = 'field-row';

      for (let y = 0; y < this.height; y++) {
        this.setCell(x, y, OBJECTS.EMPTY);

        const cell = document.createElement('div');
        cell.className = `field field-${x}-${y}`;

        row.appendChild(cell);
      }

      fields.appendChild(row);
    }

    return fields;
  }

  getCell(x, y) {
    return this.map[x + y * this.width];
  }

  setCell(x, y, objectType) {
    this.map[x + y * this.width] = objectType;
  }
}

export default World;
