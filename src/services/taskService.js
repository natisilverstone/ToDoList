import { v4 } from "uuid";

const KEYS = {
  tasks: "tasks",
};

export function insertTask(data) {
  let tasks = getAllTasks();
  data.id = v4();
  tasks.push(data);
  localStorage.setItem(KEYS.tasks, JSON.stringify(tasks));
}

export function updateTask(data) {
  let tasks = getAllTasks();
  let recordIndex = tasks.findIndex((task) => task.id == data.id);
  tasks[recordIndex] = { ...data };
  console.log(tasks[recordIndex]);
  localStorage.setItem(KEYS.tasks, JSON.stringify(tasks));
}

export function deleteTask(data) {
  let tasks = getAllTasks();
  let updateTasks = tasks.filter((task) => task.id != data.id);
  localStorage.setItem(KEYS.tasks, JSON.stringify(updateTasks));
}

export function getAllTasks() {
  if (localStorage.getItem(KEYS.tasks) == null) {
    localStorage.setItem(KEYS.tasks, JSON.stringify([]));
  }
  let tasks = JSON.parse(localStorage.getItem(KEYS.tasks));
  return tasks;
}

