// Select elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
// Add task
addTaskBtn.addEventListener("click", function() {
const taskText = taskInput.value.trim();

    if (taskText === "") {
    alert("Please enter a task!");
    return;
    }

// Create a new list item
const li = document.createElement("li");
// Task text span
const span = document.createElement("span");
span.textContent = taskText;
// Complete button
const completeBtn = document.createElement("button");
completeBtn.textContent = "✔";
completeBtn.className = "complete-btn";
// Delete button
const deleteBtn = document.createElement("button");
deleteBtn.textContent = "✖";
deleteBtn.className = "delete-btn";
// Event for complete
completeBtn.addEventListener("click", function() {
    span.classList.toggle("completed");
});

// Event for delete
deleteBtn.addEventListener("click", function() {
    taskList.removeChild(li);
});
// Append everything
li.appendChild(span);
li.appendChild(completeBtn);
li.appendChild(deleteBtn);
taskList.appendChild(li);
// Clear input
taskInput.value = "";
});
