import React, {useState} from 'react';
import '../App.css';

export default function NoTodoContainer(props)
{
    function getRemainingTodos()
    {
        const remainingTodos = props.todos.filter((todo) => !todo.isComplete);

        return remainingTodos.length;
    }
    return (
        <div className="NumberOfItemsRemaining">
            { getRemainingTodos() } items remaining
        </div>
    );
}






