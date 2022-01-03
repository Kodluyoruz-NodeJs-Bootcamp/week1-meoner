const containers = document.querySelectorAll(".container");

var draggables = document.querySelectorAll(".draggable");

function getDraggables() {
  draggables = document.querySelectorAll(".draggable");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });

  containers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();

      const draggable = document.querySelector(".dragging");
      const afterElement = getDragAfterElement(container, e.clientY);

      if (afterElement == null) {
        container.appendChild(draggable);
      } else {
        container.insertBefore(draggable, afterElement);
      }
    });
  });
}

getDraggables();

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function addToDo() {
  const getDiv = document.getElementById("toDoList");
  getDiv.insertAdjacentHTML(
    "afterbegin",
    '<p class="draggable" draggable="true" contenteditable="true">Todo Item <button class="removeButton" onclick="removeToDo(this)" contenteditable="false"><img class="removeIcon" src="ic_remove.png" width="20" height="20"></button></p>'
  );
  getDraggables();
}

function removeToDo(element) {
  element.parentNode.remove();
}
