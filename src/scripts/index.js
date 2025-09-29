import { projects } from "./projects.js";

const sections = {
    home: {
        element: document.getElementById("home"),
        name: "Home",
    },
    projects: {
        element: document.getElementById("project-list"),
        name: "Projects",
    },
};

window.onload = () => {
    setNextScrollToPosition();

    for (const project of projects) {
        addProjectToDOM(project);
    }
};

window.onscroll = () => {
    setNextScrollToPosition();
};

function setNextScrollToPosition() {
    const scrollToButton = document.getElementById("scroll-to-button");
    const sectionList = Object.values(sections);

    for (let i = 0; i < sectionList.length; i++) {
        const sectionRect = sectionList[i].element.getBoundingClientRect();

        const offset = sectionRect.height / 2;
        const isActivePage = sectionRect.y > -offset && sectionRect.y < sectionRect.height - offset;

        if (isActivePage) {
            const scrollToHome = i + 1 >= sectionList.length;

            const indexOfNextSection = scrollToHome ? 0 : i + 1;
            const nextSection = sectionList[indexOfNextSection];

            scrollToButton.firstChild.innerText = nextSection.name;
            scrollToButton.className = scrollToHome ? "arrow-up" : "arrow-down";
            scrollToButton.onclick = () => {
                scrollToSection(nextSection);
            };

            break;
        }
    }
}

function scrollToSection(section) {
    const sectionRect = section.element.getBoundingClientRect();
    window.scrollBy({ top: sectionRect.y, behavior: "smooth" });
}

function addProjectToDOM(project) {
    const projectElement = document.createElement("div");

    projectElement.className = "project";
    projectElement.innerHTML = `
        <div class="project-image">
            <img src="./src/images/projects/${project.icon}" />
            <div class="project-overlay">
                <p>${project.description}</p>
            </div>
        </div>
        <div class="project-title">
            <h5>${project.title}</h5>
            <a href="https://${project.url}" target="_blank">
                <button><img src="./src/images/icons/open-out.svg" /></button>
            </a>
        </div>
    `;

    sections.projects.element.appendChild(projectElement);
}
