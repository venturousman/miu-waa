interface Todo {
    id: string;
    name: string;
    completed: boolean,
}

// class requires initializer and constructor rather than interface.
// moreover, cannot use spread operator <TodoItem {...item} /> with a class, but interface can
// class Todo {
//     id: string;
//     name: string;
// }

export default Todo;