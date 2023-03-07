import React, { useEffect, useState } from "react";
import axios from "axios";
import './Menu.css';

function convertToEmbedUrl(url) {
    const videoId = url.substr(url.lastIndexOf('=') + 1);
    return `http://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

export default function Home() {
    const [videosList, setVideosList] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState();
    const url = "http://localhost:3000/video/all"

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setVideosList(res.data.result);
                setLoaded(true);
            })
            .catch(err => {
                setError(err);
                setLoaded(true);
            })
    }, []
    );

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
        <div className="video-list-container">
            {videosList.map((video, index) => {
                return (
                    <a className="video-item" key={index} href={`/video/${video._id}`}>
                        <div className="video-thumbnail-container">
                            <img src={convertToEmbedUrl(video.lien)} alt={`Thumbnail for video ${video.titre}`}></img>
                        </div>
                        <div className="video-details-container">
                            <h3 className="video-title text-capitalize">{video.titre}</h3>
                            <h4 className="video-author">By {video.loginAuthor}</h4>
                        </div>
                    </a>
                )
            })}
        </div>
    )
}
