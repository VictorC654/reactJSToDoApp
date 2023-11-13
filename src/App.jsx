import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css';
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import NoTodoContainer from "./components/NoTodoContainer";
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

  return (
    <div className="App" style={{display:'flex',flexDirection:'column',alignItems:'center',}}>
      {/*<Another />*/}
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
                            markAsEditing={markAsEditing}
                            deleteTodo={deleteTodo}
                            updateTodo={updateTodo}
                  />
            </div>
            <div className="CheckAllContainer">
              <button className="CheckAllButton">
                Check All
              </button>
              <div className="NumberOfItemsRemaining">
                { todos.length } items remaining
              </div>
            </div>
            <div className="FilterContainer">
              <button>All</button>
              <button className="ActiveButton" style={{marginLeft:'.5em'}}>Active</button>
              <button style={{marginLeft:'.5em'}}>Completed</button>
              <button style={{ marginLeft:'auto'}} className="ActiveButton">Clear completed</button>
            </div>
          </div> ) : (<NoTodoContainer />)
          }
      </div>
      </div>
    </div>
  );
}
export default App;
