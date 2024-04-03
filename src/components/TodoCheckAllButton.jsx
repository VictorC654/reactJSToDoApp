import React, {useContext} from 'react';
import '../App.css';
import {TodosContext} from "../context/TodosContext";

export default function TodoCheckAllButton()
{
    const { todos, setTodos } = useContext(TodosContext);
    function completeAllTodos()
    {
        const updatedTodo = todos.map(todo=> {
            todo.isComplete = true;
            return todo;
        });
        setTodos(updatedTodo);
    }

    return (
        <button onClick={completeAllTodos} className="CheckAllButton">
            Check All
        </button>
    );
}