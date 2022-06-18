export const createSrc = (path) => `./source/images/projects/${path}`;

export const createAlt = (project, info) => `${project}  -  ${info}`;

export const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
