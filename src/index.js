import "./styles.css";

// Create "X" SVG

function createXSVG() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("class", "feather feather-x");

    // Create first line (diagonal from top right to bottom left)
    const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line1.setAttribute("x1", "18");
    line1.setAttribute("y1", "6");
    line1.setAttribute("x2", "6");
    line1.setAttribute("y2", "18");

    // Create second line (diagonal from top left to bottom right)
    const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line2.setAttribute("x1", "6");
    line2.setAttribute("y1", "6");
    line2.setAttribute("x2", "18");
    line2.setAttribute("y2", "18");

    // Append lines to SVG
    svg.appendChild(line1);
    svg.appendChild(line2);

    return svg;
}

function createListIcon() {
    const svgNS = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("xmlns", svgNS);
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.classList.add("feather", "feather-list");

    // Function to create lines
    function createLine(x1, y1, x2, y2) {
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        svg.appendChild(line);
    }

    // Creating horizontal list lines
    createLine(8, 6, 21, 6);
    createLine(8, 12, 21, 12);
    createLine(8, 18, 21, 18);

    // Creating small dots on the left
    createLine(3, 6, 3.01, 6);
    createLine(3, 12, 3.01, 12);
    createLine(3, 18, 3.01, 18);

    return svg;
}

// Sidebar functionality

const showSidebar = document.querySelector(".sidebar-header svg")
const todayButton = document.querySelector(".todos-today");
const upcomingButton = document.querySelector(".todos-today");
const completedButton = document.querySelector(".todos-today");

function showToday() {

}

function showUpcoming() {
    
}

function showCompleted() {
    
}

function createProject(name) {
    const projectsContainer = document.querySelector(".projects-container");
    const project = document.createElement("div");
    project.classList.add("project");
    const projectName = document.createElement("h3");
    projectName.textContent = name;

    projectsContainer.appendChild(createListIcon());
    projectsContainer.appendChild(projectName);
}

function createToDo(todoItem) {
    const todoContainer = document.querySelector(".todos-container");
    const todo = document.createElement("div");
    todo.classList.add("todo");
    if (todoItem.priority == "high") {
        todo.classList.add("priority-high");
    }
    else if (todoItem.priority == "medium") {
        todo.classList.add("priority-medium");
    }
    else {
        todo.classList.add("priority-low");
    }

    const todoLeft = document.createElement("div");
    todoLeft.classList.add("todo-left");
    const todoRight = document.createElement("div");
    todoRight.classList.add("todo-right");
    
    // todoLeft content
    const todoCheckBox = document.createElement("div");
    todoCheckBox.classList.add("todo-checkbox");
    const todoName = document.createElement("h3");
    todoName.textContent = todoItem.name;

    // todoRight content
    const todoDate = document.createElement("p");
    todoDate.textContent = todoItem.date;
    const todoDetails = document.createElement("div");
    todoDetails.classList.add("todo-details");
    const todoDetailsText = document.createElement("p");
    todoDetailsText = "Details";
    todoDetails.appendChild(todoDetailsText);
    const xSVG = createXSVG();

    // Append content
    todoLeft.appendChild(todoCheckBox);
    todoLeft.appendChild(todoName);

    todoRight.appendChild(todoDate);
    todoRight.appendChild(todoDetails);
    todoRight.appendChild(xSVG);

    todo.appendChild(todoLeft);
    todo.appendChild(todoRight);

    todoContainer.appendChild(todo);
}

function showToDoItems(todoList) {
    for (todoItem of todoList) {
    }
}

// Event Listeners

const sidebarButton = document.querySelector(".sidebar-header svg");
sidebarButton.addEventListener("click", () => {

})

// Create Project Functionality
const createProjectButton = document.querySelector(".projects-header svg")

const createProjectDialog = document.querySelector(".project-dialog")
createProjectButton.addEventListener("click", () => {
    createProjectDialog.showModal()
})

const closeProjectButton = document.querySelector(".project-dialog svg");
closeProjectButton.addEventListener("click", () => {
    createProjectDialog.close();
})

// Create ToDo Functionality
const todoDialog = document.querySelector(".todo-dialog")

const createToDoButton = document.querySelector(".add-todo");
createToDoButton.addEventListener("click", () => {
    todoDialog.showModal()
})

const closeToDoButton = document.querySelector(".todo-dialog svg");
closeToDoButton.addEventListener("click", () => {
    todoDialog.close();
})