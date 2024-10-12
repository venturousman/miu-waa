import CommentItem from "./CommentItem";
import React from "react";

// Split Comments/posts in different components, then practice component communication by using props, and context.

interface CommentListProps {
    onLike: (cid: string) => void,

    onDelete(cid: string): void,

    currentUser: any, // object <- error
    comments: any[],
}

function CommentList(props: CommentListProps) {
    const {comments, currentUser, onDelete, onLike} = props;
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
