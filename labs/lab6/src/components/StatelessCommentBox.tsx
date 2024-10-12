import {useRef, MouseEvent} from "react";
import dayjs from "dayjs";
import {v4 as uuidv4} from "uuid";
import {useAppContext} from "../AppContext";

function StatelessCommentBox(props: any) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const {currentUser} = useAppContext();

    const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
        const textAreaValue = textAreaRef.current?.value;
        const now = dayjs();//.format('MM-DD HH:mm');
        // console.log(now);
        const newComment = {
            rpid: uuidv4(),
            // user: props.currentUser,
            user: currentUser,
            content: textAreaValue,
            ctime: now,
            like: 0,
        };
        // console.log(newComment);
        if (props.onPost) {
            props.onPost(newComment);
            // reset form
            // setTextAreaValue('');
            // textAreaRef.current?.value = '';
            // const input = document.getElementById("reply-box-textarea");
            // input?.value = ''; // Non-React way of setting value
            textAreaRef.current?.focus();
        }
    }

    return (
        <div className="reply-box-wrap">
            {/* comment */}
            <textarea
                className="reply-box-textarea"
                placeholder="tell something..."
                onChange={props.onChange}
                value={props.value}
                ref={textAreaRef}
                id="reply-box-textarea"
                // defaultValue="aa"
            />
            {/* post button */}
            <div className="reply-box-send">
                <div className="send-text"
                     onClick={handleOnClick}
                >Post
                </div>
            </div>
        </div>
    );
}

export default StatelessCommentBox;