/* Smart Task Manager - Task 4
   Features: add, validate, persist, complete, delete,
             filter, sort, progress bar, quote API,
             search, edit, export
*/

// DOM elements
const taskForm = document.getElementById('taskForm');
const taskName = document.getElementById('taskName');
const taskDeadline = document.getElementById('taskDeadline');
const taskPriority = document.getElementById('taskPriority');
const addTaskBtn = document.getElementById('addTaskBtn');

const taskListEl = document.getElementById('taskList');

const errorMsg = document.getElementById('errorMsg');
const successMsg = document.getElementById('successMsg');

const statusFilter = document.getElementById('statusFilter');
const priorityFilter = document.getElementById('priorityFilter');
const sortBy = document.getElementById('sortBy');

const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');

const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const newQuoteBtn = document.getElementById('newQuoteBtn');

const searchTask = document.getElementById("searchTask");
const exportBtn = document.getElementById("exportBtn");

// localStorage key
const STORAGE_KEY = 'smartTasks_v2';

// in-memory tasks array
let tasks = [];

/* ---------- Helpers ---------- */
function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.add('visible', 'shake');
  setTimeout(() => errorMsg.classList.remove('shake'), 450);
}
function showSuccess(msg) {
  successMsg.textContent = msg;
  successMsg.classList.add('visible');
  setTimeout(() => successMsg.classList.remove('visible'), 1400);
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function priorityValue(p) {
  if (p === 'High') return 3;
  if (p === 'Medium') return 2;
  return 1;
}

/* ---------- Rendering ---------- */
function renderTasks() {
  let filtered = tasks.slice(); // create shallow copy first ✅

  // ✅ Apply search filter (must come AFTER the line above)
  const search = searchTask.value.trim().toLowerCase();
  if (search) {
    filtered = filtered.filter(t => t.name.toLowerCase().includes(search));
  }

  // Apply filters
  const status = statusFilter.value;
  const pfilter = priorityFilter.value;
  if (status !== 'all') {
    filtered = filtered.filter(t => (status === 'completed') ? t.completed : !t.completed);
  }
  if (pfilter !== 'all') filtered = filtered.filter(t => t.priority === pfilter);

  // Apply sort
  const s = sortBy.value;
  if (s === 'deadline-asc') {
    filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  } else if (s === 'deadline-desc') {
    filtered.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
  } else if (s === 'priority-desc') {
    filtered.sort((a, b) => priorityValue(b.priority) - priorityValue(a.priority));
  } else if (s === 'priority-asc') {
    filtered.sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority));
  }

  // Render
  taskListEl.innerHTML = '';
  if (filtered.length === 0) {
    const li = document.createElement('li');
    li.className = 'task-card';
    li.innerHTML = `<div class="task-details"><span>No tasks to show</span><p class="task-meta">Add tasks to get started</p></div>`;
    taskListEl.appendChild(li);
    updateProgress();
    return;
  }

  filtered.forEach(t => {
    const li = document.createElement('li');
    li.className = 'task-card' + (t.completed ? ' completed-task' : '');

    const details = document.createElement('div');
    details.className = 'task-details';
    const nameSpan = document.createElement('span');
    nameSpan.textContent = t.name;
    if (t.completed) nameSpan.classList.add('completed');

    const meta = document.createElement('p');
    meta.className = 'task-meta';
    meta.textContent = `Deadline: ${t.deadline} | Priority: ${t.priority}`;

    details.appendChild(nameSpan);
    details.appendChild(meta);

    // badge
    const badge = document.createElement('div');
    badge.className = 'badge ' + (t.priority === 'High' ? 'badge-high' :
                     (t.priority === 'Medium' ? 'badge-medium' : 'badge-low'));
    badge.textContent = t.priority;

    // buttons
    const actions = document.createElement('div');
    actions.className = 'action-btns';

    const completeBtn = document.createElement('button');
    completeBtn.className = 'action-btn complete-btn';
    completeBtn.textContent = t.completed ? 'Undo' : '✅';
    completeBtn.title = 'Mark complete';

    const editBtn = document.createElement('button');
    editBtn.textContent = '✎';
    editBtn.className = 'action-btn edit-btn';
    editBtn.addEventListener('click', () => {
      const newName = prompt('Edit task name:', t.name);
      const newDeadline = prompt('Edit deadline (YYYY-MM-DD):', t.deadline);
      const newPriority = prompt('Edit priority (High/Medium/Low):', t.priority);
      if (newName && newDeadline && newPriority) {
        t.name = newName;
        t.deadline = newDeadline;
        t.priority = newPriority;
        saveTasks();
        renderTasks();
        showSuccess('Task updated successfully!');
      }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'action-btn delete-btn';
    deleteBtn.textContent = '🗑';
    deleteBtn.title = 'Delete';

    completeBtn.addEventListener('click', () => {
      t.completed = !t.completed;
      saveTasks();
      renderTasks();
      showSuccess(t.completed ? 'Task marked completed' : 'Marked as pending');
    });

    deleteBtn.addEventListener('click', () => {
      const idx = tasks.findIndex(x => x.id === t.id);
      if (idx > -1) {
        tasks.splice(idx, 1);
        saveTasks();
        renderTasks();
        showSuccess('Task deleted');
      }
    });

    actions.appendChild(badge);
    actions.appendChild(editBtn);
    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(details);
    li.appendChild(actions);
    taskListEl.appendChild(li);
  });

  updateProgress();
}


/* ---------- Progress ---------- */
function updateProgress() {
  if (tasks.length === 0) {
    progressBar.style.width = '0%';
    progressText.textContent = '0%';
    return;
  }
  const completed = tasks.filter(t => t.completed).length;
  const pct = Math.round((completed / tasks.length) * 100);
  progressBar.style.width = pct + '%';
  progressText.textContent = pct + '%';
}

/* ---------- Task operations ---------- */
taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = taskName.value.trim();
  const deadline = taskDeadline.value;
  const priority = taskPriority.value;

  if (!name || !deadline || !priority) {
    showError('Please fill all fields');
    return;
  }

  const newTask = {
    id: Date.now(),
    name,
    deadline,
    priority,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  showSuccess('Task added successfully!');

  taskName.value = '';
  taskDeadline.value = '';
  taskPriority.value = '';
});

