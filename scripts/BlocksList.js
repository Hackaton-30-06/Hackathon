"use strict";

class BlocksList {
  constructor(container, makeBlocksArr) {
    this.container = container;
    this.makeBlocksArr = makeBlocksArr;
    this.blocksArr = this.makeBlocksArr(this.rerenderBlocks);
  }

  addBlock(blockElement) {
    this.container.appendChild(blockElement);
  }

  addNewBlock(id, type, content) {
    this.container.insertBefore({ type, content }, this.container[id]);
  }

  render(itemsArray) {
    itemsArray.forEach((item) => {
      this.addBlock(item);
    });
  }

  getblocksArr = () => {
    return this.blocksArr;
  };

  rerenderBlocks = () => {
    this.blocksArr = this.makeBlocksArr(this.rerenderBlocks);
    this.container.innerHTML = "";
    this.render(this.blocksArr);
  };
}
