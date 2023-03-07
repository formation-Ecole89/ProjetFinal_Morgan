import React, { useEffect, useState } from "react";
import axios from "axios";
import './User.css';

export default function User() {
    const [usersList, setUsersList] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    const url = "http://localhost:3000/user/all";
    const [form, setForm] = useState({
        login: "",
        email: "",
        password: "",
    });

    function updateForm(value) {
        setForm((prev) => ({ ...prev, ...value }));
    }

    useEffect(() => {
        axios
            .get(url)
            .then((res) => {
                setUsersList(res.data.result);
                setLoaded(true);
            })
            .catch((err) => {
                setError(err);
                setLoaded(true);
            });
    }, []);

    function onSubmit(e) {
        e.preventDefault();
        axios
            .post("http://localhost:3000/user/register", form)
            .then((res) => {
                setUsersList((prevUsers) => [...prevUsers, res.data.result]);
                setForm({ login: "", email: "", password: "" });
                window.location.reload();
            })
            .catch((err) => setError(err));
    }

    if (!loaded) {
        return (
            <div>
                <h1>En cours de chargement...</h1>
            </div>
        );
    }
    if (error) {
        return (
            <div>
                <h1>Error {error.status}: {error.message}</h1>
            </div>
        );
    }

    return (
        <div className="container my-4">
            <div className="form-wrapper" style={{"width" : "600px"}}>
                <h3>Liste des utilisateurs :</h3>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {usersList.map((user) => {
                        if (!user) {
                            return null;
                        }
                        return (
                            <div style={{"width" : "500px"}} key={user._id}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{user.login}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="add-user">
                <h3 className="mt-4">Ajouter un utilisateur :</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="login">Login :</label>
                        <input
                            type="text"
                            className="form-control"
                            id="login"
                            value={form.login}
                            onChange={(e) => updateForm({ login: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email :</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            value={form.email}
                            onChange={(e) => updateForm({ email: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe :</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={form.password}
                            onChange={(e) => updateForm({ password: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Envoyer"
                            className="mt-2 btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}