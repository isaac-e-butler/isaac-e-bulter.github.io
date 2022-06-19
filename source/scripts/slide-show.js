import { createAlt, createSrc } from './common.js';

const slideShow = [
    // maze-game
    { alt: createAlt('MAZE GAME', 'QUADRANT'), src: createSrc('maze-game/quadrant.png') },
    { alt: createAlt('MAZE GAME', 'CORRIDOR'), src: createSrc('maze-game/corridor.png') },
    { alt: createAlt('MAZE GAME', 'CIRCULAR'), src: createSrc('maze-game/circular.png') },
    { alt: createAlt('MAZE GAME', 'PASSAGE'), src: createSrc('maze-game/passage.png') },
];

let index = 0;

const update = () => {
    document.getElementById('slide-show').setAttribute('src', slideShow[index].src);
    document.getElementById('slide-show').setAttribute('alt', slideShow[index].alt);
    document.getElementById('slide-show').setAttribute('title', slideShow[index].alt);
    index = index === slideShow.length - 1 ? 0 : index + 1;
    change();
};

const change = () => setTimeout(update, 4000);

export const start = () => {
    update();
};
