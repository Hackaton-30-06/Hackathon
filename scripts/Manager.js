'use strict';

class Manager {
  constructor(makeBlocksArr) {
    this.makeBlocksArr = makeBlocksArr;
    this.blocksList = blocksList;
    this.blocksArr = this.makeBlocksArr(this.rerenderBlocks);
  }

  getblocksArr = () => {
      return this.blocksArr;
  }

  rerenderBlocks = () => {
      this.blocksArr = this.makeBlocksArr(this.rerenderBlocks);
      this.blocksList.render(blocksArr);
  }
}