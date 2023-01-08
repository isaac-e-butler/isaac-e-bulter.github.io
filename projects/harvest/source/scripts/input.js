import { getCanvasWithContext } from "./common.js";
import { ReDraw, Clear } from "./render.js";
import { source } from "./object.js";

const { canvas, context } = getCanvasWithContext('select');
let position = { x: 0, y: 0 };

export function InitialiseInput(data) {
    addEventListener('pointermove', (event) => {
        position = MouseUpdate(event);
    });
}

function MouseUpdate(event) {
    const convert = (value) => Math.floor(value / 10);
    const rect = canvas.getBoundingClientRect();

    const previous = { ...position };
    const current = { 
        x: convert(event.clientX - rect.left), 
        y: convert(event.clientY - rect.top),
    }
    
    if (current.x !== previous.x || current.y !== previous.y) {
        ReDraw(context, current.x, current.y, source.select);
        Clear(context, previous.x, previous.y);
    }

    return current;
}