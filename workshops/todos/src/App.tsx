import React, {useEffect, useMemo, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import _cloneDeep from "lodash/cloneDeep";
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import TodoList from "./components/TodoList";
import Todo from "./models/Todo";

const defaultTodos = [
    {
        id: uuidv4(),
        name: "Create a React App",
        completed: true,
    },
    {
        id: uuidv4(),
        name: "Learn about Component Driven Development",
        completed: false,
    },
    {
        id: uuidv4(),
        name: "Review for Final Exam",
        completed: false,
    },
]

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        async function getTodoList() {
            try {
                const res = await fetch('http://localhost:3004/todos');
                if (!res.ok) {
                    throw new Error('Failed to fetch');
                }
                const data: Todo[] = await res.json();
                setTodos(data);
            } catch (e) {
                console.log("Cannot fetch comments");
                console.log(e);
            }
        }

        getTodoList();
    }, []);

    // console.log(defaultTodos);
    // console.log(todos);

    const noFinishedTodos = useMemo(() => {
        return todos?.filter(t => t.completed)?.length || 0;
    }, [todos]);

    const areCompletedAll = useMemo(() => {
        return (todos?.length > 0 && todos.every(t => t.completed)) || false;
    }, [todos]);

    // console.log(areCompletedAll);

    const addNewTodo = (name: string) => {
        const newTodo: Todo = {
            id: uuidv4(),
            name,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    }

    const toggleTodo = (id: string, checked: boolean) => {
        // const newTodos = _cloneDeep(todos);
        // const todo = newTodos.find(x => x.id === id);
        // if (todo) {
        //     // todo.completed = !todo.completed;
        //     todo.completed = checked;
        //     setTodos(newTodos);
        // }
        const newTodos = todos.map(todo => {
            if (todo.id === id) return ({...todo, completed: checked});
            else return todo;
        });
        setTodos(newTodos);
    }

    const toggleAll = (checked: boolean) => {
        if (!todos?.length) return;
        const newTodos = todos.map(todo => {
            return ({...todo, completed: checked});
        });
        setTodos(newTodos);
    }

    const deleteTodo = (id: string) => {
        let newTodos = _cloneDeep(todos);
        newTodos = newTodos.filter(t => t.id !== id);
        setTodos(newTodos);
    }

    const deleteFinishedTodos = () => {
        let newTodos = _cloneDeep(todos);
        newTodos = newTodos.filter(t => !t.completed);
        setTodos(newTodos);
    }

    return (
        <div className="todo-container">
            <div className="todo-wrap">
                <Header onAddNewTodo={addNewTodo}/>
                <TodoList todos={todos} onToggleTodo={toggleTodo} onDeleteTodo={deleteTodo}/>
                <Footer noFinishedTodos={noFinishedTodos} noTotalTodos={todos?.length || 0}
                        onDeleteFinishedTodos={deleteFinishedTodos} onToggleAllTodos={toggleAll}
                        areCompletedAll={areCompletedAll}/>
            </div>
        </div>
    );
}

export default App;
