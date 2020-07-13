'use strict';

class Block {
  
  constructor(obj) {
    this.itemTemplate = obj.itemTemplate;
    this.content = obj.block.content;
    this.id = obj.index + 1;
    this.containerTemplate = obj.containerTemplate;
    this.state = obj.state;
    this.rerenderFunction = obj.rerenderFunction;
    this.setCursor = obj.setCursor;
  }

  create() {
    this.item = this.itemTemplate.cloneNode('true');
    this.container = this.containerTemplate.cloneNode('true');
    this.menu = this.container.querySelector('.side-menu');
    this.deleteButton = this.menu.querySelector('.side-menu__button_type_delete');
    this.addTitleButton = this.menu.querySelector('.side-menu__button_type_title');
    this.addTextButton = this.menu.querySelector('.side-menu__button_type_text');
    this.moveButton = this.menu.querySelector('.side-menu__button_type_move');
    this.item.textContent = this.content === '' ? '<Введите текст>' : this.content;
    this.container.appendChild(this.item);
    this.item.dataset.id = this.id;

    this.setEventListeners();
    return this.container;
  }
  blurHandler = (evt) => {
    const content = evt.target.textContent;
    if (content === '') {
      this.item.textContent = '<Введите текст>'
    }
    this.state.setBlockContent(this.id, content);
  }
  activeHandler = (evt) => {
    if (evt.target.textContent === '<Введите текст>') {
      evt.target.textContent = '';
    }
  }
  handlerDelete = (evt) => {
    this.removeEventListeners();
    this.state.deleteBlock(this.id);
    this.rerenderFunction();
  }
  moveUnlocker=()=> {
    this.container.setAttribute('draggable',true)
    this.moveButton.addEventListener('mouseleave',this.moveLocker)
    this.state.setOldId(this.id)
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
  onDragOver(evt){
    evt.preventDefault()
  }
  onDrop = () => {
    this.state.replaceBlock(this.id)
    this.rerenderFunction()
  }
  addText = () => {
    this.state.addNewBlock(this.id,'text','')
    this.rerenderFunction()
    this.setCursor(this.id)
  }
  addTitle = () => {   
    this.state.addNewBlock(this.id,'title','')
    this.rerenderFunction()
    this.setCursor(this.id)
  }
  setEventListeners() {
    this.item.addEventListener('blur', this.blurHandler)
    this.item.addEventListener('focus', this.activeHandler)
    this.deleteButton.addEventListener('click', this.handlerDelete)
    this.moveButton.addEventListener('mousedown',this.moveUnlocker)
    this.item.addEventListener('dragenter',this.onDragEnter)
    this.item.addEventListener('dragleave',this.onDragLeave)
    this.item.addEventListener('dragover',this.onDragOver)
    this.item.addEventListener('drop',this.onDrop)        
    this.addTitleButton.addEventListener('click',this.addTitle)
    this.addTextButton.addEventListener('click',this.addText)
  }
  removeEventListeners(){
    this.item.removeEventListener('blur', this.blurHandler)
    this.item.removeEventListener('focus', this.activeHandler)
    this.deleteButton.removeEventListener('click', this.handlerDelete)
    this.moveButton.removeEventListener('mousedown',this.moveUnlocker)
    this.item.removeEventListener('dragenter',this.onDragEnter) 
    this.item.removeEventListener('dragleave',this.onDragLeave)   
    this.item.removeEventListener('dragover',this.onDragOver)       
    this.item.removeEventListener('drop',this.onDrop)        
    this.addTitleButton.removeEventListener('click',this.addTitle)
    this.addTextButton.removeEventListener('click',this.addText)
    this.moveButton.addEventListener('mouseleave',this.moveLocker)
  }
}