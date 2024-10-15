import React from "react";
import User from "../types/User";

type CardItemPropsType = {
    item: User,
}

function CardItem(props: CardItemPropsType) {
    const {item} = props;
    if (!item) return null;
    const {html_url, avatar_url, id, login} = item;

    return (
        <div className="card">
            <a href={html_url} target="_blank">
                <img src={avatar_url} style={{width: '100px'}}/>
            </a>
            <p className="card-text">{login}</p>
        </div>
    );
}

export default CardItem;