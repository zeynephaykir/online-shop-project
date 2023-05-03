const express = require('express');
const router = express.Router();

const Comment = require('../models/comments-ratings');

//---inserts into database by Post method---
router.post(`/`, (req, res) => {
    const comment = new Comment({
        comment: req.body.comment,
        isApproved: req.body.isApproved,
        rating: req.body.rating,
    });

    comment
        .save()
        .then((createdComment) => {
            res.status(201).json(createdComment);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false,
            });
        });
});

router.get(`/`, async (req, res) => {
    const commentList = await Comment.find();

    res.send(commentList.at(0));
});

module.exports = router;
