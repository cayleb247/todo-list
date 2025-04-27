import "./styles.css";

import { createXSVG, createListIcon, createCheckIcon } from "./create-svg";

import {ToDoItem, Project, todayCategoryList, upcomingCategoryList, completedCategoryList} from "./logic";

import { parseISO, format, isToday, isFuture } from "date-fns";

let projectMap = new Map();

// On start

if (localStorage.hasOwnProperty("projectMap")) {
    projectMap = new Map(JSON.parse(localStorage.getItem("projectMap")));
    for (const [projectName, project] of projectMap){
        listProject(project);
        for (const todo of project.todos) {
            if (todo.completed){ // check if todo is completed
                completedCategoryList.push(todo);
            }
            else {
                if (todo.date) { // check if todo has a date
                    if (isToday(todo.date)) {
                        todayCategoryList.push(todo);
                    }
                    else if (isFuture(todo.date)) {
                        upcomingCategoryList.push(todo);
                    }
                }
            }
        }
    }
}

let currentProject;
let categorySelected;
let currentCategory;

displayCategory("today");

// Sidebar functionality

const showSidebar = document.querySelector(".sidebar-header svg");

const todayCategory = document.querySelector(".todos-today");
const upcomingCategory = document.querySelector(".todos-upcoming");
const completedCategory = document.querySelector(".todos-completed");

todayCategory.addEventListener("click", () => {
    categorySelected = true;
    currentCategory = "today";
    updateCategoryLists();
    displayCategory("today");
})
upcomingCategory.addEventListener("click", () => {
    categorySelected = true;
    currentCategory = "upcoming";
    updateCategoryLists();
    displayCategory("upcoming");
})
completedCategory.addEventListener("click", () => {
    categorySelected = true;
    currentCategory = "completed";
    updateCategoryLists();
    displayCategory("completed");
})

function updateCategoryLists() {
    todayCategoryList.length = 0;
    upcomingCategoryList.length = 0;
    completedCategoryList.length = 0;
    for (const [projectName, project] of projectMap){
        for (const todo of project.todos) {
            if (todo.completed){ // check if todo is completed
                completedCategoryList.push(todo);
            }
            else {
                if (todo.date) { // check if todo has a date
                    if (isToday(todo.date)) {
                        todayCategoryList.push(todo);
                    }
                    else if (isFuture(todo.date)) {
                        upcomingCategoryList.push(todo);
                    }
                }
            }
        }
    }
}

function displayCategory(category) {

    const todoContainer = document.querySelector(".todos-container");
    todoContainer.innerHTML = "";
    const categoryHeading = document.querySelector(".project-name h1");

    const addToDo = document.querySelector(".add-todo");
    addToDo.style.display = "none";

    if (category == "today") {
        categoryHeading.textContent = "Today";
        for (const todo of todayCategoryList) {
            displayToDo(todo);
        }
    }
    else if (category == "upcoming") {
        categoryHeading.textContent = "Upcoming";
        for (const todo of upcomingCategoryList) {
            displayToDo(todo);
        }
    }
    else if (category == "completed") {
        categoryHeading.textContent = "Completed";
        for (const todo of completedCategoryList) {
            displayToDo(todo);
        }
    }
    document.querySelector(".content > svg").style.display = "none";
}

function listProject(project) {
    const projectsContainer = document.querySelector(".projects-container");
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    const projectName = document.createElement("h3");
    projectName.textContent = project.name;

    projectDiv.appendChild(createListIcon());
    projectDiv.appendChild(projectName);

    projectsContainer.appendChild(projectDiv);

    projectDiv.addEventListener("click", () => {
        currentProject = project;
        categorySelected = false;
        displayProject(project);
    })
}

function createProject(project) {

    // first list project in sidebar
    listProject(project);

    // add project to local storage
    projectMap.set(project.name, project);
    localStorage.setItem("projectMap", JSON.stringify(Array.from(projectMap.entries())));
}

function displayToDo(todoItem) {
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
    todoDetailsText.textContent = "Details";
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

    // Event handlers
    todoCheckBox.addEventListener("click", (event) => {
        const checkSVG = createCheckIcon();
        if (!todoCheckBox.hasChildNodes()) {
            todoCheckBox.appendChild(checkSVG);
        }
        else {
            todoCheckBox.innerHTML = "";
        }
        if (!todo.classList.contains("completed")) {
            todo.classList.add("completed");
        }
        else {
            todo.classList.remove("completed");
        }
        todoItem.completed = !todoItem.completed;
        projectMap.set(currentProject.name, currentProject);
        localStorage.setItem("projectMap", JSON.stringify(Array.from(projectMap)));

        event.preventDefault();
    })

    todoDetails.addEventListener("click", () => {
        const detailsDialogText = document.querySelector(".details-dialog p");
        detailsDialogText.textContent = todoItem.details;
        detailsDialog.showModal();
    })
    
    xSVG.addEventListener("click", () => {
        currentProject.todos = currentProject.todos.filter(todo => todo !== todoItem); // return only the todos that isn't the one in argument (deleting it)
        projectMap.set(currentProject.name, currentProject);
        localStorage.setItem("projectMap", JSON.stringify(Array.from(projectMap)));

        if (categorySelected) {
            updateCategoryLists();
            displayCategory(currentCategory);
        }
        else {
            displayProject(currentProject);
        }
    })
}

