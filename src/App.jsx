import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css';
import Another from "./components/Another";
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
      alert("You cannot leave the input empty.")
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
          <form action="#" onSubmit={addTodo} style={{width:'100%'}}>
            <input type="text"
                   placeholder="What do you need to do?"
                   value={todoInput}
                   onChange={handleInput}
            />
          </form>
          <div className="UpdateTasks">
            { todos.map((todo,index) => (
              <div key={todo.id} className="Task">
                <input type="checkbox"
                onChange={ () => completeToDo(todo.id)}
                checked={todo.isComplete}
                />
                { !todo.isEditing ?
                    (
                        <span onDoubleClick={() => markAsEditing(todo.id) }
                                   className={!todo.isComplete ? 'label' : 'label checked'}>
                          { todo.title }
                        </span>
                    ) : (
                        <input
                               className="UpdateInput"
                               type="text"
                               defaultValue={todo.title}
                               style={{marginLeft:'1em'}}
                               autoFocus
                               onBlur={(event) => updateTodo(event, todo.id)}
                               onKeyDown={event => {
                                 if (event.key === 'Enter')
                                 {
                                   updateTodo(event,todo.id);
                                 } else if(event.key === 'Escape')
                                 {
                                   markAsEditing(todo.id);
                                 }
                               }}
                        />
                    )
                }
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
