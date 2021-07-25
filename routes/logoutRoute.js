const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User.js');

router.get('/', (req, res) => {
    res.status(200).render('login');
})


async function logout() {
    const response = await fetch('/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert(response.statusText);
    }
  }

  document.querySelector('#logout').addEventListener('click', logout);


// router.get('/logout', function(req, res) {
//     req.logout();
//     if (!req.session) {
//         req.session.destroy(function(err) {
//             res.redirect('/login');
//         });
//     }
//     else {
//         res.redirect('/login');
//     }
// });



module.exports = router;