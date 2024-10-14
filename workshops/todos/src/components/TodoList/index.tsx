import React from "react";
import './index.css';
import TodoItem from "../TodoItem";

function TodoList() {
    return (
        <ul className="todo-main">
            <TodoItem/>
            <TodoItem/>
        </ul>
    );
}

export default TodoList;