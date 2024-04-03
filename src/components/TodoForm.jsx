import React, {useContext, useState} from 'react';
import '../App.css';
import {TodosContext} from "../context/TodosContext";

export default function TodoForm()
{
    const [todoInput, setTodoInput] = useState('');
    const todosContext = useContext(TodosContext);
    function handleInput(event)
    {
        setTodoInput(event.target.value);
    }
    function addTodo(todo)
    {
        todosContext.setTodos([...todosContext.todos, { id:todosContext.idForToDo, title:todo, isComplete: false}]);
        todosContext.setIdForToDo(prevState => prevState + 1);
    }
    function handleSubmit(event) {
        event.preventDefault();
        if (todoInput.trim().length === 0) {
            return;
        }
        setTodoInput('');

        addTodo(todoInput);
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