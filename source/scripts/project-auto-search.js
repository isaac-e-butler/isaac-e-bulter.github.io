import projectList from './project-list.js';

export default function() {
    const search = document.getElementById('project-search');
    const grid = document.getElementById('project-grid');
    let previousQuery = autoSearch(grid, search);

    search.addEventListener('input', () => {
        previousQuery = autoSearch(grid, search, previousQuery);
    });
}

const generateProjects = (grid, p) =>
    grid.innerHTML += `
        <a role="option" href="${p.link}" target="_blank" title="${p.title}">
            <img 
                src="./source/images/projects/${p.icon}"
                alt="${p.title} - icon" 
                draggable="false" 
            />
        </a>
`;

function autoSearch(grid, search, previousQuery) {
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

    return query;
}