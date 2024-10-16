import React from 'react';
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import PostsList from "./components/PostsList";
import PostDetails from "./components/PostDetails";
import Home from "./components/Home";
import EditPost from "./components/EditPost";
import './App.css';

function App() {
    return (
        <>
            <nav style={{margin: 10}}>
                <NavLink to="/home" style={{padding: "5px"}} end>Home</NavLink>
                <NavLink to="/posts" style={{padding: "5px"}} end>Posts</NavLink>
            </nav>
            <Routes>
                <Route path="/" element={<Navigate to="/home"/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/posts">
                    <Route index element={<PostsList/>}/>
                    {/*<Route path=":slug" element={<PostDetails/>}/>*/}
                    <Route path=":id" element={<PostDetails/>}/>
                    <Route path=":id/edit" element={<EditPost/>}/>
                </Route>
                <Route path="/404" element={<PageNotFound/>}/>
                <Route path="*" element={<Navigate to="/404"/>}/>
            </Routes>
        </>

    );
}

export default App;
