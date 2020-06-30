'use strict';

class BlocksList {
  constructor(container) {
    this.container = container;
  }

  addBlock(blockElement) {
    this.container.appendChild(blockElement);
  }

  render(itemsArray) {
    itemsArray.forEach((item) => {
      this.addBlock(item);
    })
  }
}