import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../App.css';

export default function TodoForm(props)
{
    const [todoInput, setTodoInput] = useState('');
    function handleInput(event)
    {
        setTodoInput(event.target.value);
    }
    function handleSubmit(event)
    {
        event.preventDefault();
        if(todoInput.trim().length === 0)
        {
            return;
        }
        setTodoInput('');

        props.addTodo(todoInput);
    }
    return (
        <form action="#" onSubmit={handleSubmit} style={{width:'100%'}}>
            <input type="text"
                   placeholder="What do you need to do?"
                   value={todoInput}
                   onChange={handleInput}
            />
        </form>
    );
}