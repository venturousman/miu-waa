import BlogPosts from "../data/BlogPosts";
import {Link, Outlet} from "react-router-dom";

function PostsList() {
    // console.log(BlogPosts);
    return (
        <div style={{padding: 20}}>
            <h1>Posts List</h1>
            <hr/>
            <ul>
                {/*
                {Object.entries(BlogPosts).map(([slug, {title}]) => (
                    <li key={slug}>
                        <Link to={`/posts/${slug}`}>
                            <h3>{title}</h3>
                        </Link>
                    </li>
                ))}
                */}
                {Object.values(BlogPosts).map(({id, title}) => (
                    <li key={id}>
                        <Link to={`/posts/${id}`}>
                            <h3>{title}</h3>
                        </Link>
                    </li>
                ))}
            </ul>
            <Outlet/>
        </div>
    );
}

export default PostsList;