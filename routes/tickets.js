var express = require("express");
var router  = express.Router({mergeParams: true});
var Ticket = require("../models/ticket");
var middleware = require("../middleware");

//index route
router.get("/", middleware.checkUser, function(req, res){
  Ticket.find({}, function(err, tickets){
    if(err){
      console.log(err);
    }
    else{
      res.render("tickets/index", {tickets: tickets});
    }
  }); 
});

//create route
router.post("/", middleware.checkUser,function(req, res){
  Ticket.create(req.body.ticket, function(err, newTicket){
    if(err){
      res.render("flights/index");
    }
    else{
      res.redirect("/tickets");
    }
  });
});

//delete route
router.delete("/:id", middleware.checkUser, function(req, res){
    Ticket.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/tickets");
        }
        else{
            res.redirect("/tickets");
        }
    });
});

module.exports = router;