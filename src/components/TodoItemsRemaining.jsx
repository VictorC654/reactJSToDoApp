import React, {useMemo, useState} from 'react';
import '../App.css';

export default function NoTodoContainer(props)
{
    function getRemainingTodos()
    {
        const remainingTodos = props.todos.filter((todo) => !todo.isComplete);
        console.log("calculating todos slowly..");
        // for(let index = 0; index < 2000000000; index++) {}
        return remainingTodos.length;
    }
    const cachedRemainingTodos = useMemo(getRemainingTodos, [props.todos]);
    return (
        <div className="NumberOfItemsRemaining">
            { cachedRemainingTodos } items remaining
        </div>
    );
}






