class ToDoItem {
    constructor(name, date, details, priority) {
        this.name = name;
        this.date = date;
        this.details = details;
        this.priority = priority;
        this.completed = false;
    }
    completeToDo() {
        this.completed = true;
    }
}

class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }
    addToDo(todo) {
        this.todos.push(todo)
    }
}

let todayCategory = [];
let upcomingCategory = [];
let completedCategory = [];

export {ToDoItem, Project, todayCategory, upcomingCategory, completedCategory}