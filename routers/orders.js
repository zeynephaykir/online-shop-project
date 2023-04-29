const express = require("express");
const { Order } = require("../models/order");
const router = express.Router();

router.get(`/`, async (req, res) => {
    const ordersList = await Order.find();

    if (!ordersList) {
        res.status(500).json({ success: false });
    }
    res.send(ordersList);
});

module.exports = router;
