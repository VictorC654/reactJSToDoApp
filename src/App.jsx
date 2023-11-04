import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css';
function App() {

  const [todos, setTodos] = useState([
    {
      id:1,
      title: 'Buy milk',
      isComplete:false,
    },
    {
      id:2,
      title: 'Finish React Project',
      isComplete:false,
    },
    {
      id:3,
      title: 'Do the dishes',
      isComplete:false,
    }
  ]);
  const [todoInput, setTodoInput] = useState('');
  const [idForToDo, setIdForToDo] = useState(4);
  function handleInput(event)
  {
    setTodoInput(event.target.value);
  }
  function addTodo(event)
  {
    event.preventDefault();
    if(todoInput.trim().length === 0)
    {
      return;
    }
    setTodos([...todos, { id:idForToDo, title:todoInput, isComplete: false}]);
    setTodoInput('');
    setIdForToDo(prevState => prevState + 1);
  }
  function deleteTodo(id)
  {
    setTodos([...todos].filter(todo => todo.id !== id));
  }
  return (
    <div className="App">
      <div className="Container">
        <h1>
          Todo App
        </h1>
        <div className="FormContainer">
          <form action="#" onSubmit={addTodo}>
            <input type="text"
                   placeholder="What do you need to do?"
                   value={todoInput}
                   onChange={handleInput}
            />
          </form>
          <div className="UpdateTasks">
            { todos.map((todo,index) => (
              <div key={todo.id} className="Task">
                <input type="checkbox"/>
                <label style={{marginLeft:'1em'}}>
                  { todo.title }
                </label>
                <button onClick={() => deleteTodo(todo.id)} className="DeleteButton">
                  <FontAwesomeIcon icon="fa-solid fa-xmark" />
                </button>
              </div>
            ))
            }
          </div>
          <div className="CheckAllContainer">
            <button className="CheckAllButton">
              Check All
            </button>
            <div className="NumberOfItemsRemaining">
              3 items remaining
            </div>
          </div>
          <div className="FilterContainer">
            <button>All</button>
            <button className="ActiveButton" style={{marginLeft:'.5em'}}>Active</button>
            <button style={{marginLeft:'.5em'}}>Completed</button>
            <button style={{ marginLeft:'auto'}} className="ActiveButton">Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
