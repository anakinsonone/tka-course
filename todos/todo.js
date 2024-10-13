// initialize the todos from local storage, if any.
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// save todos to local storage after every new addition, updation or deletion.
const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// load todos from local storage
const loadTodos = () => {
  const savedTodos = JSON.parse(localStorage.getItem("todos"));
  if (savedTodos.length) {
    todos = savedTodos;
  }
};

const displayTodos = () => {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  todos.forEach((todo, idx) => {
    // create row element
    const row = document.createElement("tr");

    // create 1st column and add number to it.
    const numCol = document.createElement("td");
    numCol.style.fontWeight = "bold";
    numCol.innerHTML = `${idx + 1}.`;

    // create 2nd column andd add text to it.
    const todoCol = document.createElement("td");
    todoCol.innerHTML = todo.todo;

    // create edit button
    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.onclick = () => editTodo(idx);
    editButton.innerHTML = '<i class="fa fa-edit"></i>';

    // create delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = () => deleteTodo(idx);
    deleteButton.innerHTML = '<i class="fa fa-trash"></i>';

    // create a div, add edit & delete buttons to it.
    const actionBtnContainer = document.createElement("div");
    actionBtnContainer.classList.add("action-container");
    actionBtnContainer.appendChild(editButton);
    actionBtnContainer.appendChild(deleteButton);

    // add the above div to the action column.
    const actionCol = document.createElement("td");
    actionCol.appendChild(actionBtnContainer);

    // add all columns to the row.
    row.appendChild(numCol);
    row.appendChild(todoCol);
    row.appendChild(actionCol);

    // add the row to the table.
    tbody.appendChild(row);
  });
  saveTodos();
};

// Add new todo to the list.
const addTodo = () => {
  const newTodo = document.getElementById("todoText").value;

  if (newTodo === "") return;

  const newIndex = todos.length;
  todos = [...todos, { todo: newTodo }];

  const inputField = document.getElementById("todoText");
  inputField.value = "";

  displayTodos();
  saveTodos();
};

// Update an existing todo.
const updateTodo = (id) => {
  const inputField = document.getElementById("todoText");
  todos = todos.map((todo, idx) => {
    if (id === idx) {
      return { todo: inputField.value };
    } else {
      return todo;
    }
  });

  inputField.value = "";

  const addButton = document.getElementById("addTodo");
  addButton.value = "Add Todo";
  addButton.onclick = () => addTodo();

  displayTodos();
  saveTodos();
};

// Handle the editing of a todo.
const editTodo = (id) => {
  const todo = todos[id];

  const inputField = document.getElementById("todoText");
  inputField.value = todo.todo;
  const addButton = document.getElementById("addTodo");
  addButton.value = "Save Changes";
  addButton.onclick = () => updateTodo(id);

  inputField.focus();
};

// Delete todo from the list.
const deleteTodo = (id) => {
  todos.splice(id, 1);
  displayTodos();
  saveTodos();
};

// load todos from local storage and display them on page load.
window.onload = () => {
  loadTodos();
  displayTodos();
};
