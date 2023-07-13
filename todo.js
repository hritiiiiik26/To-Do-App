
const todoInput = document.getElementById("todo-input");

const todolistEl = document.getElementById("todos-list");

let todos = JSON.parse(localStorage.getItem('todos') )|| [];
let editId =-1;

//First render as we might have already exisiting todos in storage
renderTodos();
function addTodo() {
  const todoValue = todoInput.value;

  //check if todo is empty
  const isEmpty = todoValue === "";

  //check for duplicate
  const isDuplicate = todos.some(
    (todo) => todo.value.toUpperCase() === todoValue.toUpperCase()
  );

  if (isEmpty) {
    alert("Todo's input is empty");
  } else if (isDuplicate) {
    alert("entry already exists");
  } else {
    if(editId>=0){
         todos = todos.map((todo,index)=>{
                return{
                    value:index===editId?todoValue:todo.value,
                    color:todo.color,
                    checked:todo.checked
                }
            }
          );
          editId=-1;
        }
    else{
        todos.push( {
            value: todoValue,
            checked: false,
            color: "#" + Math.floor(Math.random() * 16777215).toString(16),
          });
        
    }
    todoInput.value = "";
  }
}
function renderTodos() {

    if(todos.length===0){
        todolistEl.innerHTML= '<center>Nothing To-Do</center>'
        return;
    }
  //Clear element before a re render

  todolistEl.innerHTML = "";
  todos.forEach((todo, index) => {
    todolistEl.innerHTML += `
  <div class ="todo" id =${index}>
  <i class="bi ${
    todo.checked ? "bi-check-circle-fill" : "bi-circle"
  }" style="color:${todo.color}"  data-action="check"></i>
  <p class="${ todo.checked ? "checked" : ""} " data-action="check">${todo.value}</p>
  <i class="bi bi-pencil-square" data-action="edit"></i>
  <i class="bi bi-trash" data-action="delete"></i>
  </div>
  `;
  });
}

//CLICK EVENT LISTENER FOR ALL THE TODOS

todolistEl.addEventListener("click", (event) => {
  const target = event.target;
  const parentElement = target.parentNode;
 
  if(parentElement.className !== 'todo')return;
  
  
  //getting hold if id
  const todo = parentElement;
  const todoId = Number(todo.id);

  //action on clicking respective icons
  const action = target.dataset.action

  action==='check' && checkTodo(todoId)
  action==='edit' && editTodo(todoId)
  action==='delete' && deleteTodo(todoId)


//   console.log(todoId,action);
});

function checkTodo(todoId){
    
   let newArr= todos.map((todo,index)=>{

        if(index===todoId){
            return{
                value:todo.value,
                color:todo.color,
                checked:!todo.checked
            }
        }
        else{
            
                return{
                    value:todo.value,
                    color:todo.color,
                    checked:todo.checked
                }
            
        }
    })

    todos=newArr
    renderTodos();
    localStorage.setItem('todos',JSON.stringify(todos))
}

function editTodo(todoId){
    todoInput.value = todos[todoId].value
    editId = todoId;
}

function deleteTodo(todoId){
    todos = todos.filter((todo,index)=>index!=todoId)

    //initialize editTodo=-1 so that if we delete while editing the same id doesn't get rerendered
    editId=-1
    renderTodos()
    localStorage.setItem('todos',JSON.stringify(todos))
}

submitBtn.addEventListener("click", (e) => {
    // e.preventDefault();
    console.log("working")
    addTodo();
    renderTodos();
    
    localStorage.setItem('todos',JSON.stringify(todos));
  });