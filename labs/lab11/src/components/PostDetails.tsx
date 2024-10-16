import {MouseEvent, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import BlogPosts from "../data/BlogPosts";

function PostDetails() {
    const params = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<any>(null);

    useEffect(() => {
        const id = params.id;
        if (!id) navigate('/404');
        const post = Object.values(BlogPosts).find(x => x.id === Number(id));
        if (!post) navigate('/404');
        setPost(post);
    }, [params.id, navigate]);

    if (!post)
        return <span>The blog post you've requested doesn't exist.</span>;

    const handleOnEditBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
        navigate(`/posts/${post.id}/edit`);
    }

    return (
        <div style={{padding: 20}}>
            <h1>Post Details</h1>
            <hr/>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            {/*
            <Link to={`/posts/${id}/edit`}>
                <h3>Edit</h3>
            </Link>
            */}
            <button className="btn btn-primary" onClick={handleOnEditBtnClick}>Edit</button>
        </div>
    );
}

export default PostDetails;