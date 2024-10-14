import React from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import TodoList from "./components/TodoList";

function App() {
    return (
        <div className="todo-container">
            <div className="todo-wrap">
                <Header/>
                <TodoList/>
                <Footer/>
            </div>
        </div>
    );
}

export default App;
