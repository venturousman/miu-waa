import React from "react";
import './index.css';

function Footer() {
    return (
        <div className="todo-footer">
            <label>
                <input type="checkbox"/>
            </label>
            <span>
              <span>Finished 0</span> / total 2
            </span>
            <button className="btn btn-danger">Delete Finished Tasks</button>
        </div>
    );
}

export default Footer;
