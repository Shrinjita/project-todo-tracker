function saveLink(key) {
    let linkValue = document.getElementById(key).value.trim();
    if (linkValue !== "" && isValidURL(linkValue)) {
        localStorage.setItem(key, linkValue);
        alert("Link saved successfully!");
    } else {
        alert("Please enter a valid URL.");
    }
}

function openLink(key) {
    let savedLink = localStorage.getItem(key);
    if (savedLink) {
        window.open(savedLink, "_blank");
    } else {
        alert("No link saved. Please enter and save a link first.");
    }
}

function loadSavedLinks() {
    document.getElementById("docLink").value = localStorage.getItem("docLink") || "";
    document.getElementById("tasksLink").value = localStorage.getItem("tasksLink") || "";
    document.getElementById("notesLink").value = localStorage.getItem("notesLink") || "";
}

function isValidURL(url) {
    let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*' + // port and path
        '(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?' + // query string
        '(\\#[-a-zA-Z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(url);
}

let tasks = [];

function addTask() {
    let taskText = document.getElementById("taskInput").value.trim();
    let personText = document.getElementById("personInput").value.trim();
    let statusText = document.getElementById("statusInput").value;
    let deadlineText = document.getElementById("deadlineInput").value;
    let doubtText = document.getElementById("doubtInput").value.trim();

    if (doubtText.split(/\s+/).length > 20) {
        alert("Doubt must be 20 words or fewer.");
        return;
    }

    if (taskText !== "") {
        tasks.push({ task: taskText, person: personText, status: statusText, deadline: deadlineText, doubt: doubtText });
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
            <td contenteditable="true">${task.doubt}</td>
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
    localStorage.setItem("tasksList", JSON.stringify(tasks)); // Prevent overwriting "tasks" URL
}

function loadTasks() {
    let storedTasks = localStorage.getItem("tasksList");
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
    document.getElementById("doubtInput").value = ""; // Fixed: Clears "Doubt" input
}

function updateLinks() {
    let docURL = document.getElementById("docLink").value.trim();
    let tasksURL = document.getElementById("tasksLink").value.trim();
    let notesURL = document.getElementById("notesLink").value.trim();

    if (docURL) {
        localStorage.setItem("projectDoc", docURL);
        document.getElementById("docButton").href = docURL;
    }
    if (tasksURL) {
        localStorage.setItem("tasksURL", tasksURL);
        document.getElementById("tasksButton").href = tasksURL;
    }
    if (notesURL) {
        localStorage.setItem("notesURL", notesURL);
        document.getElementById("notesButton").href = notesURL;
    }
}

function loadLinks() {
    let projectDoc = localStorage.getItem("projectDoc") || "#";
    let tasksURL = localStorage.getItem("tasksURL") || "#";
    let notesURL = localStorage.getItem("notesURL") || "#";

    document.getElementById("docButton").href = projectDoc;
    document.getElementById("tasksButton").href = tasksURL;
    document.getElementById("notesButton").href = notesURL;
}

window.onload = function () {
    loadTasks();
    loadLinks();
    loadSavedLinks();
};
