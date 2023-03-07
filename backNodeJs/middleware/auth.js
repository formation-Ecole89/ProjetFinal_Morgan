const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        // extraire le token du header de la requête contenu dans "Authorization"
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.PRIVATE_KEY, (err, payload) => {
            if (err) {
                return res
                    .status(401)
                    .json({ message: "vous devez être connecté" });
            }
            req.payload = payload;
            next();
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = auth;