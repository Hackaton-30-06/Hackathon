'use strict';

const state = new State(initialContent.corrections)

const containerTemplate = document.querySelector('#container-template').content.querySelector('.block-container'),
    subtitleTemplate = document.querySelector('#subtitle-template').content.querySelector('.subtitle'),
    paragraphTemplate = document.querySelector('#paragraph-template').content.querySelector('.paragraph');

const blocksList = new BlocksList(document.querySelector('.blocks-container'));
const createBlockItem = (obj) => new Block(obj).create();


// Рендерим блоки
const blockItems = [...initialContent.corrections.blocks]
    .map(block => {
        let blockItem;
        const container = containerTemplate.cloneNode('true');
        switch (block.type) {
            case 'title':
                blockItem = subtitleTemplate.cloneNode('true');
                return createBlockItem({content: block.content, blockItem, container});
            case 'text':
                blockItem = paragraphTemplate.cloneNode('true');
                return createBlockItem({content: block.content, blockItem, container});
        }   
    });
blocksList.render(blockItems);
