export const getCanvasWithContext = (id) => {
    const canvas = document.getElementById(id);
    const context = canvas.getContext("2d");
    return { canvas, context }
}

export const within = (value) => value >= 0 && value <= 30;