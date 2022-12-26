import list from './project-list.js';

export default function() {
    const search = document.getElementById('project-search');
    const grid = document.getElementById('project-grid');
    let previousQuery = autoSearch(grid, search);

    search.addEventListener('input', () => 
        previousQuery = autoSearch(grid, search, previousQuery)
    );
}

function autoSearch(grid, search, previousQuery) {
    const query = search.value.toLowerCase();

    if (query !== previousQuery) {
        grid.innerHTML = '';

        filteredList(query).forEach(project => 
            generateHTML(grid, project)
        );
    }

    return query;
}

const filteredList = (query) => {
    if (!query) return list;

    const separateWords = (words) => words.toLowerCase().split(' ').filter(w => w);
    const queryWords = separateWords(query);

    return list.filter(project => 
        separateWords(project.title).some(projectWord => queryWords.some(queryWord =>
            queryWord === projectWord.slice(0, queryWord.length)
        ))
    );

    // attach sorting index, to make better matches higher
}

const generateHTML = (grid, p) =>
    grid.innerHTML += `
        <a role="option" href="${p.link}" target="_blank" title="${p.title}">
            <img 
                src="./source/images/projects/${p.icon}"
                alt="${p.title} - icon" 
                draggable="false" 
            />
        </a>
`;