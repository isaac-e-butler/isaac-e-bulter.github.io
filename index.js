import projectList from './source/scripts/project-list.js';
import socialList from './source/scripts/social-media.js';

window.onload = () => {
    generateSocialMedia();

    const search = document.getElementById('project-search');
    const grid = document.getElementById('project-grid');
    setTimeout(autoSearch, 0, grid, search);

    search.addEventListener('input', () => {
        // triggers when typing in search
    });
};

const generateSocialMedia = () =>
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

const generateProjects = (grid, project) =>
    grid.innerHTML += `
        <a role="option" href="${project.link}" target="_blank" title="${project.title}">
            <img 
                src="./source/images/projects/${project.icon}"
                alt="${project.title} - icon" 
                draggable="false" 
            />
        </a>
`;

function autoSearch(grid, search, previousQuery) {
    // look at onValueChange
    const query = search.value.toLowerCase();

    if (query !== previousQuery) {
        grid.innerHTML = '';
        const projects = query
            ? projectList.filter((project) =>
                project.title
                    .toLowerCase()
                    .split(' ')
                    .some((w) =>
                        query.split(' ').some((q) => {
                            for (let i = 0; i < q.length; i++) {
                                if (w[i] !== q[i]) return false;
                            }
                            return true;
                        })
                    )
            ) : projectList;

        projects.forEach((project) => generateProjects(grid, project));
    }

    setTimeout(autoSearch, 250, grid, search, query);
}
