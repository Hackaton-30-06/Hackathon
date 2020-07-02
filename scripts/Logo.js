'use strict';

class Logo {
  constructor(obj) {
    this.data = obj.data;
    this.id = obj.data.id;
    this.logo = obj.template;
    this.container = obj.container;
    console.log(this.container)
  }

  create = () => {
      const doneLogo = this.logo;
      doneLogo.src = this.data.link
      doneLogo.dataset.src = this.id;
      this.container.appendChild(doneLogo);
      
      return doneLogo;
  }
}