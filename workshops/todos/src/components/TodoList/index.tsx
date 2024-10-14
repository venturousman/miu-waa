import React from "react";
import './index.css';
import TodoItem from "../TodoItem";
import Todo from "../../models/Todo";

type TodoListPropsType = {
    todos: Todo[],
    onToggleTodo: (id: string, checked: boolean) => void;
    onDeleteTodo: (id: string) => void;
}

function TodoList(props: TodoListPropsType) {
    const {todos, onToggleTodo, onDeleteTodo} = props;
    return (
        <ul className="todo-main">
            {todos.map(todo => <TodoItem key={todo.id} todo={todo} onToggleTodo={onToggleTodo}
                                         onDeleteTodo={onDeleteTodo}/>)}
        </ul>
    );
}

export default TodoList;