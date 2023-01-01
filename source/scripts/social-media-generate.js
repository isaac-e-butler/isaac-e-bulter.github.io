import list from "./social-media-list.js";

export default function(directory) {
    list.forEach(media =>
        document.getElementById('social-media').innerHTML += `
            <a role="link" href="${media.link}" target="_blank">
                <img 
                    src="${directory}${media.icon}" 
                    alt="${media.alt}" 
                    draggable="false"
                />
            </a>
    `);
}