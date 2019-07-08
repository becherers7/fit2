let express = require('express')
let router = express.Router()
let User = require('../database/models/User')
let passport = require('../passport')


router.post('/', (req, res) => {
    console.log('user signup');

    let { username, password } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            let newUser = new User({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err);
                console.log("savedUser: ", savedUser);
                res.json(savedUser);
            });
        }
    })
})

router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body);
        next();
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
);

//so I need to attach to the req.body the user information then retrieve that.

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.Passport);
    isLoggedIn(req);
    if (req.user) {
        res.json({ user: req.user });
    } else {
        res.json({ user: null });
    }
});
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
        console.log("yep");
        return next();
    }else{
        console.log("nope");
    }

    // if they aren't redirect them to the home page
    // console.log("failed");
}

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router
