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

    const splitToLower = (words) => words.toLowerCase().split(' ').filter(w => w);
    const totalWords = (words) => words.split(' ').filter(w => w).length;
    const queryWords = splitToLower(query);

    return list
        .map(project => {
            let match = 0;

            const applyWeight = (i, w) => (1 - ((i - match) / queryWords.length)) * w;

            splitToLower(project.title).forEach(fullProjectWord => queryWords.forEach((queryWord, i) => {
                const partialProjectWord = fullProjectWord.slice(0, queryWord.length);
                match += queryWord === fullProjectWord ? applyWeight(i, 1.0)
                    : queryWord === partialProjectWord ? applyWeight(i, 0.5) : 0;
            }));

            if (match) return { ...project, validity: match / totalWords(project.title) };
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