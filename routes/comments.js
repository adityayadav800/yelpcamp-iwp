var express = require('express');
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require('../models/comment');
var middleware = require('../middleware');

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            req.flash("error", "Something went wrong.");
            console.log("There was an error while finding the campground");
            console.log(err);
            res.redirect("back");
        } else {
            res.render("comments/new", { campground: foundCampground });
        }
    });
});

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            req.flash("error", "Something went wrong.");
            console.log("There was an error while finding the campground using ID.");
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    req.flash("error", "Something went wrong.");
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    req.flash("success", "Successfully added comment!");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});

router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            req.flash("error", "Something went wrong.");
            res.redirect("back");
            console.log("There was an error while finding the comment with the specified id.");
            console.log(err);
        } else {
            res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
        }
    });
});

router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if (err) {
            req.flash("error", "Something went wrong.");
            res.redirect("back");
            console.log("There was an error while finding the comment with the specified id.");
            console.log(err);
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// =======================================
//              DESTROY ROUTE
// =======================================
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            req.flash("error", "Something went wrong.");
            res.redirect("back");
            console.log("There was an error while deleting the comment.");
            console.log(err);
        } else {
            req.flash("success", "Comment deleted!");
            res.redirect("back");
        }
    });
});

module.exports = router;