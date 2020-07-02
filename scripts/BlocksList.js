'use strict';

class BlocksList {
  constructor(container) {
    this.container = container;
  }

  addBlock(blockElement) {
    this.container.appendChild(blockElement);
  }
  
  addNewBlock(id,type,content) {
    this.container.insertBefore({type,content},this.container[id])

  }

  render(itemsArray) {
    itemsArray.forEach((item) => {
      this.addBlock(item);
    })
  }
}