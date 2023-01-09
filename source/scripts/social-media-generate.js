import list from "./social-media-list.js";

export default function() {
    list.forEach(media =>
        document.getElementById('social-media').innerHTML += `
            <a role="link" href="${media.link}" target="_blank" title="${media.alt}">
                <img 
                    src="./source/images/social-media/${media.icon}" 
                    alt="${media.alt}" 
                    draggable="false"
                />
            </a>
    `);
}