import CommentItem from "./CommentItem";
import React from "react";
import {useAppContext} from "../AppContext";

// Split Comments/posts in different components, then practice component communication by using props, and context.

// In TypeScript, both "interface" and "type" can be used to define the shape of an object
// interface is better suited for when you want to extend or merge interfaces.
// type cannot be reopened or merged after its initial declaration.
// type shines when you need to define union types, intersection types, or mapped types.
interface CommentListProps {
    onLike: (cid: string) => void,

    onDelete(cid: string): void,

    // currentUser: any, // object <- error
    comments: any[],
}

function CommentList(props: CommentListProps) {
    const {comments, onDelete, onLike} = props;
    const {currentUser} = useAppContext();

    return (
        <div className="reply-list">
            {comments.map(c => <CommentItem key={c.rpid}
                                            item={c}
                                            currentUser={currentUser}
                                            onLike={onLike}
                                            onDelete={onDelete}
            />)}
        </div>
    );
}

export default CommentList;
