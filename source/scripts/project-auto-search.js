import list from './project-list.js';

const search = document.getElementById('project-search');
const view = document.getElementById('project-button');
const grid = document.getElementById('project-grid');

let isLimited = true;

export default function() {
    let previousQuery = autoSearch();

    view.addEventListener('click', () => {
        isLimited = !isLimited;
        grid.className = isLimited ? 'limited' : '';
        view.innerHTML = 'show ' + (isLimited ? 'all' : 'less');

        previousQuery = autoSearch();
    });
    
    search.addEventListener('input', () => previousQuery = autoSearch(previousQuery));
}

const autoSearch = (previousQuery) => {
    const query = search.value.toLowerCase();
    const limit = isLimited ? 4 : 16;

    if (query !== previousQuery) {
        const updatedList = updateList(query);
        grid.innerHTML = '';
        
        updatedList.forEach((project, i) => 
            i < limit && generate(project)
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

const generate = (project) => {
    const { title, icon, link } = project;
    grid.innerHTML += `
        <a role="option" href="${link}" target="_blank" title="${title}">
            <img 
                src="./source/images/projects/${icon}"
                alt="${title} - icon" 
                draggable="false" 
            />
        </a>
    `;
}

const generateNoResult = (query) => 
    grid.innerHTML += `
        <div class="message">
            <p>no results for "<i>${query}</i>"</p>
        </div>
`;