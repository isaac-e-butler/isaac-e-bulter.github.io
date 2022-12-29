import list from './project-list.js';

export default function(limit) {
    const search = document.getElementById('project-search');
    const grid = document.getElementById('project-grid');
    let previousQuery = autoSearch(grid, search, undefined, limit);

    search.addEventListener('input', () => 
        previousQuery = autoSearch(grid, search, previousQuery, limit)
    );
}

const autoSearch = (grid, search, previousQuery, limit) => {
    const query = search.value.toLowerCase();

    if (query !== previousQuery) {
        grid.innerHTML = '';
        
        updateList(query).forEach((project, i) => 
            i < limit && generateHTML(grid, project)
        );
    }

    return query;
}

const updateList = (query) => {
    if (!query) return list;

    const splitWords = (words) => words.toLowerCase().split(' ').filter(Boolean);
    const totalWords = (words) => words.split(' ').filter(Boolean).length;
    const queryWords = splitWords(query);

    return list
        .map(project => {
            let match = 0;

            const applyWeight = (i, weight) => (1 - ((i - match) / queryWords.length)) * weight;

            splitWords(project.title).forEach(fullProjectWord => queryWords.forEach((queryWord, i) => {
                const partialProjectWord = fullProjectWord.slice(0, queryWord.length);
                match += queryWord === fullProjectWord ? applyWeight(i, 1.0)
                    : queryWord === partialProjectWord ? applyWeight(i, 0.5) : 0;
            }));

            if (match) return { ...project, validity: match / totalWords(project.title) };
        })
        .filter(Boolean)
        .sort((a, b) => b.validity - a.validity);
}

const generateHTML = (grid, project) =>
    grid.innerHTML += `
        <a role="option" href="${project.link}" target="_blank" title="${project.title}">
            <img 
                src="./source/images/projects/${project.icon}"
                alt="${project.title} - icon" 
                draggable="false" 
            />
        </a>
`;