import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './VideoAdd.css';

export default function VideoAdd() {
    const [form, setForm] = useState({
        titre: "",
        lien: ""
    });
    const [error, setError] = useState();
    const navigate = useNavigate();
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value }
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const video = { ...form };
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        };
        await axios.post("http://localhost:3000/video/add", video, config)
            .then(res => {
                navigate("/video");
            })
            .catch(err => setError(err.response.data.message));
    }

    return (<div>
        <div className="form-container">
            <div className="form-wrapper">
                <h3>Votre Vidéo :</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Titre :</label>
                        <input
                            type="text"
                            className="form-control"
                            id="titre"
                            value={form.titre}
                            onChange={(e) => updateForm({ titre: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="position">Lien :</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lien"
                            value={form.lien}
                            onChange={(e) => updateForm({ lien: e.target.value })}
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
                {error != null ? <p className="alert alert-danger">{error}</p> : <div></div>}
            </div>
        </div>
    </div>
    )
}