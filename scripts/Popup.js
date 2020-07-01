'use strict';

class Popup {
  constructor(popup, cleanForm) {
    this.popup = popup;
    this.cleanForm = cleanForm;
    this.form = popup.querySelector('.popup__form');
    this.setEventListenerClose();
  }

  open() {
    this.cleanForm();
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
