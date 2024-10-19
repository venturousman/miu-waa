import {useEffect, useState} from "react";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                if (!res.ok) {
                    // make the promise be rejected if we didn't get a 2xx response
                    console.log(res);
                    throw new Error("Not 2xx response", {cause: res});
                } else {
                    // got the desired response
                    return res.json();
                }
            })
            .then(data => setUsers(data))
            .catch(err => {
                // console.log(err);
                setError(err.message);
            });
    }, []);

    // console.log(users);

    return (
        <>
            {error && <h2>{error}</h2>}
            {!error && <ul>
                {users.map((u: any) => <li key={u.id}>{u.name}</li>)}
            </ul>}
        </>
    );
}