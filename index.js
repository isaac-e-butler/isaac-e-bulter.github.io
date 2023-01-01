import GenerateSocialMedia from './source/scripts/social-media-generate.js';
import StartAutoSearch from './source/scripts/project-auto-search.js';

window.onload = () => {
    GenerateSocialMedia('./source/images/social-media/');
    StartAutoSearch(8, './source/images/projects/');
};