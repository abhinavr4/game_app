var express = require("express");
var router  = express.Router({mergeParams: true});
var Flight = require("../models/flight");
var middleware = require("../middleware");

//index route
router.get("/", function(req, res){
  Flight.find({}, function(err, flights){
    if(err){
      console.log(err);
    }
    else{
      res.render("flights/index", {flights: flights});
    }
  }); 
});

//new route
router.get("/new", middleware.checkAdmin, function(req, res){
  res.render("flights/new");
});

//create route
router.post("/", middleware.checkAdmin,function(req, res){
  Flight.create(req.body.flight, function(err, newFlight){
    if(err){
      res.render("flights/new");
    }
    else{
      res.redirect("/flights");
    }
  });
});

//show route
router.get("/:id", function(req, res){
  Flight.findById(req.params.id, function(err, foundFlight){
    if(err){
      res.redirect("/flights");
    }
    else{
      res.render("flights/show", {flight: foundFlight});
    }
  });
});

//edit route
router.get("/:id/edit", middleware.checkAdmin,function(req, res){
    Flight.findById(req.params.id, function(err, foundFlight){
        if(err){
            res.redirect("/flights");
        }
        else {
            res.render("flights/edit", {flight: foundFlight});
        }
    });
});

//update route
router.put("/:id", middleware.checkAdmin, function(req, res){
    Flight.findByIdAndUpdate(req.params.id, req.body.flight, function(err, updatedFlight){
       if(err){
           res.redirect("/flights");
       }
       else{
           res.redirect("/flights/" + req.params.id);
       }
   }); 
});

//delete route
router.delete("/:id", middleware.checkAdmin, function(req, res){
    Flight.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/flights");
        }
        else{
            res.redirect("/flights");
        }
    });
});

module.exports = router;