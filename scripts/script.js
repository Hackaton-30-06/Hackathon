'use strict';

const errorMessages = {
    textErrorLength: 'Должно быть от 2 до 30 символов',
    textErrorEmptyString: 'Это обязательное поле',
    textErrorURL: 'Здесь должна быть ссылка',
  };

const pageName = 'corrections'
const state = new State(initialContent[pageName]);
const pageHeader = document.querySelector('.title');
const pageLogo = document.querySelector('.logo');


pageHeader.textContent = state.pullData().heading;
const setCursor = (id) => document.querySelector(`.item[data-id="${id+1}"]`).focus()


const containerTemplate = document.querySelector('#container-template').content.querySelector('.block-container'),
    subtitleTemplate = document.querySelector('#subtitle-template').content.querySelector('.subtitle'),
    paragraphTemplate = document.querySelector('#paragraph-template').content.querySelector('.paragraph');

const popupFormValidator = new FormValidator(document.querySelector('.popup__form'), errorMessages);
const cleanForm = popupFormValidator.setEventListeners();
const popup = new Popup(document.querySelector('.popup'), cleanForm);


const blocksList = new BlocksList(document.querySelector('.blocks-container'));
const createBlockItem = (obj) => new Block(obj).create();
const makeBlocksArr = (rerenderFunction) => {
    const BlocksArr = state.pullData().blocks
    .map((block, index) => {
        let itemTemplate;
        switch (block.type) {
            case 'title':
                itemTemplate = subtitleTemplate;
                return createBlockItem({block, index, state, itemTemplate, containerTemplate, rerenderFunction,setCursor});
            case 'text':
                itemTemplate = paragraphTemplate;
                return createBlockItem({block, index, state, itemTemplate, containerTemplate, rerenderFunction,setCursor});
        }   
    })
    return BlocksArr;
}
const manager = new Manager(makeBlocksArr, blocksList);

// Рендерим блоки
const BlocksArr = manager.getblocksArr();
state.pushData();
blocksList.render(BlocksArr);

pageLogo.src = state.pullData().logo

pageLogo.addEventListener('click', (evt) => {
    popup.open();
    const valid = popupFormValidator.checkFormValidity(popup.form);
    popupFormValidator.setSubmitButtonState(valid);
})

pageHeader.addEventListener('blur', (evt) => {
    const text = evt.target.textContent;
    state.setHeading(text);
    evt.target.textContent = state.pullData().heading;
})

popup.form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const link = evt.currentTarget.elements.link.value
    state.updateLogo(link);
    pageLogo.src = state.pullData().logo;

    popup.close();
})

