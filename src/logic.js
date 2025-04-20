class ToDoItem {
    constructor(name, date, details, priority) {
        this.name = name;
        this.date = date;
        this.details = details;
        this.priority = priority;
        this.completed = false;
    }
}

class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }
}

let todayCategoryList = [];
let upcomingCategoryList = [];
let completedCategoryList = [];

export {ToDoItem, Project, todayCategoryList, upcomingCategoryList, completedCategoryList}