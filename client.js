/*TODO
  Toggle Todos
  Add Todo
  Change Todo
  Delete Todo
  Completed
*/

var todoList = {
  todos: [],
  addTodo: function(todoText){
    this.todos.push({text:todoText, completed:false});
  },
  changeTodo : function(position, text){
    this.todos[position].text=text;
  },
  deleteTodo : function(position){
    this.todos.splice(position,1);
  },
  toggleCompleted : function(position){
    this.todos[position].completed =!this.todos[position].completed; 
  },
  toggleAll: function(){
    var allToggled = true;
    this.todos.forEach(function(todo){
      if(todo.completed===false)
        allToggled=false;
    })
    this.todos.forEach(function(todo){
      if(allToggled)
        todo.completed=false;
      else
        todo.completed=true;
    });
  }
};

var handlers = {
  addTodo: function(){
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value=('');
    view.displayTodos();
    },
  changeTodo:function(){
    var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
    var changeTodoTextInput = document.getElementById("changeTodoTextInput");
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber,changeTodoTextInput.value)
    changeTodoPositionInput.value=('');
    changeTodoTextInput.value=('');
    view.displayTodos();


  },
  deleteTodo:function(position){
    todoList.deleteTodo(position)  
    view.displayTodos();
  },
  toggleTodo: function(){
    var toggleTodoPositionInput = document.getElementById("toggleTodoPositionInput");  
    todoList.toggleCompleted(toggleTodoPositionInput.valueAsNumber);
    toggleTodoPositionInput.value=('');
    view.displayTodos();
  
  },
  toggleAll: function(){
    todoList.toggleAll();
    view.displayTodos();


  }
};

var view = {
  displayTodos:function(){
    var todoUl = document.querySelector('ul');
    todoUl.innerHTML=('');
   

  todoList.todos.forEach(function(todo,position){
      var todoLi = document.createElement("li");
      var toggledTodo = todo.completed;
      if(toggledTodo)
        toggledTodo = "(X) " + todo.text;
      else
        toggledTodo="( ) " + todo.text+ "    ";
      todoLi.textContent=toggledTodo;
      todoLi.id=position;
      todoLi.appendChild(this.createDeleteButton());
      todoUl.appendChild(todoLi);
    },this);
  },
  
  createDeleteButton : function(){
    var deleteButton = document.createElement("button");
    deleteButton.textContent = 'Delete';
    deleteButton.className ='deleteButton';
    return deleteButton;
  },
  setUpEventListeners:function(){
    var todosUl = document.querySelector('ul')
    todosUl.addEventListener('click',function(event){
      var elementClicked = event.target;
      if(elementClicked.className==='deleteButton'){
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();

