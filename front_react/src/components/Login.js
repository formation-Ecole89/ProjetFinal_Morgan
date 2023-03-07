import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({
        login: "",
        password: ""
    });
    const [error, setError] = useState();
    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const user = { ...form };
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const body = JSON.stringify(user);
        await axios
            .post("http://localhost:3000/user/login", body, config)
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                navigate("/video");
                window.location.reload();
            })
            .catch((err) => setError(err.response.data.message));
    }

    return (
        <div>
            <div className="form-container">
                <div className="form-wrapper">
                    <h3>Votre Login :</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Login :</label>
                            <input
                                type="text"
                                className="form-control"
                                id="login"
                                value={form.login}
                                onChange={(e) => updateForm({ login: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="position">Mot de passe :</label>
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
                                value="Se connecter"
                                className="mt-2 btn btn-primary"
                            />
                        </div>
                    </form>
                    {error != null ? (
                        <p className="alert alert-danger">{error}</p>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    );
}