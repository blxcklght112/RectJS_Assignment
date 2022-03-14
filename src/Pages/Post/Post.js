import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostPage = () => {
    const postId = useParams().id;
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [post, setPost] = useState({
        title: "title",
        body: "body"
    });

    useEffect(() => {
        setIsLoading(true);
        let didCancel = false;
        axios({
            method: "GET",
            url: `https://jsonplaceholder.typicode.com/posts/${postId}`
        }).then(response => {
            if (!didCancel) {
                setPost({
                    title: response.data.title,
                    body: response.data.body
                });
                setIsLoading(false);
            }
        }).catch(() => {
            setIsLoading(false);
            setError("Error!!!")
        })
        return () => { didCancel = true; }
    }, [postId]);

    const getPost = () => {
        if (isLoading) return (<div>Loading...</div>);
        if (error) return (<div>{error}</div>);
        return (
            <div>
                <div>
                    ID: {postId}
                </div>
                <div>
                    Title: {post.title}
                </div>
                <div>
                    Body: {post.body}
                </div>
            </div>
        )
    };

    return (
        <div>
            {getPost()}
        </div>
    )
};

export default PostPage;