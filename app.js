const apiUrl = 'http://localhost:8080/tasks';

async function fetchTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = tasks.map(task => `
        <li class="task-item">
            <span class="task-title">${task.title}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        </li>
    `).join('');
}

async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const newTask = { title: taskInput.value, completed: false };
    
    if (taskInput.value.trim() !== "") {
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        });
        taskInput.value = '';
        fetchTasks();
    } else {
        alert("Task cannot be empty!");
    }
}

async function deleteTask(taskId) {
    await fetch(`${apiUrl}/${taskId}`, {
        method: 'DELETE'
    });
    fetchTasks();
}

window.onload = fetchTasks;
