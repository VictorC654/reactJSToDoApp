import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../App.css';
export default function NoTodoContainer(props)
{
    return (
        <div className="FilterContainer">
            <button className={props.filter === "all" ? 'ActiveButton' : ''}
            onClick={() => {
                props.setFilter("all");
                props.todosFiltered("all");
            }}>
                All
            </button>
            <button className={props.filter === "active" ? 'ActiveButton' : ''} style={{marginLeft:'.5em'}}
            onClick={() => {
                props.setFilter("active");
                props.todosFiltered("active");
            }}>
                Active
            </button>
            <button className={props.filter === "completed" ? 'ActiveButton' : ''} style={{marginLeft:'.5em'}}
            onClick={() => {
                props.setFilter("completed");
                props.todosFiltered("completed");
            }}>
                Completed
            </button>
            <button style={{ marginLeft:'auto'}} className="ActiveButton" onClick={props.clearCompletedTodos}>Clear completed</button>
        </div>
    );
}