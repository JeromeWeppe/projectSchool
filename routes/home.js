const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    res.render('pages/index');
});

// router.get('/login', (req, res, next) => {
//     res.render('pages/login');
// });

// router.get('/:id', (req, res) => {
//     const id = req.params.id;
//     fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
//         .then(response => response.json())
//         .then(json => res.render('pages/index', {
//             cham: json
//         }));
// })

module.exports = router;
