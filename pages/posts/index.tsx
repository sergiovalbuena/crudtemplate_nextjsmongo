import React, { useState } from "react";
import Layout from "../../components/Layout";

export default function AddPost() {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title && content) {
            try {
                const response = await fetch('/api/addPost', {
                    method: 'POST',
                    body: JSON.stringify({
                        title,
                        content
                    }),
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setTitle('');
                setContent('');
                setError('');
                setMessage('Post added successfully');
            }  catch (errorMessage: any) {
                setError(errorMessage);
            }
        } else {
            setError('All fields are required');
        }
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit} className="form">
                {
                    error ? (
                        <div className="alert-error">
                            {error}
                        </div>
                    ) : null
                }
                {
                    message ? (
                        <div className="alert-message">
                            {message}
                        </div>
                    ) : null
                }
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Title of the post"
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        placeholder="Content of the post"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        cols={20}
                        rows={8}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="submit_btn">Add Post</button>
                </div>
            </form>
            <style jsx>{`
                .form {
                    width: 400px;
                    margin: 10px auto;
                }
                .form-group {
                    width: 100%;
                    margin-bottom: 10px;
                    display: block;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 10px;
                }
                .form-group input[type="text"], .form-group textarea {
                    padding: 10px;
                    width: 100%;
                }
                .alert-error {
                    width: 100%;
                    color: red;
                    margin-bottom: 10px;
                }
                .alert-message {
                    width: 100%;
                    color: green;
                    margin-bottom: 10px;
                }
            `}</style>
        </Layout>
    )
}
