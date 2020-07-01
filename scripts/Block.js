'use strict';

class Block {
  
  constructor(obj) {
    this.itemTemplate = obj.itemTemplate;
    this.content = obj.block.content;
    this.id = obj.index + 1;
    this.containerTemplate = obj.containerTemplate;
    this.state = obj.state;
    this.rerenderFunction = obj.rerenderFunction;
    this.blocklist = obj.blocksList
    console.log(obj)
  }


  create() {
    this.item = this.itemTemplate.cloneNode('true');
    this.container = this.containerTemplate.cloneNode('true');
    this.deleteButton = this.container.querySelector('.side-menu__button_type_delete');
    this.addTitleButton = this.container.querySelector('.side-menu__button_type_title');
    this.addTextButton = this.container.querySelector('.side-menu__button_type_text');
    this.moveButton = this.container.querySelector('.side-menu__button_type_move');

    this.item.textContent = this.content;
    this.item.dataset.id = this.id;
    this.container.appendChild(this.item);

    this.setEventListeners();
    return this.container;
  }

  blurHandler = (evt) => {
    
    const id = evt.target.dataset.id,
      content = evt.target.textContent;
      console.log(id)

    this.state.setBlockContent(id, content);
  }

  handlerDelete = (evt) => {
    // this.removeEventListeners();
    const itemID = evt.target.closest('.block-container').querySelector('.item').dataset.id;
    this.state.deleteBlock(itemID);
    this.container.remove();
  }
  moveUnlocker=()=> {
    this.container.setAttribute('draggable',true)
    this.moveButton.addEventListener('mouseleave',this.moveLocker)
  }
  moveLocker=()=> {
    this.container.removeAttribute('draggable')
  }
  onDragEnter = ()=> {
    this.item.classList.add('item_on-drop')
  }
  onDragLeave = ()=> {
    this.item.classList.remove('item_on-drop')
  }
  addText = () => {
    this.state.addNewBlock(this.id,'text','new text')
    this.rerenderFunction()
    // this.blocklist.addNewBlock(this.id,'title','new title')
  }
  addTitle = () => {   
    this.state.addNewBlock(this.id,'title','new title')
    this.rerenderFunction()
    // this.blocklist.addNewBlock(this.id,'title','new title')
  }

  setEventListeners() {
    this.item.addEventListener('blur', this.blurHandler);
    this.deleteButton.addEventListener('click', this.handlerDelete)
    this.moveButton.addEventListener('mousedown',this.moveUnlocker)
    this.item.addEventListener('dragenter',this.onDragEnter) 
    this.item.addEventListener('dragleave',this.onDragLeave)       
    this.addTitleButton.addEventListener('click',this.addTitle)
    this.addTextButton.addEventListener('click',this.addText)
  }
}