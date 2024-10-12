import {ChangeEvent, MouseEvent, useRef, useState} from "react";
import dayjs from "dayjs";
import {v4 as uuidv4} from "uuid";

function StatefulCommentBox(props: any) {
    const [textAreaValue, setTextAreaValue] = useState('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // console.log(e.target.value);
        // TODO: should use debounce
        setTextAreaValue(e.target.value);
    }

    const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
        const now = dayjs();//.format('MM-DD HH:mm');
        // console.log(now);
        const newComment = {
            rpid: uuidv4(),
            user: props.currentUser,
            content: textAreaValue,
            ctime: now,
            like: 0,
        };
        if (props.onPost) {
            props.onPost(newComment);
            // reset form
            setTextAreaValue('');
            textAreaRef.current?.focus();
        }
    }

    return (
        <div className="reply-box-wrap">
            {/* comment */}
            <textarea
                className="reply-box-textarea"
                placeholder="tell something..."
                onChange={handleOnChange}
                value={textAreaValue}
                ref={textAreaRef}
            />
            {/* post button */}
            <div className="reply-box-send">
                <div className="send-text"
                    // onClick={handleOnPost}
                     onClick={handleOnClick}
                >Post
                </div>
            </div>
        </div>
    );
}

export default StatefulCommentBox;