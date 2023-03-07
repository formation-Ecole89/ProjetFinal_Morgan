const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth")

router.post(('/register'), async (req, res) => {
    try {
        const searchUser = await User.findOne({ login: req.body.login });
        if (searchUser) {
            return res
                .status(403)
                .json({ message: `l'utilisateur ${req.body.login} existe déjà` });
        }
        const user = new User(req.body);
        const newUser = await user.save();
        return res
            .status(201)
            .json({ message: `l'utilisateur ${newUser.login} a été créé` });
    } catch (err) {
        return res
            .status(500)
            .json({ message: err.message })
    }
});

router.post("/login", async (req, res) => {
    try {
        /*
        - récupérer l'user
        - vérifier s'il existe
        - vérifier validité mdp
        - créer le token
        - envoyer le token vers front
        */
        const user = await User.findOne({ login: req.body.login });
        if (!user) {
            return res
                .status(400)
                .json({ message: "user non trouvé" })
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "mdp incorrect" });
        }

        const payload = {
            id: user._id,
            login: user.login,
            roles: user.roles,
            email: user.email
        }
        const token = jwt.sign(payload, process.env.PRIVATE_KEY);
        return res
            .status(200)
            .json({ message: "authentification réussie", token: token });
    } catch (err) {
        return res
            .status(500)
            .json({ message: err.message });
    }
})

router.get("/all", async (req, res) => {
    try {
        const usersList = await User.find().sort("login");
        return res
            .status(200)
            .json({ result: usersList });
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: err.message });
    }
})

router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.payload.id);
        return res
            .status(200)
            .json({ result: user })
    } catch (err) {
        return res
            .status(500)
            .json({ message: err.message })
    }
});

module.exports = router;