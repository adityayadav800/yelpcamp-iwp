var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

router.get("/campgrounds", function (req, res) {
    // Get all campgrounds from the DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log("Unfortunately, there was an error while retrieving data from the database.");
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });
});

router.post("/campgrounds", middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var description = req.body.description;
    var newCampground = { name: name, image: image, description: description, author: author };
    Campground.create(newCampground, function (err, newCampground) {
        if (err) {
            console.log("There was an error while creating a new campground");
            console.log(err);
        } else {
            console.log("New campground created!");
            res.redirect("/campgrounds");
        }
    });
});

router.get("/campgrounds/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

router.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log("There was an error while retrieving the campground using the ID.");
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

// =======================================
//          EDIT AND UPDATE ROUTES
// =======================================

router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render("campgrounds/edit", { campground: foundCampground });
    });
});

router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, foundCampground) {
        if (err) {
            console.log("There was an error while trying to find that campground");
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // Redirect to the show page.
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// =======================================
//              DELETE ROUTE
// =======================================

router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err, removedCampground) {
        if (err) {
            console.log("There was an error while trying to delete the campground.");
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.deleteMany({ _id: { $in: removedCampground.comments } }, (err) => {
                if (err) {
                    console.log("There was an error while trying to remove the comments/campground.");
                    console.log(err);
                } else {
                    res.redirect("/campgrounds");
                }
            });
        }
    });
});

module.exports = router;