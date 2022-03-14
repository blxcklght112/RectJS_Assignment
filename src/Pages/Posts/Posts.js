import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Posts.css"

const PostsPage = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [sortByTitle, setSortByTitle] = useState(null);

    const postsFiltered = posts.filter(post => post.title.toLowerCase().includes(searchText.toLowerCase()));

    const postsSorted = () => {
        if (sortByTitle === null) return postsFiltered;
        return postsFiltered.sort((post1, post2) => {
            if (sortByTitle === "ASC") return post1.title.localeCompare(post2.title)
            else if (sortByTitle === "DES") return post2.title.localeCompare(post1.title)
        });
    }

    useEffect(() => {
        let didCancel = false;
        axios({
            method: "GET",
            url: "https://jsonplaceholder.typicode.com/posts"
        })
            .then(response => {
                if (!didCancel) {
                    setIsLoading(false);
                    setPosts(response.data);
                }
            })
            .catch(() => {
                if (!didCancel) {
                    setIsLoading(false);
                    setError("Error !!!")
                }
            })

        return () => {
            didCancel = true
        }
    }, []);

    if (isLoading) return <div>LOADING</div>;
    if (error) return <div className='error'>{error}</div>;

    const handleOnRemove = postId => {
        const index = posts.findIndex(post => post.id === postId);
        const newPosts = [...posts];
        newPosts.splice(index, 1);
        setPosts(newPosts);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search by title"
                className="search--input"
                value={searchText}
                onChange={evt => setSearchText(evt.target.value)}
            />

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th onClick={() => {
                            if (sortByTitle === null) setSortByTitle("ASC");
                            if (sortByTitle === "ASC") setSortByTitle("DES");
                            if (sortByTitle === "DES") setSortByTitle(null);
                        }}>Title {sortByTitle === null ? "" : "-- Sort " + sortByTitle}
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        postsSorted().map(post => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>
                                    <Link to={`/posts/${post.id}`}>
                                        View detail
                                    </Link>
                                    <button onClick={() => handleOnRemove(post.id)}>Remove</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default PostsPage;