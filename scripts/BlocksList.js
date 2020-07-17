"use strict";

class BlocksList {
  constructor(container, makeItemsArr) {
    this.container = container;
    this.makeItemsArr = makeItemsArr;
    this.blocksArr = this.makeItemsArr(this.rerender);
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

  rerender = () => {
    this.blocksArr = this.makeItemsArr(this.rerender);
    this.container.innerHTML = "";
    this.render(this.blocksArr);
  };
}
