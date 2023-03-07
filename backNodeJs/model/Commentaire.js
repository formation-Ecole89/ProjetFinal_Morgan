const mongoose = require("mongoose");
const User = require("./User")

const commentaireSchema = new mongoose.Schema(
    {
        contenu: {
            type: String,
            required: true,
        },
        idVideo: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: User
        },
        idAuthor: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: User
        },
        loginAuthor: {
            type: String,
            required: true,
        }
    }, {
    timestamps: true
}
);
const commentaireModel = mongoose.model("Commentaire", commentaireSchema);
module.exports = commentaireModel;