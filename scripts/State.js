'use strict';

class State {
  constructor(store) {
    this.store = store
    this.createrID()
    this.init()
  }
  init() {
    const data = this.pullData();
    data ? this.store = data : this.pushData();
  }
  setOldId = (id) =>{
    this.oldId = id
  }
  pushData = () => {
    localStorage.setItem('store',JSON.stringify(this.store))
  }
  pullData = () => {    
    return JSON.parse(localStorage.getItem('store'));
  }
  addBlock(data) {
    if (typeof data === 'object') {
      this.store.blocks.push(data)
      this.createrID()
      this.pushData()
    } 
  }
  setHeading(data) { 
    this.store.heading = data
    this.pushData()
  };
  setBlockContent(id, content) {
    this.store.blocks
      .forEach(block => {
        if (block.id == id) block.content = content;
      })
    this.pushData();
  }
  deleteBlock(id) {
    this.store.blocks = this.store.blocks
      .filter(block => {if (block.id != id) return block})
    this.createrID()
    this.pushData()
  }
  addNewBlock(id,type,content) {
    this.store.blocks.splice(id,0,{type,content})
    this.createrID()
    this.pushData();
  }
  createrID = () => {
    this.store.blocks = this.store.blocks.map((item, index) => {
      return {...item, id: index + 1}
    })
  }
  setHeading = (text) => {
    this.store.heading = text;
    this.pushData();
  }
  updateLogo(link) {
    this.store.logo = link;
    this.pushData();
  }
  replaceBlock(newId) {
    const newBlock = this.store.blocks[this.oldId-1]
    this.deleteBlock(this.oldId) 
    if(newId < this.oldId){
      this.addNewBlock(newId,newBlock.type,newBlock.content)
    } else {
      this.addNewBlock(newId-1,newBlock.type,newBlock.content)
    }
    this.createrID()
    this.pushData()
  }
  updateLogosArr = (link) => {
    this.store.logos = [...this.store.logos.splice(1), {id: '6', link}];
    this.pushData();
  }
}