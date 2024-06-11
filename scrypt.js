let tasks = [];
let taskId = 1;
let editingTaskId = null;

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if(taskText === "") return;

    const task = {
        id: taskId++,
        text: taskText,
        completed: false
    };

    tasks.push(task);
    updateTaskList();
    taskInput.value = "";
}

function updateTaskList(){
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.classList.add("task-item");

        const taskContent = editingTaskId === task.id ? `<input type="text" class="editingTaskInput" id="editingTaskInput_${task.id}" value="${task.text}">` : `<span class="${task.completed ? "completed-task" : ""}">${task.text}</span>`;
        const editIcon = editingTaskId === task.id ? "&#10004;" : "&#9998;";
        const completionIcon = task.completed ? "&#10060;" : "&#10004;";


        li.innerHTML = `
        ${taskContent}
        <span>
        <button onclick="editTask(${task.id})" id="editingTaskInput_" class="editingTaskInput">${editIcon}</button>
        <button onclick="deleteTask(${task.id})" id="trash">&#128465;</button>
        <button onclick="toggleTaskCompletion(${task.id})" id="completed-task">${completionIcon}</button>
        </span>
        `;
        taskList.appendChild(li);
    });

    updateProgress();
}

function updateProgress(){
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progressPercent = (completedTasks / totalTasks) * 100;
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = progressPercent + "%";
}

function toggleTaskCompletion(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        updateTaskList();
    }
}

function editTask(id){
    const task = tasks.find(task => task.id === id);
    if(task){
        // Verifica se a tarefa ja esta em edicao para salvas as alteracoes
        if(editingTaskId === task.id){
            const editingTaskInput = document.getElementById(`editingTaskInput_${task.id}`);
            const newText = editingTaskInput.value.trim();
            if(newText !== "") {
                task.text = newText;
                editingTaskId = null;
                updateTaskList();
            }
        } else {
            editingTaskId = task.id;
            updateTaskList();
        }
    }
}

function deleteTask(id){
    tasks = tasks.filter(task => task.id !== id);
    updateTaskList();
}