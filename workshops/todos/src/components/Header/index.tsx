import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import './index.css';

type HeaderPropsType = {
    onAddNewTodo: (name: string) => void;
}

function Header(props: HeaderPropsType) {
    const {onAddNewTodo} = props;
    const [todoName, setTodoName] = useState('');

    const handleOnKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        // console.log(e.currentTarget.value);
        // console.log(e.key);
        const value = e.currentTarget.value.trim();
        if (e.key === 'Enter') {
            if (!value) {
                alert('Please input the task name!');
            } else {
                // add new todo
                onAddNewTodo(value);
                setTodoName('');
            }
        }
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoName(e.currentTarget.value);
    }

    return (
        <div className="todo-header">
            <input type="text" placeholder="Enter task name" onKeyUp={handleOnKeyUp} onChange={handleOnChange}
                   value={todoName}/>
        </div>
    );
}

export default Header;