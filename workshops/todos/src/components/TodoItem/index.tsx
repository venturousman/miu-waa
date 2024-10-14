import React from "react";
import './index.css';

function TodoItem() {
    return (
        <li>
            <label>
                <input type="checkbox"/>
                <span>xxxxx</span>
            </label>
            <button className="btn btn-danger" style={{display: 'none'}}>Delete</button>
        </li>
    );
}

export default TodoItem;