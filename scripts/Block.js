'use strict';

class Block {
  
  constructor(obj) {
    this.blockItem = obj.blockItem;
    this.content = obj.content;
    this.container = obj.container;
  }


  create() {
    this.blockItem.textContent = this.content;
    this.blockItem.textContent = this.content;
    this.container.appendChild(this.blockItem);
    return this.container;
  }
}