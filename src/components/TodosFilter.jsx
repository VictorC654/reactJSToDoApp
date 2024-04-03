import React, {useContext, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../App.css';
import {TodosContext} from "../context/TodosContext";
export default function TodosFilter()
{
    const { todosFiltered, setFilter, filter, setTodos } = useContext(TodosContext);
    function clearCompletedTodos()
    {
        setTodos(current => current.filter(todo => {
            return todo.isComplete !== true;
        }))
    }
    return (
        <div className="FilterContainer">
            <button className={filter === "all" ? 'ActiveButton' : ''}
            onClick={() => {
                setFilter("all");
                todosFiltered("all");
            }}>
                All
            </button>
            <button className={filter === "active" ? 'ActiveButton' : ''} style={{marginLeft:'.5em'}}
            onClick={() => {
                setFilter("active");
                todosFiltered("active");
            }}>
                Active
            </button>
            <button className={filter === "completed" ? 'ActiveButton' : ''} style={{marginLeft:'.5em'}}
            onClick={() => {
                setFilter("completed");
                todosFiltered("completed");
            }}>
                Completed
            </button>
            <button style={{ marginLeft:'auto'}} className="ActiveButton" onClick={clearCompletedTodos}>Clear completed</button>
        </div>
    );
}