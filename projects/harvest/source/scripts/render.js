import { getCanvasWithContext, within } from "./common.js";
import { source, type } from "./object.js";

export function InitialRender(data) {
    const { context } = getCanvasWithContext('stage');

    const image = new Image();
    image.onload = () => {
        context.fillStyle = context.createPattern(image, 'repeat');
        for (let y = 0; y < data.length; y++) {
            for (let x = 0; x < data[y].length; x++) {
                context.fillRect(x * 10, y * 10, 10, 10);
            }
        }
    }
    image.src = source[type.grass];
}

export function ReDraw(context, x, y, src) {
    if (within(x) && within(y)) {
        const image = new Image();
        image.onload = () => {
            context.drawImage(image, x * 10, y * 10);
        }
        image.src = src;
    }   
}

export function Clear(context, x, y) {
    if (within(x) && within(y))
        context.clearRect(0, 0, 310, 310);
}