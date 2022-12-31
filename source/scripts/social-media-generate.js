import list from "./social-media-list.js";

export default function() {
    list.forEach(s =>
        document.getElementById('social-media').innerHTML += `
            <a role="link" href="${s.link}" target="_blank">
                <img 
                    src="./source/images/social-media/${s.icon}" 
                    alt="${s.alt}" 
                    draggable="false"
                />
            </a>
    `);
}