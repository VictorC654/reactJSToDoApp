import React, {useContext} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../App.css';
import {TodosContext} from "../context/TodosContext";
import {CSSTransition, TransitionGroup} from "react-transition-group";

export default function TodoList()
{
    const { todos, setTodos, todosFiltered, filter   } = useContext(TodosContext);
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
    function deleteTodo(id)
    {
        setTodos([...todos].filter(todo => todo.id !== id));
    }
    return (
        <div>
            <TransitionGroup component="div">
                { todosFiltered(filter).map((todo,index) => (
                    <CSSTransition id={todo.id} timeout={300} classNames="slide-horizontal">
                    <div className="Task">
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
                    </CSSTransition>
                ))
                }
            </TransitionGroup>
        </div>
    );
}