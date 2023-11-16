import React, {useState} from 'react';
import '../App.css';

export default function TodoCheckAllButton(props)
{

    return (
        <button onClick={props.completeAllTodos} className="CheckAllButton">
            Check All
        </button>
    );
}