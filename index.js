import projectAutoSearch from './source/scripts/project-auto-search.js';
import socialList from './source/scripts/social-media.js';

window.onload = () => {
    generateSocialMedia();
    projectAutoSearch();
};

function generateSocialMedia() {
    socialList.forEach(s =>
        document.getElementById('social-media').innerHTML += `
            <a href="${s.link}" target="_blank">
                <img 
                    src="./source/images/social-media/${s.icon}" 
                    alt="${s.alt}" 
                    draggable="false"
                />
            </a>
    `);
}
