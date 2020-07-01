'use strict';

class Block {
  
  constructor(obj) {
    this.itemTemplate = obj.itemTemplate;
    this.content = obj.block.content;
    this.id = obj.block.id;
    this.containerTemplate = obj.containerTemplate;
    this.state = obj.state;
  }


  create() {
    this.item = this.itemTemplate.cloneNode('true');
    this.container = this.containerTemplate.cloneNode('true');
    this.deleteButton = this.container.querySelector('.side-menu__button_type_delete');

    this.item.textContent = this.content;
    this.item.dataset.id = this.id;
    this.container.appendChild(this.item);

    this.newTitleButton = this.container.querySelector('.side-menu__button_type_title');
    this.setEventListeners();
    return this.container;
  }

  blurHandler = (evt) => {
    const id = evt.target.dataset.id,
      content = evt.target.textContent;

    this.state.setBlockContent(id, content);
  }

  handlerDelete = (evt) => {
    // this.removeEventListeners();
    const itemID = evt.target.closest('.block-container').querySelector('.item').dataset.id;
    this.state.deleteBlock(itemID);
    this.container.remove();
  }

  setEventListeners() {
    this.item.addEventListener('blur', this.blurHandler);
    this.deleteButton.addEventListener('click', this.handlerDelete)
  }
}