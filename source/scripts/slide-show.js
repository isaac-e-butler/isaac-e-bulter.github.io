import { slideShow } from '../config/slide-show.js';

let i = 0;

const update = () => {
    document.getElementById('slide-show').setAttribute('src', slideShow[i].src);
    document.getElementById('slide-show').setAttribute('alt', slideShow[i].alt);
    document.getElementById('slide-show').setAttribute('title', slideShow[i].alt);
    i = i === slideShow.length - 1 ? 0 : i + 1;
    change();
};

const change = () => setTimeout(update, 4000);

export const start = () => {
    update();
};
