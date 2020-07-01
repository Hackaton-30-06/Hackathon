'use strict';

class Popup {
  constructor(popup) {
    this.popup = popup;
    this.setEventListenerClose();
  }

  open() {
    this.popup.classList.add('popup_is-opened');
  }

  close = () => {
    this.popup.classList.remove('popup_is-opened');
  }

  setEventListenerClose() {
    this.closeButton = this.popup.querySelector('.popup__close');
    this.closeButton.addEventListener('click', this.close);
  }
}
