let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task.text + (task.date ? ` (📅 ${task.date})` : '');
    span.className = 'task-text';
    if (task.done) span.classList.add('done');

    const btnDiv = document.createElement('div');
    btnDiv.className = 'buttons';

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.className = 'completeBtn';
    completeBtn.onclick = () => {
      tasks[index].done = true;
      saveTasks();
      renderTasks();
    };

    const undoBtn = document.createElement('button');
    undoBtn.textContent = 'Undo';
    undoBtn.className = 'undoBtn';
    undoBtn.onclick = () => {
      tasks[index].done = false;
      saveTasks();
      renderTasks();
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'deleteBtn';
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    btnDiv.appendChild(completeBtn);
    btnDiv.appendChild(undoBtn);
    btnDiv.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btnDiv);

    taskList.appendChild(li);
  });
}

addBtn.addEventListener('click', () => {
  if (taskInput.value.trim() !== '') {
    tasks.push({
      text: taskInput.value.trim(),
      done: false,
      date: taskDate.value || ''
    });
    taskInput.value = '';
    taskDate.value = '';
    saveTasks();
    renderTasks();
  }
});

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addBtn.click();
});

renderTasks();
