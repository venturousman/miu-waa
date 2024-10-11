import {useState} from 'react';
import {cloneDeep, orderBy} from 'lodash';
import {v4 as uuidv4} from 'uuid';

import './App.scss'
import avatar from './images/bozai.png'
import CommentItem from "./components/CommentItem";

enum SortType {
    Top = 1,
    Newest,
}

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
        ctime: '10-18 08:15',
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
        ctime: '11-13 11:29',
        like: 88,
    },
    {
        rpid: uuidv4(),
        user,
        content: 'I told my computer I needed a break... now it will not stop sending me vacation ads.',
        ctime: '10-19 09:00',
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
    const [activeType, setActiveType] = useState<SortType | null>(null);

    const handleOnSort = (sortType: SortType) => {
        if (sortType === SortType.Top) {
            let newComments = cloneDeep(comments);
            newComments = orderBy(newComments, ['like'], ['desc']);
            setComments(newComments);
            setActiveType(sortType);
        } else if (sortType === SortType.Newest) {
            let newComments = cloneDeep(comments);
            // TODO: check if need to convert datetime for comparing
            newComments = orderBy(newComments, ['ctime'], ['desc']);
            setComments(newComments);
            setActiveType(sortType);
        }
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
                        <span className={`nav-item ${activeType === SortType.Top && 'active'}`}
                            // className='nav-item'
                              onClick={(e) => handleOnSort(SortType.Top)}>Top</span>
                        <span className={`nav-item ${activeType === SortType.Newest && 'active'}`}
                            // className={classnames('nav-item', {active: item.type === activeType})}
                              onClick={(e) => handleOnSort(SortType.Newest)}>Newest</span>
                        {tabs.map(tab => <span className={`nav-item ${activeType === SortType.Top && 'active'}`}
                                               onClick={(e) => handleOnSort(SortType.Top)}>{tab.text}</span>)}
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
                    <div className="reply-box-wrap">
                        {/* comment */}
                        <textarea
                            className="reply-box-textarea"
                            placeholder="tell something..."
                        />
                        {/* post button */}
                        <div className="reply-box-send">
                            <div className="send-text">post</div>
                        </div>
                    </div>
                </div>
                {/* comment list */}
                <div className="reply-list">
                    {/* comment item */}
                    {/*<CommentItem />*/}
                    {comments.map(c => <CommentItem key={c.rpid} item={c}/>)}
                </div>
            </div>
        </div>
    )
}

export default App