const express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
    res.render("pages/index",{
        isLoggedIn: req.isLoggedIn,
    });
});


// router.get("/login", (req, res, next) => {
//     res.render("pages/login");
// });

// router.get("/:id", (req, res) => {
//     const id = req.params.id;
//     fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
//         .then(response => response.json())
//         .then(json => res.render("pages/index", {
//             cham: json
//         }));
// })

module.exports = router;
