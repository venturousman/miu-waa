import React from 'react';
import './App.css';

function App() {
    return (
        <div id="root">
            <div className="todo-container">
                <div className="todo-wrap">
                    <div className="todo-header">
                        <input type="text" placeholder="Enter task name"/>
                    </div>
                    <ul className="todo-main">
                        <li>
                            <label>
                                <input type="checkbox"/>
                                <span>xxxxx</span>
                            </label>
                            <button className="btn btn-danger" style={{display: 'none'}}>Delete</button>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox"/>
                                <span>yyyy</span>
                            </label>
                            <button className="btn btn-danger" style={{display: 'none'}}>Delete</button>
                        </li>
                    </ul>
                    <div className="todo-footer">
                        <label>
                            <input type="checkbox"/>
                        </label>
                        <span>
                          <span>Finished 0</span> / total 2
                        </span>
                        <button className="btn btn-danger">Delete Finished Tasks</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
