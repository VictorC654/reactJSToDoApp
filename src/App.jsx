import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css';
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import NoTodoContainer from "./components/NoTodoContainer";
import TodoItemsRemaining from "./components/TodoItemsRemaining";
import TodoCheckAllButton from "./components/TodoCheckAllButton";
import TodosFilter from "./components/TodosFilter"
function App() {
  const [todos, setTodos] = useState([
    {
      id:1,
      title: 'Buy milk',
      isComplete:false,
      isEditing:false,
    },
    {
      id:2,
      title: 'Finish React Project',
      isComplete:false,
      isEditing:false,
    },
    {
      id:3,
      title: 'Do the dishes',
      isComplete:true,
      isEditing:false,
    }
  ]);
  const [idForToDo, setIdForToDo] = useState(4);
  function addTodo(todo)
  {
    setTodos([...todos, { id:idForToDo, title:todo, isComplete: false}]);
    setIdForToDo(prevState => prevState + 1);
  }
  function deleteTodo(id)
  {
    setTodos([...todos].filter(todo => todo.id !== id));
  }
  function completeToDo(id)
  {
    const updatedTodo = todos.map(todo=> {
        if(todo.id === id)
        {
          todo.isComplete = !todo.isComplete;
        }
        return todo;
    });
    setTodos(updatedTodo);
  }
  function completeAllTodos()
  {
    const updatedTodo = todos.map(todo=> {
        todo.isComplete = true;
      return todo;
    });
    setTodos(updatedTodo);
  }
  function clearCompletedTodos()
  {
    setTodos(current => current.filter(todo => {
      return todo.isComplete !== true;
    }))
  }
  function markAsEditing(id)
  {
      const updatedTodo = todos.map(todo => {
        if(todo.id === id)
        {
          todo.isEditing = !todo.isEditing;
        }
        return todo;
      })
    setTodos(updatedTodo);
  }

  function updateTodo(event, id)
  {
    console.log(event.target.value);
    if(event.target.value.length === 0)
    {
      return;
    }
    const updatedTodo = todos.map(todo => {
      if(todo.id === id)
      {
        todo.title = event.target.value;
      }
      todo.isEditing = false;
      return todo;
    });
    setTodos(updatedTodo);
  }

  function todosFiltered(filter)
  {
    if(filter === "all")
    {
      return todos;
    }
    if(filter === "active")
    {
      return todos.filter(todo => !todo.isComplete);
    }
    if(filter === "completed")
    {
      return todos.filter(todo => todo.isComplete);
    }
  }

  const [filter, setFilter] = useState("all");

  return (
    <div className="App" style={{display:'flex',flexDirection:'column',alignItems:'center',}}>
      <div className="Container" style={{marginTop:'2em'}}>
        <h1>
          Todo App
        </h1>
        <div className="FormContainer">
          <TodoForm addTodo={addTodo} />
          {todos.length > 0 ? ( <div>
            <div className="UpdateTasks">
                  <TodoList completeToDo={completeToDo}
                            todos={todos}
                            todosFiltered={todosFiltered}
                            markAsEditing={markAsEditing}
                            deleteTodo={deleteTodo}
                            updateTodo={updateTodo}
                            filter={filter}
                  />
            </div>
            <div className="CheckAllContainer">
              <TodoCheckAllButton completeAllTodos={completeAllTodos} />
              <TodoItemsRemaining todos={todos} />
            </div>
              <TodosFilter clearCompletedTodos={clearCompletedTodos}
                           filter={filter}
                           setFilter={setFilter}
                           todosFiltered={todosFiltered}
              />
          </div> ) : (<NoTodoContainer />)
          }
      </div>
      </div>
    </div>
  );
}
export default App;
