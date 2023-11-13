import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../App.css';

export default function NoTodoContainer(props)
{
    return (
        <div>
            { props.todos.map((todo,index) => (
                <div key={todo.id} className="Task">
                    <input type="checkbox"
                           onChange={ () => props.completeToDo(todo.id)}
                           checked={todo.isComplete}
                    />
                    { !todo.isEditing ?
                        (
                            <span onDoubleClick={() => props.markAsEditing(todo.id) }
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
                                onBlur={(event) => props.updateTodo(event, todo.id)}
                                onKeyDown={event => {
                                    if (event.key === 'Enter')
                                    {
                                        props.updateTodo(event,todo.id);
                                    } else if(event.key === 'Escape')
                                    {
                                        props.markAsEditing(todo.id);
                                    }
                                }}
                            />
                        )
                    }
                    <button onClick={() => props.deleteTodo(todo.id)} className="DeleteButton">
                        <FontAwesomeIcon icon="fa-solid fa-xmark" />
                    </button>
                </div>
            ))
            }
        </div>
    );
}