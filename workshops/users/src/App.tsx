import React, {useState, useEffect, MouseEvent, ChangeEvent, KeyboardEvent, useRef, useMemo} from 'react';
import axios from "axios";
import CardItem from "./components/CardItem";
import './App.css';
import User from "./types/User";

// Use React + Axios implement the Search Feature.
// The Github API for search users is: GET https://api.github.com/search/users?q={keyword}
// Please finish the requirements as demoed in the classroom and paste your github link here. Thank you!

function App() {
    const [keyword, setKeyword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    // const textboxRef = useRef<HTMLInputElement>(null);

    // useEffect(() => {
    //     async function searchUsers() {
    //         try {
    //             var response = await axios.get(`https://api.github.com/search/users?q=${keyword}`);
    //             console.log(response.data);
    //             setUsers(response.data?.items || []);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }
    //
    //     searchUsers();
    // }, [keyword]);

    async function searchUsers() {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const response = await axios.get(`https://api.github.com/search/users?q=${keyword}`);
            // console.log(response.data);
            setUsers(response.data?.items || []);
        } catch (e: any) {
            console.log(e);
            setErrorMessage(e?.message);
        } finally {
            setIsLoading(false);
        }
    }

    const handleOnSearchBtnClick = async (e: MouseEvent<HTMLButtonElement>) => {
        // console.log(textboxRef.current?.value);
        // const keyword = textboxRef.current?.value;
        if (!keyword) return;
        await searchUsers();
    }

    const handleOnNameTxtKeyUp = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            // const keyword = e.currentTarget?.value;
            // console.log(keyword);
            if (!keyword) return;
            await searchUsers();
        }
    }

    const handleOnNameTxtChange = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        const value = e.target.value.trim();
        setKeyword(value);
        if (!value) setErrorMessage('');
    }

    // Please enter keyword to start Search

    return (
        <div id="app">
            <div className="container">
                <section className="jumbotron">
                    <h3 className="jumbotron-heading">Search Github Users</h3>
                    <div>
                        <input type="text"
                               placeholder="enter the name you search"
                            // ref={textboxRef}
                               onKeyUp={handleOnNameTxtKeyUp}
                               onChange={handleOnNameTxtChange}
                        />&nbsp;
                        <button onClick={handleOnSearchBtnClick}>Search</button>
                    </div>
                </section>
                <div className="row">

                    {isLoading && <h3>Loading...</h3>}
                    {!isLoading && (<>
                        {errorMessage && <h3>{errorMessage}</h3>}
                        {!keyword?.length && !users?.length && <h3>Please enter keyword to start Search</h3>}
                        {users?.length > 0 && users.map(u => <CardItem key={u.id} item={u}/>)}
                    </>)}

                </div>
            </div>
        </div>
    );
}

export default App;
