import {FormEvent, useReducer, useState} from "react";

type StateType = {
    username: string;
    password: string;
    error: string;
    isLoggedIn: boolean;
}

const initialState: StateType = {
    username: '',
    password: '',
    error: '',
    isLoggedIn: false,
}

type ActionType = {
    type: string;
    payload?: any;
}

const reducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET_ERROR':
            return {...state, error: action.payload};
        case 'SET_IS_LOGGED_IN':
            return {...state, isLoggedIn: action.payload};
        case 'SET_USERNAME':
            return {...state, username: action.payload};
        case 'SET_PASSWORD':
            return {...state, password: action.payload};
        case 'RESET':
            return {...state, error: '', username: '', password: ''};
        default:
            return state;
    }
}

export default function LoginUseReducer() {
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [state, dispatch] = useReducer(reducer, initialState);
    const {username, password, isLoggedIn, error} = state;

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // setError('');
        dispatch({type: 'SET_ERROR', payload: ''});
        try {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (username === 'user' && password === 'pwd123') {
                        resolve('success');
                    } else {
                        reject('fail');
                    }
                }, 1000);
            });
            // setIsLoggedIn(true);
            dispatch({type: 'SET_IS_LOGGED_IN', payload: true});
        } catch (error) {
            // setError('Incorrect username or password!');
            // setUsername('');
            // setPassword('');
            dispatch({type: 'RESET'});
            dispatch({type: 'SET_ERROR', payload: 'Incorrect username or password!'});
        }
    };
    return (
        <div className='App'>
            <div className='login-container'>
                {isLoggedIn ? (
                    <>
                        <h1>Welcome {username}!</h1>
                        <button onClick={() => {
                            // setIsLoggedIn(false);
                            dispatch({type: 'SET_IS_LOGGED_IN', payload: false})
                        }}>Log Out
                        </button>
                    </>
                ) : (
                    <form className='form' onSubmit={onSubmit}>
                        {error && <p className='error'>{error}</p>}
                        <p>Please Login!</p>
                        <input
                            type='text'
                            placeholder='username'
                            value={username}
                            onChange={(e) => {
                                // setUsername(e.currentTarget.value);
                                dispatch({type: 'SET_USERNAME', payload: e.currentTarget.value})
                            }}
                        />
                        <input
                            type='password'
                            placeholder='password'
                            autoComplete='new-password'
                            value={password}
                            onChange={(e) => {
                                // setPassword(e.currentTarget.value);
                                dispatch({type: 'SET_PASSWORD', payload: e.currentTarget.value})
                            }}
                        />
                        <button className='submit' type='submit'>Log In</button>
                    </form>
                )}
            </div>
        </div>
    );
}