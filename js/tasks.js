window.ToDoList = {

    API_URL: "http://localhost:8082/tasks",

    createTask: function () {

        const descriptionValue = $('#task-description').val();
        const deadlineValue = $("#task-deadline").val();

        let body = {
            description: descriptionValue,
            deadline: deadlineValue
        };

        $.ajax({
            url: ToDoList.API_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(body)

        }).done(function (){
            ToDoList.getTasks();
        });
    },

    getTasks: function () {
        $.ajax({
            url: ToDoList.API_URL,
            method: "GET",
        }).done(function (response) {
            ToDoList.displayTasks(JSON.parse(response));
        });
    },

    getTaskRow: function (task) {

        let formatedDeadline = new Date(...task.deadline).toLocaleDateString("ro");

        let checkedAtribute = task.done ? "checked" : "";

        return `
            <tr>
                <td>${task.description}</td>
                <td>${formatedDeadline}</td>
                <td><input type="checkbox" class="mark-done" data-id=${task.id} ${checkedAtribute}></td>
                <td><a href="#"  class="delete-link" data-id=${task.id}><i class="fas fa-trash-alt"></i></a></td>
            </tr>
        `
    },

    displayTasks: function (tasks) {
        let tasksHtml = '';

        tasks.forEach(task => tasksHtml += ToDoList.getTaskRow(task));

        $('#tasks tbody').html(tasksHtml);
    },

    bindEvents: function () {
        $('#create-task-form').submit(function (event) {
            event.preventDefault();

            ToDoList.createTask();
        });
    }
};
ToDoList.getTasks();
ToDoList.bindEvents();