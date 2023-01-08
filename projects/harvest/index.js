import { GenerateNewWorld } from "./source/scripts/generate.js";
import { InitialRender } from "./source/scripts/render.js";
import { InitialiseInput } from "./source/scripts/input.js";

window.onload = () => {
    const data = GenerateNewWorld();
    InitialRender(data);
    InitialiseInput(data);
}