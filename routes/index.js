const passport = require('passport');
const { isAuthenticated } = require('../middleware/authenticate');
const router = require('express').Router();
router.use('/', require('./swagger'));
router.use('/swagger', isAuthenticated, swaggerRouter);
router.use('/aircrafts', require('./aircrafts'));
router.use('/birds', require('./birds'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function (req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;