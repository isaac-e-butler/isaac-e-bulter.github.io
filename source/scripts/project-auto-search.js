import list from './project-list.js';

export default function() {
    const search = document.getElementById('project-search');
    const grid = document.getElementById('project-grid');
    let previousQuery = autoSearch(grid, search);

    search.addEventListener('input', () => 
        previousQuery = autoSearch(grid, search, previousQuery)
    );
}

const autoSearch = (grid, search, previousQuery) => {
    const query = search.value.toLowerCase();

    if (query !== previousQuery) {
        grid.innerHTML = '';
        
        updateList(query).forEach(project => 
            generateHTML(grid, project)
        );
    }

    return query;
}

const updateList = (query) => {
    if (!query) return list;

    const separateWords = (words) => words.toLowerCase().split(' ').filter(w => w);
    const queryWords = separateWords(query);

    return list
        .map(project => {
            const projectWords = separateWords(project.title);
            let match = 0;

            const applyWeight = (i, w) => (1 - ((i - match) / queryWords.length)) * w;

            projectWords.forEach(fullProjectWord => queryWords.forEach((queryWord, queryIndex) => {
                const partialProjectWord = fullProjectWord.slice(0, queryWord.length);
                match += queryWord === fullProjectWord ? applyWeight(queryIndex, 1.0)
                    : queryWord === partialProjectWord ? applyWeight(queryIndex, 0.5) : 0;
            }));

            const validity = match / projectWords.length;
            if (validity) return { ...project, validity };
        })
        .filter(p => p)
        .sort((a, b) => b.validity - a.validity);
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