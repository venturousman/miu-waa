import {ChangeEvent, useEffect, useRef, useState} from 'react';
import {cloneDeep, orderBy} from 'lodash';
import {v4 as uuidv4} from 'uuid';
import dayjs from 'dayjs';

import './App.scss'
import avatar from './images/bozai.png'
import CommentItem from "./components/CommentItem";
import StatefulCommentBox from "./components/StatefulCommentBox";
import StatelessCommentBox from "./components/StatelessCommentBox";
import CommentList from "./components/CommentList";
import CommentList2 from "./components/CommentList2";
import {AppContextProvider, useAppContext} from "./AppContext";

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
    const [comments, setComments] = useState<any[]>([]);
    // const [currentUser, setCurrentUser] = useState(null);
    const [activeType, setActiveType] = useState('');
    const [textAreaValue, setTextAreaValue] = useState('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const {currentUser, setCurrentUser} = useAppContext();

    // console.log(defaultList);
    // console.log(JSON.stringify(defaultList));

    useEffect(() => {
        console.log('inside useEffect to fetch comments');

        async function getComments() {
            try {
                const res = await fetch('http://localhost:3004/posts');
                const data = await res.json();
                if (data && Array.isArray(data)) {
                    data.forEach((x: any) => x.ctime = dayjs(x.ctime)); // for newest sorting, TODO refactor if use it further
                    setComments(data);
                }
            } catch (e) {
                console.log("Cannot fetch comments");
                console.log(e);
            }
        }

        getComments();
    }, []); // Empty array means the effect runs once when the component mounts

    useEffect(() => {
        console.log('inside useEffect to fetch users');
        // Side effect: fetching data from an API
        fetch('http://localhost:3004/users')
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                if (data && Array.isArray(data) && data.length > 0) {
                    setCurrentUser(data[0]);
                }
            })
            .catch(err => {
                console.log("Cannot fetch users");
                console.log(err);
            });
    }, []); // Empty array means the effect runs once when the component mounts

    // console.log(currentUser);
    // console.log(comments);

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
            user: currentUser,
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
                        currentUser={currentUser}
                        onPost={handleOnPost2}/>
                    */}
                    <StatelessCommentBox
                        onChange={handleOnChange}
                        value={textAreaValue}
                        // currentUser={currentUser}
                        onPost={handleOnPost2}/>
                </div>
                {/* comment list */}
                {/*
                <div className="reply-list">
                    {comments.map(c => <CommentItem key={c.rpid} item={c} currentUser={currentUser}
                                                    onLike={handleOnLike}
                                                    onDelete={handleOnDelete}/>)}
                </div>
                */}
                <CommentList onLike={handleOnLike}
                             onDelete={handleOnDelete}
                    // currentUser={currentUser}
                             comments={comments}/>
                {/*
                <CommentList2 currentUser={null}>
                    <h1>Hello</h1>
                </CommentList2>
                */}
            </div>
        </div>
    )
}

function AppWrapper() {
    return (
        <AppContextProvider>
            <App/>
        </AppContextProvider>
    );
}

// export default App;
export default AppWrapper;