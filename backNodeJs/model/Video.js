const mongoose = require("mongoose");
const User = require("./User")

const videoSchema = new mongoose.Schema(
    {
        titre: {
            type: String,
            required: true,
        },
        lien: {
            type: String,
            required: true,
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
const videoModel = mongoose.model("Video", videoSchema);
module.exports = videoModel;