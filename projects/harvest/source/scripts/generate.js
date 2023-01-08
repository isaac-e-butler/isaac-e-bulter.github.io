import { getCanvasWithContext } from './common.js';
import { type } from './object.js';

export function GenerateNewWorld() {
    const { canvas } = getCanvasWithContext('stage');
    const data = [];

    for (let y = 0; y < (canvas.height / 10); y++) {
        data.push([]);
        for (let x = 0; x < (canvas.width / 10); x++) {
            data[y].push(type.grass);
        }
    }
    
    return data;
}