"use strict";

const todoInput = document.getElementById("todo-input");
const addedContainer = document.getElementById("added-container");
const inprogressContainer = document.getElementById("inprogress-container");
const doneContainer = document.getElementById("done-container");

const addedTodo = (event) => {
  if (
    event.key === "Enter" &&
    todoInput.value.length >= 21 &&
    todoInput.value.includes(" ") === false
  ) {
    return;
  } else if (
    event.key === "Enter" &&
    todoInput.value.length >= 20 &&
    todoInput.value.charAt(todoInput.value.length - 1) === " "
  ) {
    return;
  } else if (
    event.key === "Enter" &&
    todoInput.value.length >= 20 &&
    todoInput.value.charAt(todoInput.value.length - 1) === " " &&
    todoInput.value.charAt(todoInput.value.length - 2) === " "
  ) {
    return;
  } else if (event.key === "Enter" && todoInput.value !== "") {
    const todoItem = document.createElement("div");
    const moveBtnContainer = document.createElement("div");
    const forwardBtn = document.createElement("button");
    const textField = document.createElement("p");
    const deleteBtn = document.createElement("button");
    todoItem.setAttribute("class", "todo-item");
    moveBtnContainer.setAttribute("class", "btn-container");
    forwardBtn.setAttribute("id", "forward-btn");
    deleteBtn.setAttribute("id", "delete-btn");
    forwardBtn.innerHTML = "&#62;";
    textField.textContent = todoInput.value;
    deleteBtn.innerHTML = "&#x2715;";
    addedContainer.prepend(todoItem);
    todoItem.appendChild(moveBtnContainer);
    moveBtnContainer.appendChild(forwardBtn);
    todoItem.appendChild(textField);
    todoItem.appendChild(deleteBtn);
    todoInput.value = "";
    todoItem.addEventListener("click", clickTodoItem);
  }
};

const clickTodoItem = (event) => {
  if (event.target.id === "delete-btn") {
    event.currentTarget.remove();
  } else if (
    event.target.id === "forward-btn" &&
    event.currentTarget.parentNode.id === "added-container"
  ) {
    inprogressContainer.appendChild(event.currentTarget);
    const backBtn = document.createElement("button");
    backBtn.setAttribute("id", "back-btn");
    backBtn.innerHTML = "&#60;";
    event.currentTarget.children[0].prepend(backBtn);
  } else if (
    event.target.id === "forward-btn" &&
    event.currentTarget.parentNode.id === "inprogress-container"
  ) {
    doneContainer.prepend(event.currentTarget);
    event.currentTarget.children[1].setAttribute("class", "strike-text");
  } else if (
    event.target.id === "back-btn" &&
    event.currentTarget.parentNode.id === "inprogress-container"
  ) {
    addedContainer.prepend(event.currentTarget);
    event.target.remove();
  } else if (
    event.target.id === "back-btn" &&
    event.currentTarget.parentNode.id === "done-container"
  ) {
    inprogressContainer.appendChild(event.currentTarget);
    event.currentTarget.children[1].removeAttribute("class", "strike-text");
  }
};

todoInput.addEventListener("keypress", addedTodo);
