const inputBox = document.getElementById("textArea");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("list");

let editTodo = null;
const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("write something to add");
    return false;
  }
  if (addBtn.value === "Edit") {
    editTodo.target.previousElementSibling.innerHTML = inputText;
    addBtn.value = "Add";
    inputBox.value = "";
    editLocalTodos(currentTodo);
  } else {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "editBtn");
    li.appendChild(editBtn);
    const importantBtn = document.createElement("button");
    importantBtn.innerText = "Important";
    importantBtn.classList.add("btn", "importantBtn");
    li.appendChild(importantBtn);
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Done"; //2
    deleteBtn.classList.add("btn", "deleteBtn");
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
    inputBox.value = "";
    saveLocal(inputText);
  }
};
const saveLocal = (Task) => {
  let todo = [];
  if (localStorage.getItem("Task") === null) {
    todo = [];
  } else {
    todo = JSON.parse(localStorage.getItem("Task"));
  }
  todo.push(Task);
  localStorage.setItem("Task", JSON.stringify(todo));
};
const getLocalStorage = () => {
  let todo = [];
  if (localStorage.getItem("Task") === null) {
    todo = [];
  } else {
    todo = JSON.parse(localStorage.getItem("Task"));
    todo.forEach((element) => {
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = element;
      li.appendChild(p);
      const importantBtn = document.createElement("button");
      importantBtn.innerText = "Important";
      importantBtn.classList.add("btn", "importantBtn");
      li.appendChild(importantBtn);
      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.classList.add("btn", "editBtn");
      li.appendChild(editBtn);
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Done";
      deleteBtn.classList.add("btn", "deleteBtn");
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });
  }
};

const updateTodo = (e) => {
  if (e.target.innerHTML === "Done") {
    todoList.removeChild(e.target.parentElement);
    deleteLocal(e.target.parentElement);
  } else if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "Edit";
    editTodo = e;
  } else if (e.target.classList.contains("importantBtn")) {
    e.target.parentElement.classList.toggle("important");
  }
};

const deleteLocal = (task) => {
  let todo = [];
  if (localStorage.getItem("Task") === null) {
    todo = [];
  } else {
    todo = JSON.parse(localStorage.getItem("Task"));
  }

  let taskText = task.children[0].innerHTML;
  let taskIndex = todo.indexOf(taskText);
  todo.splice(taskIndex, 1);
  localStorage.setItem("Task", JSON.stringify(todo));
};

document.addEventListener("DOMContentLoaded", getLocalStorage);
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);
