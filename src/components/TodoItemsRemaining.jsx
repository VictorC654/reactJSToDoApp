import React, {useContext, useMemo} from 'react';
import '../App.css';
import {TodosContext} from "../context/TodosContext";

export default function TodoItemsRemaining()
{
    const { todos } = useContext(TodosContext)
    function getRemainingTodos()
    {
        const remainingTodos = todos.filter((todo) => !todo.isComplete);
        console.log("calculating todos slowly..");
        return remainingTodos.length;
    }
    const cachedRemainingTodos = useMemo(getRemainingTodos, [todos]);
    return (
        <div className="NumberOfItemsRemaining">
            { cachedRemainingTodos } items remaining
        </div>
    );
}






