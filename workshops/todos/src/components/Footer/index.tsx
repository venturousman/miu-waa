import React, {ChangeEvent, MouseEvent} from "react";
import './index.css';

type FooterPropsType = {
    noFinishedTodos: number;
    noTotalTodos: number;
    onDeleteFinishedTodos: () => void;
    onToggleAllTodos: (checked: boolean) => void;
    areCompletedAll: boolean;
}

function Footer(props: FooterPropsType) {
    const {noFinishedTodos, noTotalTodos, onDeleteFinishedTodos, onToggleAllTodos, areCompletedAll} = props;
    const handleOnDeleteBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
        onDeleteFinishedTodos();
    }
    const handleOnCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
        onToggleAllTodos(e.currentTarget.checked);
    }
    return (
        <div className="todo-footer">
            <label>
                <input type="checkbox" checked={areCompletedAll} onChange={handleOnCheckChange}/>
            </label>
            <span>
              <span>Finished {noFinishedTodos}</span> / total {noTotalTodos}
            </span>
            <button className="btn btn-danger" onClick={handleOnDeleteBtnClick}>Delete Finished Tasks</button>
        </div>
    );
}

export default Footer;
