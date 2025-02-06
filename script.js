let tasks = [];

function addTask() {
    let taskText = document.getElementById("taskInput").value.trim();
    let personText = document.getElementById("personInput").value.trim();
    let statusText = document.getElementById("statusInput").value;
    let deadlineText = document.getElementById("deadlineInput").value;

    if (taskText !== "") {
        tasks.push({ task: taskText, person: personText, status: statusText, deadline: deadlineText });
        updateTaskList();
        saveTasks();
        clearInputs();
    }
}

function updateTaskList() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td contenteditable="true">${task.task}</td>
            <td contenteditable="true">${task.person}</td>
            <td>
                <select onchange="updateStatus(${index}, this.value)">
                    <option value="Pending" ${task.status === "Pending" ? "selected" : ""}>Pending</option>
                    <option value="In Progress" ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
                    <option value="Completed" ${task.status === "Completed" ? "selected" : ""}>Completed</option>
                </select>
            </td>
            <td contenteditable="true">${task.deadline}</td>
            <td><button onclick="removeTask(${index})">❌</button></td>
        `;
        taskList.appendChild(row);
    });
}

function removeTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
    saveTasks();
}

function updateStatus(index, newStatus) {
    tasks[index].status = newStatus;
    saveTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        updateTaskList();
    }
}

function clearInputs() {
    document.getElementById("taskInput").value = "";
    document.getElementById("personInput").value = "";
    document.getElementById("statusInput").value = "Pending";
    document.getElementById("deadlineInput").value = "";
}

function updateLinks() {
    let docLink = document.getElementById("docLink").value.trim();
    let tasksLink = document.getElementById("tasksLink").value.trim();
    let notesLink = document.getElementById("notesLink").value.trim();

    if (docLink) localStorage.setItem("projectDoc", docLink);
    if (tasksLink) localStorage.setItem("tasks", tasksLink);
    if (notesLink) localStorage.setItem("notes", notesLink);

    loadLinks();
}

function loadLinks() {
    let projectDoc = localStorage.getItem("projectDoc") || "#";
    let tasks = localStorage.getItem("tasks") || "#";
    let notes = localStorage.getItem("notes") || "#";

    document.getElementById("projectDoc").href = projectDoc;
    document.getElementById("tasks").href = tasks;
    document.getElementById("notes").href = notes;
}

window.onload = function () {
    loadTasks();
    loadLinks();
};

function updateLinks() {
    let docURL = document.getElementById("docLink").value.trim();
    let tasksURL = document.getElementById("tasksLink").value.trim();
    let notesURL = document.getElementById("notesLink").value.trim();

    if (docURL) document.getElementById("docButton").href = docURL;
    if (tasksURL) document.getElementById("tasksButton").href = tasksURL;
    if (notesURL) document.getElementById("notesButton").href = notesURL;
}
