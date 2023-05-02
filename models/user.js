const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    homeAddress: {
        type: String,
        default: "",
    },
    phone: {
        type: String,
        required: true,
    },
    taxId: {
        type: String,
        default: "",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isProductManager: {
        type: Boolean,
        default: false,
    },
    isSalesManager: {
        type: Boolean,
        default: false,
    }
});

userSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

userSchema.set("toJSON", {
    virtuals: true,
});

exports.User = mongoose.model("User", userSchema);
exports.userSchema = userSchema;