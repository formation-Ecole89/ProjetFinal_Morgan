import React, { useEffect, useState } from "react";
import axios from "axios";
import './VideoRemove.css';

function convertToEmbedUrl(url) {
    const videoId = url.substr(url.lastIndexOf('=') + 1);
    return `http://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

export default function Home() {
    const [videosList, setVideosList] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState();
    const url = "http://localhost:3000/video/remove";

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setVideosList(res.data.result);
                setLoaded(true);
            })
            .catch(err => {
                setError(err);
                setLoaded(true);
            })
    }, []);

    const handleDeleteVideo = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/video/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data.message);
            // Rafraîchir la liste des vidéos et ajouter la classe "removing" à l'élément supprimé
            setVideosList(prevList => prevList.map(video => {
                if (video._id === id) {
                    return { ...video, removing: true };
                } else {
                    return video;
                }
            }));
            setTimeout(() => {
                setVideosList(prevList => prevList.filter(video => video._id !== id));
            }, 300);
        } catch (error) {
            console.error(error);
        }
    };

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
                <h1>Error {error.status} : {error.message}</h1>
            </div>
        );
    }
    return (
        <div className="rm-list-container">
            {videosList.map((video, index) => {
                return (
                    <div className={`rm-item ${video.removing ? 'removing' : ''}`} key={index}>
                        <a href={`/video/${video._id}`}>
                            <div className="rm-thumbnail-container">
                                <img src={convertToEmbedUrl(video.lien)} alt={`Thumbnail for video ${video.titre}`} />
                            </div>
                            <div className="rm-details-container">
                                <h3 className="rm-title text-capitalize">{video.titre}</h3>
                                <h4 className="rm-author">By {video.loginAuthor}</h4>
                            </div>
                        </a>
                        <button className="delete-button" onClick={() => handleDeleteVideo(video._id)}>
                            Supprimer
                        </button>
                    </div>
                )
            })}
        </div >
    )
}
