require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const userController = require("./controller/UserController");
const videoController = require("./controller/VideoController");
const commentaireController = require("./controller/CommentaireController");
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());

mongoose
    .set('strictQuery', true)
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connexion à la BDD établie"))
    .catch((error) => console.log(error));

app.use(express.json());
app.listen(port, () => console.log(`Le serveur répond sur le port ${port}`));

app.use("/user", userController);
app.use("/video", videoController);
app.use("/comment", commentaireController);