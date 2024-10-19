import {useState} from "react";

export default function Courses() {
    const [courseList, setCourseList] = useState([
        {id: 1, name: 'WAA'},
        {id: 2, name: 'WAP'},
        {id: 3, name: 'EA'}
    ]);

    const add = () => {
        setCourseList([{id: courseList.length + 1, name: 'Some Course'}, ...courseList]);
    }

    return (
        <div>
            {courseList.map((c: any) =>
                <input key={c.id} value={c.name} onChange={() => {
                }}/>)}
            <button onClick={add}>Add a new Course</button>
        </div>
    );
}