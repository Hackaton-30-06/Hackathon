'use strict';

const state = new State(initialContent.corrections);
const pageHeader = document.querySelector('.title');
const pageLogo = document.querySelector('.logo');


pageHeader.textContent = state.pullData().heading;
const setCursor = (id) => document.querySelector(`.item[data-id="${id+1}"]`).focus()


const containerTemplate = document.querySelector('#container-template').content.querySelector('.block-container'),
    subtitleTemplate = document.querySelector('#subtitle-template').content.querySelector('.subtitle'),
    paragraphTemplate = document.querySelector('#paragraph-template').content.querySelector('.paragraph'),
    logoContainerTemplate = document.querySelector('#logo-container-template').content.querySelector('.popup__logo-container'),
    logoTemplate = document.querySelector('#logo-template').content.querySelector('.popup__logo');

const popup = new Popup(document.querySelector('.popup'));


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

// Рендерим логотипы в попап
const logoList = new BlocksList(document.querySelector('.popup__logos'));
const logossArr = state.pullData().logos
    .map(data => {
        const container = logoContainerTemplate.cloneNode('true');
        console.log(container);
        const template = logoTemplate.cloneNode(true);
        const logo =  container.appendChild(new Logo({data, template}).create());
        console.log(logo);
        return logo;
    })
    console.log(logossArr)
logoList.render(logossArr);


const manager = new Manager(makeBlocksArr, blocksList);

// Рендерим блоки
const BlocksArr = manager.getblocksArr();
state.pushData();
blocksList.render(BlocksArr);

pageLogo.src = state.pullData().logo;

pageLogo.addEventListener('click', (evt) => {
    popup.open();
})

pageHeader.addEventListener('blur', (evt) => {
    const text = evt.target.textContent;
    state.setHeading(text);
    evt.target.textContent = state.pullData().heading;
})


