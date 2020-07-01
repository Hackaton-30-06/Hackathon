'use strict';

class Block {
  
  constructor(obj) {
    this.itemTemplate = obj.itemTemplate;
    this.content = obj.content;
    this.containerTemplate = obj.containerTemplate;
  }


  create() {
    const item = this.itemTemplate.cloneNode('true');
    const container = this.containerTemplate.cloneNode('true');
    item.textContent = this.content;
    container.appendChild(item);

    this.newTitleButton = container.querySelector('.side-menu__button_type_title');
    
    return container;
  }
}