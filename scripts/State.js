'use strict';

class State {
  constructor(store) {
    this.store = store
    this.init()
  }

  init() {
    const data = this.pullData();

      data ? this.store = data : this.pushData();
  }

  pushData = () => {
    const blocksArrHasID = this.createrID(this.store);
    this.store.blocks = blocksArrHasID;
    localStorage.setItem('store',JSON.stringify(this.store))
  }

  pullData = () => {    
    return JSON.parse(localStorage.getItem('store'));
  }
  addBlock(data) {
    if (typeof data === 'object') {
      this.store.blocks.push(data)   
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
    const newBlocksArr = this.store.blocks
      .filter((block, index) => {
        if (block.id != id) {
          block.id = index++;
          return block;
        }
      })
      this.store.blocks = newBlocksArr;
      this.pushData();
  }
  addNewBlock(id,type,content) {
    this.store.blocks.splice(id,0,{type,content})
    const blocksArrHasID = this.createrID(this.store);
    this.store.blocks = blocksArrHasID;    
    this.pushData();
  }

  createrID = (data) => {
    return data.blocks.map((item, index) => {
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
}