class ToDoItem {
    constructor(name, date, details, priority) {
        this.name = name;
        this.date = date;
        this.details = details;
        this.priority = priority;
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

// function createToDo(name, date, details, priority) {
//     return new todoItem(name, date, details, priority)
// }

// function createProject(name)

export {ToDoItem, Project}