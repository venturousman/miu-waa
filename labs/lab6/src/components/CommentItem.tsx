// import * as dayjs from 'dayjs';

function CommentItem(props: any) {
    const item = props.item;
    if (!item) return null;
    return (
        <div className="reply-item">
            {/* profile */}
            <div className="root-reply-avatar">
                <div className="bili-avatar">
                    <img className="bili-avatar-img" alt={item.user?.uname} src={item.user?.avatar}/>
                </div>
            </div>

            <div className="content-wrap">
                {/* username */}
                <div className="user-info">
                    <div className="user-name">{item.user?.uname}</div>
                </div>
                {/* comment content */}
                <div className="root-reply">
                    <span className="reply-content">{item.content}</span>
                    <div className="reply-info">
                        {/* comment created time */}
                        {/*<span className="reply-time">{'2023-11-11'}</span>*/}
                        <span className="reply-time">{item.ctime}</span>
                        {/* total likes */}
                        <span className="reply-time">Like:{item.like}</span>
                        <span className="delete-btn">Delete</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentItem;