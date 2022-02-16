const express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
    res.render("pages/index",{
        isLoggedIn: req.isLoggedIn,
    });
});

module.exports = router;
