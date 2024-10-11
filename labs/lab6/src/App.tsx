import {ChangeEvent, useRef, useState} from 'react';
import {cloneDeep, orderBy} from 'lodash';
import {v4 as uuidv4} from 'uuid';
import dayjs from 'dayjs';

import './App.scss'
import avatar from './images/bozai.png'
import CommentItem from "./components/CommentItem";
import StatefulCommentBox from "./components/StatefulCommentBox";
import StatelessCommentBox from "./components/StatelessCommentBox";

// current logged in user info
const user = {
    // userid
    uid: uuidv4(),
    // profile
    avatar,
    // username
    uname: 'John',
}

// Comment List data
const defaultList = [
    {
        // comment id
        rpid: uuidv4(),
        // user info
        user: {
            uid: uuidv4(),
            avatar: '',
            uname: 'Jay Zhou',
        },
        // comment content
        content: 'Nice, well done',
        // created datetime
        // ctime: '10-18 08:15',
        ctime: dayjs('2024-08-18 08:15:00'),
        like: 88,
    },
    {
        rpid: uuidv4(),
        user: {
            uid: uuidv4(),
            avatar: '',
            uname: 'Song Xu',
        },
        content: 'I search for you thousands of times, from dawn till dusk.',
        // ctime: '11-13 11:29',
        ctime: dayjs('2024-09-13 11:29:00'),
        like: 88,
    },
    {
        rpid: uuidv4(),
        user,
        content: 'I told my computer I needed a break... now it will not stop sending me vacation ads.',
        // ctime: '10-19 09:00',
        ctime: dayjs('2024-08-19 09:00:05'),
        like: 66,
    },
]

// Nav Tab
const tabs = [
    {type: 'hot', text: 'Top'},
    {type: 'newest', text: 'Newest'},
]

const App = () => {
    const [comments, setComments] = useState(defaultList);
    const [activeType, setActiveType] = useState('');
    const [textAreaValue, setTextAreaValue] = useState('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const sort = (mComments: any, sortType: string) => {
        // if (!sortType) return comments;
        let newComments = cloneDeep(mComments);
        if (sortType === 'hot') {
            newComments = orderBy(newComments, ['like'], ['desc']);
        } else if (sortType === 'newest') {
            newComments = orderBy(newComments, ['ctime'], ['desc']);
        }
        return newComments;
    }

    // const handleOnSort = (sortType: string) => {
    //     if (sortType === 'hot') {
    //         let newComments = cloneDeep(comments);
    //         newComments = orderBy(newComments, ['like'], ['desc']);
    //         setComments(newComments);
    //         setActiveType(sortType);
    //     } else if (sortType === 'newest') {
    //         let newComments = cloneDeep(comments);
    //         // TODO: check if need to convert datetime for comparing
    //         newComments = orderBy(newComments, ['ctime'], ['desc']);
    //         setComments(newComments);
    //         setActiveType(sortType);
    //     }
    // }

    const handleOnLike = (rpid: string) => {
        let newComments = cloneDeep(comments);
        newComments = newComments.map(c =>
            c.rpid === rpid ? {...c, like: c.like + 1} : c
        );
        setComments(newComments);
    }

    const handleOnDelete = (rpid: string) => {
        // console.log(rpid);
        let newComments = cloneDeep(comments);
        newComments = newComments.filter(c => c.rpid !== rpid);
        setComments(newComments);
    }

    const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // console.log(e.target.value);
        // TODO: should use debounce
        setTextAreaValue(e.target.value);
    }

    const handleOnPost = () => {
        // console.log(textAreaValue);
        const now = dayjs();//.format('MM-DD HH:mm');
        // console.log(now);
        const newComment = {
            rpid: uuidv4(),
            user,
            content: textAreaValue,
            ctime: now,
            like: 0,
        };
        let newComments = cloneDeep(comments);
        newComments.push(newComment);
        if (activeType) {
            newComments = sort(newComments, activeType);
        }
        setComments(newComments);
        // reset form
        setTextAreaValue('');
        textAreaRef.current?.focus();
    }

    const handleOnPost2 = (newComment: any) => {
        let newComments = cloneDeep(comments);
        newComments.push(newComment);
        if (activeType) {
            newComments = sort(newComments, activeType);
        }
        setComments(newComments);
        // reset form
        setTextAreaValue('');
    }

    return (
        <div className="app">
            {/* Nav Tab */}
            <div className="reply-navigation">
                <ul className="nav-bar">
                    <li className="nav-title">
                        <span className="nav-title-text">Comments</span>
                        {/* Like */}
                        <span className="total-reply">{comments.length}</span>
                    </li>
                    <li className="nav-sort">
                        {/* highlight class name： active */}
                        {tabs.map(tab => <span key={tab.type}
                                               className={`nav-item ${activeType === tab.type && 'active'}`}
                            // onClick={(e) => handleOnSort(tab.type)}
                                               onClick={() => {
                                                   setActiveType(tab.type);
                                                   // TODO should use useEffect and refactor sort function (remove sortType parameter...)
                                                   const newComments = sort(comments, tab.type);
                                                   setComments(newComments);
                                               }}
                        >{tab.text}</span>)}
                    </li>
                </ul>
            </div>

            <div className="reply-wrap">
                {/* comments */}
                <div className="box-normal">
                    {/* current logged in user profile */}
                    <div className="reply-box-avatar">
                        <div className="bili-avatar">
                            <img className="bili-avatar-img" src={avatar} alt="Profile"/>
                        </div>
                    </div>
                    {/*
                    <div className="reply-box-wrap">
                        <textarea
                            className="reply-box-textarea"
                            placeholder="tell something..."
                            onChange={handleOnChange}
                            value={textAreaValue}
                            ref={textAreaRef}
                        />
                        <div className="reply-box-send">
                            <div className="send-text" onClick={handleOnPost}>Post</div>
                        </div>
                    </div>
                    */}
                    {/*
                    <StatefulCommentBox
                        currentUser={user}
                        onPost={handleOnPost2}/>
                    */}
                    <StatelessCommentBox
                        onChange={handleOnChange}
                        value={textAreaValue}
                        currentUser={user}
                        onPost={handleOnPost2}/>
                </div>
                {/* comment list */}
                <div className="reply-list">
                    {/* comment item */}
                    {/*<CommentItem />*/}
                    {comments.map(c => <CommentItem key={c.rpid} item={c} currentUser={user}
                                                    onLike={handleOnLike}
                                                    onDelete={handleOnDelete}/>)}
                </div>
            </div>
        </div>
    )
}

export default App