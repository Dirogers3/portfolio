


let taskList = [];

function rendertaskList(task) {
  localStorage.setItem('taskList', JSON.stringify(taskList));

  const list = document.querySelector('.task-list');
  const item = document.querySelector(`[data-key='${task.id}']`);
  
  if (task.deleted) {
    item.remove();
    if (taskList.length === 0) list.innerHTML = '';
    return
  }
  const isChecked = task.isCompleted ? 'done': '';
  const node = document.createElement("li");
  node.setAttribute('class', `task-item ${isChecked}`);
  node.setAttribute('data-key', task.id);
  node.innerHTML = `
    <input id="${task.id}" type="checkbox" />
    <label for="${task.id}" class="check"></label>
    <span class="task-name">${task.content}</span>
    <button class="delete-task">
    </button>`;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
  displayNumberOfTasks();
}


function renderCompletedTaskList(task) {
    localStorage.setItem('taskList', JSON.stringify(taskList));
  
    const list = document.querySelector('.task-list');
    const item = document.querySelector(`[data-key='${task.id}']`);
    
    if (task.deleted) {
      item.remove();
      if (taskList.length === 0) list.innerHTML = '';
      return
    }
    const isChecked = task.isCompleted ? 'done': '';
    const node = document.createElement("li");
    node.setAttribute('class', `task-item ${isChecked}`);
    node.setAttribute('data-key', task.id);
    node.innerHTML = `
    <input id="${task.id}" type="checkbox" />
    <label for="${task.id}" class="check"></label>
    <span class="task-name">${task.content}</span>
    <button class="delete-task">
    </button>`;
  
    if (item) {
      list.replaceChild(node, item);
    } else {
      list.append(node);
    }
    displayNumberOfTasks();
  }



function addTask(content) {
  const task = {
    content: content,
    isCompleted: false,
    id: Date.now(),
  };
  taskList.push(task);
  rendertaskList(task);
}

const form = document.querySelector('.task-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.task-input');

  const content = input.value;
  if (content !== '') {
    addTask(content);
    input.value = '';
    input.focus();
  }
});

function isDone(key) {
  const index = taskList.findIndex(item => item.id === Number(key));
  taskList[index].isCompleted = !taskList[index].isCompleted;
  rendertaskList(taskList[index]);
}

function deleteTask(key) {
  const index = taskList.findIndex(item => item.id === Number(key));
  const task = {
    deleted: true,
    ...taskList[index]
  };
  taskList = taskList.filter(item => item.id !== Number(key));
  displayNumberOfTasks();
  rendertaskList(task);
}



const list = document.querySelector('.task-list');
list.addEventListener('click', event => {
  if (event.target.classList.contains('check')) {
    const itemKey = event.target.parentElement.dataset.key;
    isDone(itemKey);
  }
  if (event.target.classList.contains('delete-task')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTask(itemKey);
  }
  
});

document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('taskList');
  if (ref) {
    taskList = JSON.parse(ref);
    taskList.forEach(t => {
      rendertaskList(t);
    });
  }
});

function displayNumberOfTasks() {
    const tasksleft = document.getElementById('tasks-left');
    tasksleft.innerHTML= tasksLeft(taskList) + " tasks left";
}

function tasksLeft(taskList) {
    let total = 0; 
    taskList.forEach(e => {
        if (!e.isCompleted) {
            total += 1;
        }
    });
    return total;
}

