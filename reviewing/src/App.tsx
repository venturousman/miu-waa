import React, {useState} from 'react';
import './App.css';
import Courses from "./components/Courses";
import LoginUseState from "./components/LoginUseState";
import LoginUseReducer from "./components/LoginUseReducer";
import UserList from "./components/UserList";
import MemoHook from "./components/MemoHook";
import ThemedComponent from "./components/ThemedComponent";

function App() {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <>
            {/*<Courses/>*/}
            {/*<LoginUseState/>*/}
            {/*<LoginUseReducer/>*/}
            {/*<UserList/>*/}
            {/*<MemoHook/>*/}
            <ThemedComponent theme={theme} toggleTheme={toggleTheme}/>
        </>
    );
}

export default App;
