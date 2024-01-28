import React, {useEffect, useMemo, useRef, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css';
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import NoTodoContainer from "./components/NoTodoContainer";
import TodoItemsRemaining from "./components/TodoItemsRemaining";
import TodoCheckAllButton from "./components/TodoCheckAllButton";
import TodosFilter from "./components/TodosFilter"
import useToggle from "./hooks/useToggle";
import useLocalStorage from "./hooks/useLocalStorage";
function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [idForToDo, setIdForToDo] = useLocalStorage('idForToDo',1);
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
  const [isFeatureOneVisible, setIsFeatureOneVisible] = useToggle(false);
  const [isFeatureTwoVisible, setIsFeatureTwoVisible] = useToggle(false);
  const nameInputEl = useRef(null);
  const [name, setName] = useLocalStorage('name', JSON.parse(localStorage.getItem('name')));
  useEffect(() => {
        setName(JSON.parse(localStorage.getItem('name')));
        nameInputEl.current.focus();
  }, []);
  function handleNameInput(event)
  {
    setName(event.target.value);
    localStorage.setItem('name', JSON.stringify(event.target.value));
  }
  return (
    <div className="App" style={{display:'flex',flexDirection:'column',alignItems:'center',}}>
      <div className="Container" style={{marginTop:'2em'}}>
        <div className="UserName">
          <h3>What is your name?</h3>
          <form className="FormContainer" style={{marginBottom:".5em"}} action="">
            <input type="text"
                   ref={nameInputEl}
                   placeholder="John Doe"
                   value={name}
                   onChange={handleNameInput}
            />
          </form>
          {name && <p className="name-label">
            Hello, <b>{name}</b>.
          </p>}
        </div>
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
            <div className="toggleButtons">
              <button onClick={setIsFeatureOneVisible} style={{marginRight:".5em"}}>
                Toggle Check All Section
              </button>
              <button onClick={setIsFeatureTwoVisible} style={{marginLeft:".5em"}}>
                Toggle Filter Section
              </button>
            </div>
            {isFeatureOneVisible && <div className="CheckAllContainer">
               <TodoCheckAllButton completeAllTodos={completeAllTodos} />
              <TodoItemsRemaining todos={todos} />
            </div>}
            { isFeatureTwoVisible && <TodosFilter clearCompletedTodos={clearCompletedTodos}
                           filter={filter}
                           setFilter={setFilter}
                           todosFiltered={todosFiltered}
              />}
          </div> ) : (<NoTodoContainer />)
          }
      </div>
      </div>
    </div>
  );
}
export default App;
