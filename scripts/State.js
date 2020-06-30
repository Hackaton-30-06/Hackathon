'use strict';

class State {
  constructor(store) {
    this.store = store
    this.init()
  }
  init() {
      if (!pullData()) {
      this.pushData()
    }
  }
  pushData = () => {
    localStorage.setItem('store',JSON.stringify(this.store))
  }
  pullData = () => {    
    return localStorage.JSON.parse(getItem('store'))
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
  }
}