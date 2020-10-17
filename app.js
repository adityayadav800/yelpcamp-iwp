var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var localStrategy = require('passport-local');
var User = require('./models/user');
var methodOverride = require("method-override");
var seedDB = require('./seeds');

var execPHP = require("./middleware/execphp.js");

app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/yelp_camp_v9", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.static(__dirname + "/public"));
app.use(flash());
// seedDB(); Seed the database

// ======================== PHP Stuff =======================

execPHP.phpFolder = './views'
app.use('*.php', function (request, response, next) {
    execPHP.parseFile(request.originalUrl, function (phpResult) {
        response.write(phpResult);
        response.end();
    });
});

// ==========================================================

var indexRoutes = require('./routes/index');
var commentRoutes = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds');

// ==========================================
//           PASSPORT CONFIGURATION
// ==========================================

app.use(require('express-session')({
    secret: "Once again, Rusty wins cutest dog",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ==========================================
//                  ROUTES
// ==========================================

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(3000, function () {
    console.log("YelpCamp Online!");
});