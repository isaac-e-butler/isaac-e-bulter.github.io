import GenerateSocialMedia from '../source/scripts/social-media-generate.js';
import StartAutoSearch from '../source/scripts/project-auto-search.js';

window.onload = () => {
    GenerateSocialMedia('../source');
    StartAutoSearch(32, { source: '../source', project: './' });
};