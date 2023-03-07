import './Video.css';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function convertToEmbedUrl(url) {
    const videoId = url.substr(url.lastIndexOf('=') + 1);
    return `https://www.youtube.com/embed/${videoId}`;
}

export default function Video() {
    const [video, setVideo] = useState();
    const [comments, setComments] = useState([]);
    const [commentAdded, setCommentAdded] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState();
    const params = useParams();
    const videoUrl = "http://localhost:3000/video/" + params.id;
    const commentsUrl = "http://localhost:3000/comment/" + params.id;

    useEffect(() => {
        axios.get(videoUrl)
            .then(response => {
                setVideo(response.data.result);
                setLoaded(true);
            })
            .catch(error => {
                console.error(error);
                setError(error.status);
                setLoaded(true);
            })

        axios.get(commentsUrl)
            .then(response => {
                setComments(response.data.result);
            })
            .catch(error => {
                console.error(error);
            })
    }, [videoUrl, commentsUrl, commentAdded]);

    async function onSubmit(e) {
        e.preventDefault();
        if (!commentAdded.trim()) {
            setError("Le contenu ne peut pas être vide.");
            return;
        }
        const comment = { contenu: commentAdded };
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        };
        await axios.post("http://localhost:3000/comment/add/" + params.id, comment, config)
            .then(res => {
                window.location.reload();
            })
            .catch(err => setError(err.response.data.message));
    }

    if (!loaded) {
        return <h1>En cours de chargement...</h1>;
    } else if (error) {
        return <h1>Erreur {error}</h1>;
    } else {
        return (
            <div className="video-container">
                <div className="video-card">
                    <h1>
                        {video.titre} posté par {video.loginAuthor}
                    </h1>
                    <div className="video-responsive">
                        <iframe
                            width="560"
                            height="315"
                            src={convertToEmbedUrl(video.lien)}
                            title={video.titre}
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
                <div className="comments-section">
                    <h2>Commentaires</h2>
                    <form onSubmit={onSubmit}>
                        <textarea
                            placeholder="Ajouter un commentaire"
                            value={commentAdded}
                            onChange={(e) => setCommentAdded(e.target.value)}
                        ></textarea>
                        <div className="form-group">
                            <input
                                type="submit"
                                value="Envoyer"
                                className="mt-2 btn btn-primary"
                            />
                        </div>
                    </form>
                    {comments.map((comment) => (
                        <div className="comment" key={comment._id}>
                            <h3>{comment.loginAuthor}</h3>
                            <p>{comment.contenu}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}