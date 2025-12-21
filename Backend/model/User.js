const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const resources=require("../model/resource");
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        bookmarks:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"resources"
            }
        ]
    },
    { timestamps: true },
);
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.comparePassword = function(password) {
    console.log(password);
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
