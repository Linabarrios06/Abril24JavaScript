document.addEventListener('DOMContentLoaded', function() {
    // Objeto TaskManager
    const TaskManager = {
        tasks: [],

        addTask: function(taskDescription) {
            const task = {
                id: this.tasks.length + 1,
                description: taskDescription
            };
            this.tasks.push(task);
        },

        editTask: function(taskId, newDescription) {
            const taskIndex = this.tasks.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                this.tasks[taskIndex].description = newDescription;
            }
        },

        deleteTask: function(taskId) {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
        },

        render: function() {
            const taskListContainer = document.getElementById('taskList');
            taskListContainer.innerHTML = ''; // Limpiar el contenedor antes de renderizar las tareas

            this.tasks.forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.textContent = task.description;

                // Botón para editar
                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.addEventListener('click', function() {
                    const newDescription = prompt('Ingrese la nueva descripción:');
                    if (newDescription !== null) {
                        TaskManager.editTask(task.id, newDescription);
                        TaskManager.render();
                    }
                });

                // Botón para borrar
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Borrar';
                deleteButton.addEventListener('click', function() {
                    TaskManager.deleteTask(task.id);
                    TaskManager.render();
                });

                taskItem.appendChild(editButton);
                taskItem.appendChild(deleteButton);

                taskListContainer.appendChild(taskItem);
            });
        }
    };

    // Evento de envío del formulario
    document.getElementById('taskForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el comportamiento por defecto de envío del formulario

        const taskInput = document.getElementById('taskInput');
        const taskDescription = taskInput.value.trim();

        if (taskDescription !== '') {
            TaskManager.addTask(taskDescription);
            TaskManager.render();
            taskInput.value = ''; // Limpiar el campo de entrada después de agregar la tarea
        }
    });

    // Renderizar tareas inicialmente
    TaskManager.render();
});
