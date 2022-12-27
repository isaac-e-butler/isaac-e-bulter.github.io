import StartAutoSearch from './source/scripts/project-auto-search.js';
import socialList from './source/scripts/social-media.js';

window.onload = () => {
    GenerateSocialMedia();
    StartAutoSearch();
};

function GenerateSocialMedia() {
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
