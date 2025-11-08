---
# 🌟 Smart Task Manager

A **responsive, glassmorphic web application** developed as part of my **45-day Web Development Internship at ApexPlanet Software Pvt. Ltd.**  
Built using **HTML, CSS, and JavaScript**, this project helps users organize, track, and manage their daily tasks efficiently — featuring login/register authentication, task management tools, localStorage persistence, motivational quotes, and theme customization.

---

## 🧭 Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [File Structure](#file-structure)
4. [Setup & Run](#setup--run)
5. [How It Works](#how-it-works)
6. [Customization](#customization)
7. [LocalStorage Details](#localstorage-details)
8. [Troubleshooting](#troubleshooting)
9. [Future Improvements](#future-improvements)
10. [License & Contact](#license--contact)

---

## 🧠 Project Overview
The **Smart Task Manager** is a full-featured task management web application built using **vanilla JavaScript**, without any external frameworks.  
The project was built in five stages during the internship:

1. **Task 1 – Basic Task Manager:** Add, delete, complete tasks with a styled UI  
2. **Task 2 – Login & Register Pages:** Glassmorphic responsive authentication system  
3. **Task 3 – Advanced Filtering & Sorting:** API integration + progress tracking  
4. **Task 4 – Search | Edit | Export:** CSV download, edit tasks, and live search  
5. **Task 5 – Dashboard & Theme Toggle:** Light/Dark mode, reminders, and analytics summary  

This project demonstrates both **frontend development** and **UI/UX design** skills.

---

## ✨ Features

### 🧩 Core Functionalities
- Add, edit, delete, and complete tasks  
- Filter by **status** (pending/completed)  
- Sort by **deadline** or **priority**  
- Search tasks by name (live filtering)  
- Progress bar showing completion percentage  
- Export all tasks to **CSV file**  
- Persistent storage using `localStorage`  

### 🎨 UI / UX Enhancements
- Glassmorphic modern interface  
- Gradient theme (`#6a11cb → #2575fc`)  
- Smooth animations and transitions  
- Toast notifications for success messages  
- Motivational quotes via API or offline list  

### 🧠 Smart Dashboard
- Summary cards for **Total**, **Completed**, **Pending**, and **Next Due** tasks  
- Light/Dark mode toggle with preference saving  
- Real-time updates for progress and dashboard  

### 🔐 Authentication System
- Register and Login pages using `localStorage` for demo authentication  
- Username and password validation  
- Seamless navigation between pages  

---

## 🗂️ File Structure
```

task-manager/
├── index.html          # Login page
├── register.html       # Register page
├── main.html           # Task Manager dashboard
├── style.css           # All styling, themes, glassmorphism
├── login.js            # Login logic
├── register.js         # Register logic
├── script.js           # Core Task Manager functionality
├── logo.png            # App logo (replace with your own)
├── preview.jpg         # Preview image for project
└── README.md           # Documentation file

````

---

## ⚙️ Setup & Run

### 🧩 Option 1 – Run Directly
1. Download or clone the repository.  
2. Open `index.html` directly in your browser.  
3. If quotes API fails on `file://`, it automatically uses offline quotes.

### 🧩 Option 2 – Run via Local Server (Recommended)
```bash
# Python 3
python -m http.server 8000
# Open in browser:
http://localhost:8000/index.html
````

This ensures the Quotes API works properly.

---

## 🧭 How It Works

### 🏁 Login & Register

* `register.html` → Save user details to `localStorage` as `taskUsers`
* `index.html` → Validate credentials; redirects to `main.html` on success

### 📝 Task Management

* Add new tasks with **name**, **deadline**, and **priority**
* Edit tasks (prompt-based)
* Mark complete/undo toggle
* Delete tasks instantly
* Tasks persist automatically in `localStorage`

### 🔍 Search, Filter, and Sort

* Search tasks live by typing in the search bar
* Filter by **status** or **priority**
* Sort by **deadline (↑/↓)** or **priority (High → Low)**

### 💾 Export & Persistence

* Download all tasks as `SmartTaskManager_Tasks.csv`
* Data persists between sessions using browser `localStorage`

### 📊 Dashboard & Progress

* Dashboard updates live:

  * **Total Tasks**
  * **Completed Tasks**
  * **Pending Tasks**
  * **Next Due Date**
* Progress bar reflects completion percentage in real-time

### 🌙 Theme Toggle

* Switch between **Light** and **Dark** modes
* Preference stored in `localStorage` as `themeMode`

### 💬 Motivational Quotes

* Fetches quotes from **Quotable API**
* Falls back to offline curated list if offline

---

## 🎨 Customization

| Element       | File          | Notes                                              |
| ------------- | ------------- | -------------------------------------------------- |
| App Logo      | `logo.png`    | Replace with your custom logo (same filename)      |
| Preview Image | `preview.jpg` | Use your AI-generated app preview                  |
| Quotes Source | `script.js`   | Edit `fetchQuote()` to change API endpoint         |
| Storage Key   | `script.js`   | Default: `smartTasks_v2`                           |
| Theme         | `style.css`   | Edit colors in `:root` for gradient or light theme |

---

## 💾 LocalStorage Details

| Key             | Description                                       |
| --------------- | ------------------------------------------------- |
| `taskUsers`     | Stores registered user credentials                |
| `smartTasks_v2` | Stores all task data as array of objects          |
| `themeMode`     | Stores user’s theme preference ("dark" / "light") |

**Task Object Structure:**

```json
{
  "id": 1730000000000,
  "name": "Complete Internship Project",
  "deadline": "2025-11-15",
  "priority": "High",
  "completed": false
}
```

---

## 🧰 Troubleshooting

| Problem                  | Fix                                                                  |
| ------------------------ | -------------------------------------------------------------------- |
| Tasks not saving/loading | Check if `STORAGE_KEY` matches across file                           |
| Search not filtering     | Ensure `searchTask.addEventListener('input', renderTasks)` exists    |
| Quotes not loading       | Run via local server (API blocked on `file://`)                      |
| Login not working        | Verify `taskUsers` exists in localStorage                            |
| Dropdown UI odd          | Browser-specific; uses `appearance: none` CSS for consistent styling |

---

## 🚀 Future Improvements

* Push notifications for due tasks (using **Notification API**)
* Integration with Google Calendar or cloud database
* Multi-user dashboard (sync via Firebase or Node.js backend)
* Drag-and-drop task ordering
* Task reminders with alert pop-ups

---

## 📜 License & Contact

This project was created as part of the **ApexPlanet Web Development Internship Program**.
You are free to modify, improve, and use it for educational or portfolio purposes.

**Author:** P. Vamshi Krishna

**Email:** [vamship250106@gmail.com](vamship250106@gmail.com)

**LinkedIn:** [www.linkedin.com/in/vamshi-krishna-a4ba0a350](www.linkedin.com/in/vamshi-krishna-a4ba0a350)

**GitHub Repository:** [[Smart Task Manager](https://github.com/Vamshikrishan/Smart_Task_Manager)]

**Live Link** [https://celebrated-bienenstitch-c8976e.netlify.app/](https://celebrated-bienenstitch-c8976e.netlify.app/)

---

## 🖼 Preview

![Smart Task Manager Preview](Screenshot 2025-11-08 224458.png)

A clean, modern, and fully responsive web app to manage tasks effectively — built with pure HTML, CSS, and JavaScript.

---

> 🏁 *"Discipline is the bridge between goals and accomplishment."* – Jim Rohn
> — Smart Task Manager © 2025 by P. Vamshi Krishna

```

---

✅ **Instructions:**  
1. Copy **everything inside the gray box** above.  
2. Paste it into your project’s `README.md` file.  
3. Save and push it to GitHub — it will automatically format perfectly.  

---
