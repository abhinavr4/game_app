var express 			= require("express"),
	app 				= express(),
	bodyParser 			= require("body-parser"),
	mongoose 			= require("mongoose"),
	passport 			= require("passport"),
	LocalStrategy 		= require("passport-local"),
	methodOverride 		= require("method-override"),
	User 				= require("./models/user"),
	Flight 				= require("./models/flight"),
	Ticket				= require("./models/ticket");

var indexRoutes = require("./routes/index"),
	flightRoutes = require("./routes/flights"),
	ticketRoutes = require("./routes/tickets");

mongoose.connect("mongodb://localhost/flight_app_v4");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.use(require("express-session")({
	secret: "It's a secret!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

app.use("/", indexRoutes);
app.use("/flights", flightRoutes);
app.use("/tickets", ticketRoutes);

app.listen("3000", "localhost", function(){
	console.log("Server has started!");
});
