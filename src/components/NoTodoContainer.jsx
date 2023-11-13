import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../App.css';

export default function NoTodoContainer()
{
    return (
            <div className="noTodosContainer">
                <FontAwesomeIcon icon="fa-solid fa-clipboard-list" style={{fontSize:"10em",color:"lightgray"}} />
                <p style={{marginTop:"2em"}}>Add some todos...</p>
            </div>
    );
}