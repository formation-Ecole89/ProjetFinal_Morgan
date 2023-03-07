const express = require("express");
const router = express.Router();
const Video = require("../model/Video");
const auth = require("../middleware/auth");

router.post("/add", auth, async (req, res) => {
    try {
        req.body.loginAuthor = req.payload.login;
        req.body.idAuthor = req.payload.id;
        const video = new Video(req.body);
        const newVideo = await video.save();
        return res
            .status(201)
            .json({ message: "Video créé", result: newVideo });
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.get("/all", async (req, res) => {
    try {
        const videoList = await Video.find().sort("-createdAt");
        return res
            .status(200)
            .json({ result: videoList });
    } catch (err) {
        return res
            .status(500)
            .json({ message: err.message });
    }
})

router.get("/remove", auth, async (req, res) => {
    try {
        const videoList = await Video.find({ idAuthor: req.payload.id });
        return res.status(200).json({ result: videoList });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res
                .status(404)
                .json({ message: "la video recherchée n'existe pas)" })
        }
        return res
            .status(200)
            .json({ result: video })
    } catch (err) {
        return res
            .status(500)
            .json({ message: err.message })
    }
})

router.delete("/delete/:id", auth, async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (req.payload.id == video.idAuthor) {
            await video.deleteOne();
            return res
                .status(200)
                .json({ message: "la video a été supprimée" })
        }
        return res
            .status(403)
            .json("vous n'êtes pas autorisé à supprimer cette video");
    } catch (err) {
        return res
            .status(500)
            .json({ message: err.message })
    }
})

module.exports = router;