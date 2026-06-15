const defaultTasks = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");
const itemTemplate = document.getElementById("to-do__item-template");
const tasksStorageKey = "tasks";

function loadTasks() {
  const savedTasks = localStorage.getItem(tasksStorageKey);
  const tasks = savedTasks ? JSON.parse(savedTasks) : defaultTasks;

  tasks.forEach((task) => {
    listElement.append(createItem(task));
  });

  saveTasks(tasks);
}

function createItem(task) {
  const itemElement = itemTemplate.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = itemElement.querySelector(".to-do__item-text");
  const deleteButton = itemElement.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = itemElement.querySelector(".to-do__item-button_type_duplicate");
  const editButton = itemElement.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = task;

  deleteButton.addEventListener("click", () => {
    itemElement.remove();
    saveTasks(getTasksFromDOM());
  });

  duplicateButton.addEventListener("click", () => {
    listElement.prepend(createItem(textElement.textContent));
    saveTasks(getTasksFromDOM());
  });

  editButton.addEventListener("click", () => {
    textElement.setAttribute("contenteditable", "true");
    textElement.focus();
  });

  textElement.addEventListener("blur", () => {
    textElement.setAttribute("contenteditable", "false");
    saveTasks(getTasksFromDOM());
  });

  return itemElement;
}

function getTasksFromDOM() {
  const taskTextElements = listElement.querySelectorAll(".to-do__item-text");

  return Array.from(taskTextElements, (taskTextElement) => taskTextElement.textContent);
}

function saveTasks(tasks) {
  localStorage.setItem(tasksStorageKey, JSON.stringify(tasks));
}

formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newTask = inputElement.value.trim();

  if (!newTask) {
    return;
  }

  listElement.prepend(createItem(newTask));
  saveTasks(getTasksFromDOM());
  formElement.reset();
});

loadTasks();
