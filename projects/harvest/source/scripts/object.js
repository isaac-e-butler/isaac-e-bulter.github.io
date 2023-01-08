export const type = {
    empty: '-',
    water: '~',
    grass: 'g',
    stone: 's',
};

const directory = './source/images';

export const source = {
    select: `${directory}/select.png`,
    [type.water]: `${directory}/water.png`,
    [type.grass]: `${directory}/grass.png`,
    [type.stone]: `${directory}/stone.png`,
}