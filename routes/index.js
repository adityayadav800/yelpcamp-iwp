var express = require("express");
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

// ==============================================
//                 LANDING PAGE
// ==============================================
router.get("/", function (req, res) {
    res.render("landing");
});

// ==============================================
//                 AUTH ROUTES
// ==============================================

router.get("/register", function (req, res) {
    res.render("register");
});

router.post("/register", function (req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function () {
                req.flash("success", "Welcome to YelpCamp " + req.body.username + "!");
                res.redirect("/campgrounds");
            });
        }
    });
});

// Login Routes

router.get("/login", function (req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local",
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {
});

// Logout Route

router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Successfully logged out!");
    res.redirect("/campgrounds");

});

module.exports = router;