/* ---------- Filters / sorting events ---------- */
statusFilter.addEventListener('change', renderTasks);
priorityFilter.addEventListener('change', renderTasks);
sortBy.addEventListener('change', renderTasks);
searchTask.addEventListener('input', renderTasks);

/* ---------- Quotes ---------- */
const localQuotes = [
  { content: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
  { content: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery" },
  { content: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
  { content: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { content: "Great things are done by a series of small things brought together.", author: "Vincent van Gogh" },
  { content: "Dream big. Start small. Act now.", author: "Robin Sharma" },
  { content: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { content: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { content: "Either you run the day, or the day runs you.", author: "Jim Rohn" }
];

let usedQuotes = new Set();

async function fetchQuote() {
  try {
    const res = await fetch('https://api.quotable.io/random');
    if (res.ok) {
      const data = await res.json();
      displayQuote(data.content, data.author);
      return;
    }
  } catch {}

  if (usedQuotes.size === localQuotes.length) usedQuotes.clear();
  let idx;
  do { idx = Math.floor(Math.random() * localQuotes.length); }
  while (usedQuotes.has(idx));
  usedQuotes.add(idx);
  const q = localQuotes[idx];
  displayQuote(q.content, q.author);
}

function displayQuote(text, author) {
  quoteText.textContent = `"${text}"`;
  quoteAuthor.textContent = `— ${author}`;
}

newQuoteBtn.addEventListener('click', fetchQuote);

/* ---------- Export CSV ---------- */
exportBtn.addEventListener('click', () => {
  if (tasks.length === 0) {
    showError('⚠ No tasks to export!');
    return;
  }
  let csv = 'Task Name,Deadline,Priority,Completed\n';
  tasks.forEach(t => {
    csv += `${t.name},${t.deadline},${t.priority},${t.completed ? 'Yes' : 'No'}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'SmartTaskManager_Tasks.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showSuccess('✅ Tasks exported successfully!');
});

/* ---------- Initialization ---------- */
function init() {
  tasks = loadTasks();
  renderTasks();
  fetchQuote();
}
searchTask.addEventListener('input', renderTasks);
window.addEventListener('DOMContentLoaded', init);
