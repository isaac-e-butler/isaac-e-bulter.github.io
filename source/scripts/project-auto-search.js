import list from './project-list.js';

const search = document.getElementById('project-search');
const grid = document.getElementById('project-grid');

export default function(limit, directory) {
    let previousQuery = autoSearch(undefined, limit, directory);

    search.addEventListener('input', () => 
        previousQuery = autoSearch(previousQuery, limit, directory)
    );
}

const autoSearch = (previousQuery, limit, directory) => {
    const query = search.value.toLowerCase();

    if (query !== previousQuery) {
        const updatedList = updateList(query);
        grid.innerHTML = '';
        
        updatedList.forEach((project, i) => 
            i < limit && generateProject(project, directory)
        );

        if (!updatedList.length) generateNoResult(query);
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

const generateProject = (project, directory) => {
    const { title, icon, link, external } = project;
    grid.innerHTML += `
        <a role="option" href="${external ? link : directory.project + link}" target="_blank" title="${title}">
            <img 
                src="${directory.source}/images/projects/${icon}"
                alt="${title} - icon" 
                draggable="false" 
            />
        </a>
    `;
}

const generateNoResult = (query) => 
    grid.innerHTML += `
        <div class="message">
            <p>no results for '${query}'</p>
        </div>
`;