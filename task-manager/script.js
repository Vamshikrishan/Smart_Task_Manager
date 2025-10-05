// Select elements
const taskName = document.getElementById("taskName");
const taskDeadline = document.getElementById("taskDeadline");
const taskPriority = document.getElementById("taskPriority");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");
const successMsg = document.getElementById("successMsg");

// Show error
function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.add("visible", "shake");
  successMsg.classList.remove("visible");
  setTimeout(() => errorMsg.classList.remove("shake"), 400);
}

// Show success
function showSuccess(message) {
  successMsg.textContent = message;
  successMsg.classList.add("visible");
  errorMsg.classList.remove("visible");
  setTimeout(() => successMsg.classList.remove("visible"), 1500);
}

// Add Task
addTaskBtn.addEventListener("click", () => {
  const name = taskName.value.trim();
  const deadline = taskDeadline.value;
  const priority = taskPriority.value;

  if (!name || !deadline || !priority) {
    showError("⚠ Please fill in all fields!");
    return;
  }

  const deadlineDate = new Date(deadline);
  const today = new Date();
  if (deadlineDate < today) {
    showError("⚠ Deadline must be a future date!");
    return;
  }

  // Create new task item
  const li = document.createElement("li");
  const detailsDiv = document.createElement("div");
  detailsDiv.className = "task-details";

  const nameSpan = document.createElement("span");
  nameSpan.textContent = name;
  const meta = document.createElement("p");
  meta.className = "task-meta";
  meta.textContent = `Deadline: ${deadline} | Priority: ${priority}`;

  detailsDiv.appendChild(nameSpan);
  detailsDiv.appendChild(meta);

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✅";
  completeBtn.className = "complete-btn";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.className = "delete-btn";

  completeBtn.addEventListener("click", () => {
    nameSpan.classList.toggle("completed");
  });

  deleteBtn.addEventListener("click", () => {
    li.style.transform = "scale(0.9)";
    li.style.opacity = "0";
    setTimeout(() => taskList.removeChild(li), 300);
  });

  li.appendChild(detailsDiv);
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  // Clear form and show success
  taskName.value = "";
  taskDeadline.value = "";
  taskPriority.value = "";
  showSuccess("✅ Task added successfully!");
});
