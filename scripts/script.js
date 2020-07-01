'use strict';
const errorMessages = {
    textErrorLength: 'Должно быть от 2 до 30 символов',
    textErrorEmptyString: 'Это обязательное поле',
    textErrorURL: 'Здесь должна быть ссылка',
  };
const state = new State(initialContent.corrections);
const pageHeader = document.querySelector('.title');
const pageLogo = document.querySelector('.logo');
pageHeader.textContent = state.pullData().heading;

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
                return createBlockItem({block, index, state, itemTemplate, containerTemplate, rerenderFunction});
            case 'text':
                itemTemplate = paragraphTemplate;
                return createBlockItem({block, index, state, itemTemplate, containerTemplate, rerenderFunction});
        }   
    })
    return BlocksArr;
}
const manager = new Manager(makeBlocksArr, blocksList);

// Рендерим блоки
const BlocksArr = manager.getblocksArr();
state.pushData();
blocksList.render(BlocksArr);

pageLogo.addEventListener('click', (evt) => {
    popup.open();
})

pageHeader.addEventListener('blur', (evt) => {
    const text = evt.target.textContent;
    state.setHeading(text);
    evt.target.textContent = state.pullData().heading;
})

