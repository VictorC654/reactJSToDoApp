import React, {useEffect, useRef, useState} from "react";
import './App.css';
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import NoTodoContainer from "./components/NoTodoContainer";
import TodoItemsRemaining from "./components/TodoItemsRemaining";
import TodoCheckAllButton from "./components/TodoCheckAllButton";
import TodosFilter from "./components/TodosFilter"
import useToggle from "./hooks/useToggle";
import useLocalStorage from "./hooks/useLocalStorage";
import {TodosContext} from "./context/TodosContext";
import {CSSTransition, SwitchTransition} from "react-transition-group";
function App() {

  const [todos, setTodos] = useLocalStorage('todos', []);
  const [idForToDo, setIdForToDo] = useLocalStorage('idForToDo',1);
  const [filter, setFilter] = useState("all");
  const [isFeatureOneVisible, setIsFeatureOneVisible] = useToggle(false);
  const [isFeatureTwoVisible, setIsFeatureTwoVisible] = useToggle(false);
  const nameInputEl = useRef(null);
  const [name, setName] = useLocalStorage('name', JSON.parse(localStorage.getItem('name')));

  useEffect(() => {
    setName(JSON.parse(localStorage.getItem('name')));
    nameInputEl.current.focus();
  }, []);

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
  function handleNameInput(event)
  {
    setName(event.target.value);
    localStorage.setItem('name', JSON.stringify(event.target.value));
  }
  return (
      <TodosContext.Provider value={{ todos, setTodos, idForToDo, setIdForToDo, todosFiltered, filter, setFilter }}>
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
          <CSSTransition
          in={name.length > 0}
          classNames="slide-vertical"
          timeout={300}
          unmountOnExit>
            <p className="name-label">
              <b>{name}</b>
            </p>
          </CSSTransition>
        </div>
        <h1>
          Todo App
        </h1>
        <div className="FormContainer">
          <TodoForm />
          <SwitchTransition mode="out-in">
            <CSSTransition
                in={isFeatureOneVisible}
                timeout={300}
                key={todos.length > 0}
                classNames="slide-vertical"
                unmountOnExit
            >
              {todos.length > 0 ? ( <div>
                <div className="UpdateTasks">
                  <TodoList />
                </div>
                <div className="toggleButtons">
                  <button onClick={setIsFeatureOneVisible} style={{marginRight:".5em"}}>
                    Toggle Check All Section
                  </button>
                  <button onClick={setIsFeatureTwoVisible} style={{marginLeft:".5em"}}>
                    Toggle Filter Section
                  </button>
                </div>
                <CSSTransition
                    in={isFeatureOneVisible}
                    timeout={300}
                    classNames="slide-vertical"
                    unmountOnExit
                >
                  <div className="CheckAllContainer">
                    <TodoCheckAllButton />
                    <TodoItemsRemaining />
                  </div>
                </CSSTransition>
                <CSSTransition
                    in={isFeatureTwoVisible}
                    timeout={300}
                    classNames="slide-vertical"
                    unmountOnExit
                >
                  <TodosFilter />
                </CSSTransition>
              </div> ) : (<NoTodoContainer />)
              }
            </CSSTransition>
          </SwitchTransition>
      </div>
      </div>
    </div>
      </TodosContext.Provider>
  );
}
export default App;
