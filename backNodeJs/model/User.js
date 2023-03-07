const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        login: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        roles: {
            type: [String],
            default: ["user"],
        },
        password: {
            type: String,
            required: true
        }
    }, {
    timestamps: true,
}
);

userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
})

const userModel = mongoose.model("User", userSchema)
module.exports = userModel;