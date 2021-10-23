


const taskList = [];

class Task {
    constructor(content) {
        this.id = Date.now();
        this.content = content;
        this.completed = false;
    }
}

function addtask(content) {
    console.log(content)
    const task = new Task(content);
    taskList.push(task);
    renderTodoList(task);
}

const form = document.getElementById('taskform');



function renderTodoList(task) {
    const list = document.getElementById('list');
    const completed = task.completed ? 'done': '';
    const todo = document.createElement('li');
    todo.innerHTML = `
        <input id="${task.id}" class="checkbox" type="checkbox"/>
        <label for="${task.content}" class="check"></label>
        <span class='taskname'>${task.content}</span>
        <button class="delete-button" ><img class="delete-button-image" src="./img/bin.png"></button>
    `;
    list.append(todo);
    document.getElementById('task').value = '';
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('task').value;
    const content = input.trim();
    if (content !== '') {
        addtask(content);
        input.value='';
    }
})

function deleteTask(id) {
    const index = taskList.findIndex(i => i.id === id)
    const todo = {
        deleted: true,
        ...taskList[index]
    };
    taskList = taskList.filter(i => i.id !== id);
    renderTodoList(todo);
}