function displayProject(project) {
    document.querySelector(".content > svg").style.display = "block";

    const todoContainer = document.querySelector(".todos-container");
    todoContainer.innerHTML = "";
    const projectHeading = document.querySelector(".project-name h1");
    projectHeading.textContent = project.name;

    const addToDo = document.querySelector(".add-todo");
    addToDo.style.display = "flex";

    for (const todoItem of project.todos) {
        console.log(todoItem);
        if (!todoItem.completed){
            displayToDo(todoItem);
        }
    }
}

// Event Listeners

let sidebarIsOpen = true;
const sidebarButton = document.querySelector(".sidebar-header svg");
sidebarButton.addEventListener("click", () => {
    if (sidebarIsOpen) {

    }
})

// Create Project Functionality
const openCreateProjectButton = document.querySelector(".projects-header svg")

const ProjectDialog = document.querySelector(".project-dialog")
openCreateProjectButton.addEventListener("click", () => {
    ProjectDialog.showModal()
})

const closeProjectButton = document.querySelector(".project-dialog svg");
closeProjectButton.addEventListener("click", () => {
    ProjectDialog.close();
})

const createProjectButton = document.querySelector(".create-project button");
createProjectButton.addEventListener("click", (event) => {
    event.preventDefault();

    const projectNameInput = document.querySelector(".project-dialog #project-name");
    const projectName = projectNameInput.value;
    const projectNameForm = document.querySelector(".project-dialog form")
    const usedProjectName = document.querySelector(".project-dialog p");

    if (!projectMap.has(projectName)) {
        let project = new Project(projectName);
        createProject(project);
        usedProjectName.textContent = "";
        ProjectDialog.close();
        projectNameForm.reset();
    } else {
        usedProjectName.textContent = "project name already used";
    }
})

// Create ToDo Functionality
const todoDialog = document.querySelector(".todo-dialog")

const openCreateToDoButton = document.querySelector(".add-todo");
openCreateToDoButton.addEventListener("click", () => {
    todoDialog.showModal()
})

const closeToDoButton = document.querySelector(".todo-dialog svg");
closeToDoButton.addEventListener("click", () => {
    todoDialog.close();
})

const createToDoButton = document.querySelector(".create-todo button");
createToDoButton.addEventListener("click", (event) => {
    event.preventDefault();

    const createToDoForm = document.querySelector(".create-todo form")

    const todoNameInput = document.getElementById("todo-name");
    const todoDateInput = document.getElementById("due-date");
    const todoDetailsInput = document.getElementById("todo-details");

    const todoName = todoNameInput.value;
    let todoDate;

    if (todoDateInput.value) {
        todoDate = format(parseISO(todoDateInput.value), "MM/dd/yyyy");
    }

    const todoDetails = todoDetailsInput.value;

    const lowPriority = document.getElementById("priority-low");
    const mediumPriority = document.getElementById("priority-medium");
    const highPriority = document.getElementById("priority-high");

    let selectedPriority;

    // Check for priority
    if (lowPriority.checked) {
        selectedPriority = "low";
    }
    else if (mediumPriority.checked) {
        selectedPriority = "medium";
    }
    else if (highPriority.checked) {
        selectedPriority = "high";
    }

    let todoItem = new ToDoItem(todoName, todoDate, todoDetails, selectedPriority);
    currentProject.todos.push(todoItem);
    projectMap.set(currentProject.name, currentProject);
    localStorage.setItem("projectMap", JSON.stringify(Array.from(projectMap)));
    displayToDo(todoItem);

    todoDialog.close();

    createToDoForm.reset();
})

// Create Details Functionality

const detailsDialog = document.querySelector(".details-dialog");
const closeDetails = document.querySelector(".details-dialog svg");

closeDetails.addEventListener("click", () => {
    detailsDialog.close();
})

// Delete ToDos

// Delete Project

document.querySelector(".content > svg").addEventListener("click", () => {
    console.log(projectMap);
    console.log(currentProject);

    projectMap.delete(currentProject.name);
    localStorage.setItem("projectMap", JSON.stringify(Array.from(projectMap)));
    const projectsContainer = document.querySelector(".projects-container");
    projectsContainer.innerHTML = "";
    for (const [projectName, project] of projectMap){
        listProject(project);
    }
    displayCategory("today");
})


