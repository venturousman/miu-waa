import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BlogPosts from "../data/BlogPosts";

function EditPost() {
    const params = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        const id = params.id;
        if (!id) navigate('/404');
        const post = Object.values(BlogPosts).find(x => x.id === Number(id));
        if (!post) navigate('/404');
        setTitle(post?.title || '');
        setDescription(post?.description || '');
    }, [params.id, navigate]);

    const handleOnTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // The target property refers to the element that triggered the event.
        // The currentTarget property refers to the element to which the event handler is attached.
        const value = e.target.value;
        setTitle(value);
    }

    const handleOnDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setDescription(value);
    }

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Submited the title is: ' + title);
        console.log('Submited the description is: ' + description);
    }

    return (
        <div
            style={{padding: 20}}
            // className="container"
        >
            <h1>Edit Post</h1>
            <hr/>
            <form className="row" onSubmit={handleOnSubmit}>
                <section className="col-12">
                    <label className="form-label">Title:</label>
                    <input
                        // id="txtTitle"
                        name="title"
                        className="form-control"
                        value={title}
                        onChange={handleOnTitleChange}
                    />
                </section>
                <section className="col-12">
                    <label className="form-label">Description:</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={description}
                        onChange={handleOnDescriptionChange}
                    />
                </section>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    );
}

export default EditPost;