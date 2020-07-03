'use strict';

const errorMessages = {
    textErrorEmptyString: ' ',
    textErrorURL: 'Здесь должна быть ссылка',
  };
const containerTemplate = document.querySelector('#container-template').content.querySelector('.block-container'),
    subtitleTemplate = document.querySelector('#subtitle-template').content.querySelector('.subtitle'),
    paragraphTemplate = document.querySelector('#paragraph-template').content.querySelector('.paragraph'),
    logoContainerTemplate = document.querySelector('#logo-container-template').content.querySelector('.popup__logo-container'),
    logoTemplate = document.querySelector('#logo-template').content.querySelector('.popup__logo'),
    pageName = 'corrections',
    pageHeader = document.querySelector('.title'),
    pageLogo = document.querySelector('.logo');

const state = new State(initialContent[pageName]);

const setCursor = (id) => document.querySelector(`.item[data-id="${id+1}"]`).focus()
const setLogo = event => {
    if(event.target.classList.contains('popup__logo')) {
        state.updateLogo(event.target.getAttribute('src'))
        pageLogo.src = state.pullData().logo;
        popup.close()
    }
}
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
const makeLogosArr = () => {
    const logossArr = state.pullData().logos
        .map(data => {
            const container = logoContainerTemplate.cloneNode('true');
            container.addEventListener('click',setLogo)
            const template = logoTemplate.cloneNode(true);
            container.appendChild(new Logo({data, template}).create());
            return container;
        })
        return logossArr;
}

// Устанавливаем логотип
pageLogo.src = state.pullData().logo;
pageLogo.addEventListener('click', (evt) => {
    popup.open();
    const valid = popupFormValidator.checkFormValidity(popup.form);
    popupFormValidator.setSubmitButtonState(valid);
})

// Устанавливаем заголовок
pageHeader.textContent = state.pullData().heading;
pageHeader.addEventListener('blur', (evt) => {
    const text = evt.target.textContent;
    state.setHeading(text);
    evt.target.textContent = state.pullData().heading;
})

// Рендерим блоки
const blocksList = new BlocksList(document.querySelector('.blocks-container'), makeBlocksArr);
blocksList.render(blocksList.getblocksArr())

// Рендерим логотипы в попап
const logoList = new BlocksList(document.querySelector('.popup__logos'), makeLogosArr);
logoList.render(logoList.getblocksArr())

// Устанавливаем валидацию и обработку события сабмит формы попапа
const popupFormValidator = new FormValidator(document.querySelector('.popup__form'), errorMessages);
const cleanForm = popupFormValidator.setEventListeners();
const popup = new Popup(document.querySelector('.popup'), cleanForm);
popup.form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const link = evt.currentTarget.elements.link.value
    state.updateLogo(link);
    state.updateLogosArr(link);
    logoList.rerenderBlocks();
    pageLogo.src = state.pullData().logo;

    popup.close();
})









