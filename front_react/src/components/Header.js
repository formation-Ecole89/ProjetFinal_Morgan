import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Header() {
    const [login, setLogin] = useState("");
    useEffect(() => {
        async function fetchProfile() {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            try {
                const response = await axios.get("http://localhost:3000/user/me", config);
                setLogin(response.data.result.login);
            } catch (err) {
                console.log(err.response.data.message);
            }
        }
        fetchProfile();
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/video">
                    MomoTube
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/login">
                                Login
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/user">
                                Users
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="/video"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Manage Video
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <a className="dropdown-item" href="/video/add">
                                        Add Video
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/video/remove">
                                        Remove Video
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <button className="btn btn-outline-success" type="submit" disabled>
                            {login ? (
                                <a className="nav-link" href="/">Bonjour {login} !</a>
                            ) : (
                                <a className="nav-link" href="/">Non Connecté</a>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}
