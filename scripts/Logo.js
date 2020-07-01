'use strict';

class Logo {
  constructor(obj) {
    this.data = obj.data;
    this.id = obj.data.id;
    this.logo = obj.template;
  }

  create = () => {
      const doneLogo = this.logo;
      doneLogo.src = this.data.link
      doneLogo.dataset.src = this.id;
      console.log(this.logo)   
      return doneLogo;
  }
}