'use strict';

class BlocksList {
  constructor(container) {
    this.container = container;
  }

  addBlock(blockElement) {
    console.log(blockElement);
    this.container.appendChild(blockElement);
  }

  render(itemsArray) {
    itemsArray.forEach((item) => {
      this.addBlock(item);
    })
  }
}