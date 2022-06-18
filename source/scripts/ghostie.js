import { randomNumber } from './common.js';

let isPixelGhost = false;

const update = () => {
    document
        .getElementById('ghostie')
        .setAttribute('src', `./source/images/icons/${isPixelGhost ? 'pixel-' : ''}ghost-icon.svg`);
    isPixelGhost = !isPixelGhost;
    change();
};

const change = () => setTimeout(update, randomNumber(1000, 10000) * 5);

export const start = () => {
    update();
};
