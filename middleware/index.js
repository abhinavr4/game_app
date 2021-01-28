var Flight = require("../models/flight");
var Ticket = require("../models/ticket");

var middlewareObj = {};

middlewareObj.checkTicketOwnership = function(req, res, next) {
 	if(req.isAuthenticated()){
        Ticket.findById(req.params.id, function(err, foundTicket){
           	if(err){
            	res.redirect("back");
           	}  
           	else if(foundTicket.buyer.id.equals(req.user._id)) {
                return next();
            } 
            else {
                res.redirect("back");
            }
        });
    } 
    else {
        res.redirect("back");
    }
}
//====

middlewareObj.checkAdmin = function(req, res, next) {
 	if(req.isAuthenticated()){
        if(req.user.username === "admin"){
        	return next();
        }
        else{
            res.redirect("/flights");
        }
    } 
    else {
        res.redirect("/login");
    }
}

middlewareObj.checkUser = function(req, res, next){
    if(req.isAuthenticated()){
        if(req.user.username !== "admin"){
            return next();
        }
        else{
            res.redirect("/flights");
        }
    }
    res.redirect("/login");
}

module.exports = middlewareObj;