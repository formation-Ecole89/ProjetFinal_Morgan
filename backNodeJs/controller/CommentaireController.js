const express = require("express");
const router = express.Router();
const Commentaire = require("../model/Commentaire");
const auth = require("../middleware/auth");

router.post("/add/:idVideo", auth, async (req, res) => {
    try {
        const { contenu } = req.body;
        const { id: idAuthor, login } = req.payload;
        const idVideo = req.params.idVideo;

        const commentaire = new Commentaire({
            contenu,
            idVideo,
            idAuthor,
            loginAuthor: login,
        });

        const newCommentaire = await commentaire.save();

        return res
            .status(201)
            .json({ message: "Commentaire créé", result: newCommentaire });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur serveur" });
    }
});

router.get("/:idVideo", async (req, res) => {
    try {
        const commentaires = await Commentaire.find({ idVideo: req.params.idVideo });
        return res.status(200).json({ message: "Commentaires trouvés", result: commentaires });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur serveur" });
    }
});

module.exports = router;
