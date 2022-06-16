let isPixelGhost = false;

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const changeGhost = () => {
    document
        .getElementById('ghostie')
        .setAttribute('src', `./source/images/icons/${isPixelGhost ? '' : 'pixel-'}ghost-icon.svg`);
    isPixelGhost = !isPixelGhost;
    change();
};

const change = () => setTimeout(changeGhost, randomNumber(1000, 10000) * 5);

window.onload = () => {
    change();
};
