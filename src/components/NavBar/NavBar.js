import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css"

const TopNav = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const handleOnLogout = () => {
        localStorage.clear();
        navigate("/");
    }
    return (
        <nav>
            <Link className="nav--link" to="/">Home</Link>
            <Link className="nav--link" to="/posts">Posts</Link>
            <Link className="nav--link" to="/profile">Profile</Link>
            {!token ? (
                <Link className="nav--link" to="/login">Login</Link>
            ) : (
            <button className="btn--logout" onClick={handleOnLogout}>
                Logout
            </button>
            )}
        </nav>
    );
};

export default TopNav;