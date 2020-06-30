'use strict';

class Block {
  
  constructor(obj) {
    this.blockItem = obj.blockItem;
    this.content = obj.content;
  }


  create() {
    this.blockItem.textContent = this.content;
    return this.blockItem;
  }
}