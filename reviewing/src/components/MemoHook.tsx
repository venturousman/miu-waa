import {useState} from "react";
import ExpensiveComponent from "./ExpensiveComponent";

export default function MemoHook() {
    const [num, setNum] = useState(0);
    const [count, setCount] = useState(0);

    return (
        <>
            <div>
                <h1>Count: {count}</h1>
                <button onClick={() => setNum(num + 1)}>Increase num</button>
                <button onClick={() => setCount(count + 1)}>Increase count</button>
            </div>
            <ExpensiveComponent num={num}/>
        </>
    );
}