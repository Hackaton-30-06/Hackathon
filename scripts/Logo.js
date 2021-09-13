'use strict';

class Logo {
  constructor(obj) {
    this.data = obj.data;
    this.id = obj.data.id;
    this.logo = obj.template;
    this.container = obj.container;
    this.state = obj.state;
    this.pageLogo = obj.pageLogo;
    this.popup = obj.popup;
  }

  create = () => {
    this.logo.src = this.data.link
    this.container.appendChild(this.logo);

    this.setEventListeners();
    return this.container;
  }

  setLogo = () => {
    this.state.updateLogo(this.logo.getAttribute('src'))
    this.pageLogo.src = state.pullData().logo;
    this.popup.close();
    
  }

  setEventListeners = () => {
    this.container.addEventListener('click', this.setLogo)
  }
}