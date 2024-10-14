import React, {ChangeEvent, MouseEvent} from "react";
import './index.css';
import Todo from "../../models/Todo";

type TodoItemPropsType = {
    todo: Todo,
    onToggleTodo: (id: string, checked: boolean) => void;
    onDeleteTodo: (id: string) => void;
}

function TodoItem(props: TodoItemPropsType) {
    const {todo, onToggleTodo, onDeleteTodo} = props;
    if (!todo) return null;
    const {id, name, completed} = todo;

    const handleOnCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log(todo.id, e.currentTarget.checked);
        onToggleTodo(id, e.currentTarget.checked);
    }

    const handleOnDeleteBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
        const res = window.confirm("Are you sure you want to delete this item?");
        // console.log(res);
        if (res) {
            onDeleteTodo(id);
        }
    }

    return (
        <li>
            <label>
                <input type="checkbox" checked={completed} onChange={handleOnCheckChange}/>
                <span>{name}</span>
            </label>
            <button className="btn btn-danger" onClick={handleOnDeleteBtnClick}>Delete</button>
        </li>
    );
}

export default TodoItem;