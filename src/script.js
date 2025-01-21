const input = document.getElementById("task-input");
const addButton = document.getElementById("addtask");
const taskList = document.querySelectorAll(".task-list")[0];
const form = document.getElementById("task-form");

const tasks = [];

document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    viewTasks();
});

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasks = () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks.push(...JSON.parse(storedTasks));
    }
};

const viewTasks = () => {
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            viewTasks();
            location.reload();
        });
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
};

const addTask = () => {
    const task = input.value;
    if (task !== "") {
        tasks.push(task);
        saveTasks();
        form.reset();
    }
};

form.addEventListener("submit", (e) => {
    location.reload();
    e.preventDefault();
    addTask();
    viewTasks();
});