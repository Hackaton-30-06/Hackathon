'use strict';

const state = new State(initialContent.corrections);

const pageHeader = document.querySelector('title');

pageHeader.textContent = state.pullData().heading;
const setCursor = (id) => document.querySelector(`.item[data-id="${id+1}"]`).focus()


const containerTemplate = document.querySelector('#container-template').content.querySelector('.block-container'),
    subtitleTemplate = document.querySelector('#subtitle-template').content.querySelector('.subtitle'),
    paragraphTemplate = document.querySelector('#paragraph-template').content.querySelector('.paragraph');

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

pageHeader.addEventListener('blur', (evt) => {
    const text = evt.target.textContent;
    state.setHeading(text);
    evt.target.textContent = state.pullData().heading;
})