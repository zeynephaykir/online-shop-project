const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        default: "",
    },
    isApproved: {
        type: Boolean,
        default: false,
    }
});

feedbackSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

feedbackSchema.set("toJSON", {
    virtuals: true,
});


exports.Feedback = mongoose.model("Feedback", feedbackSchema);
