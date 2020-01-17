var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 6969;
var tableAmount = 5;
var waitlistAmount = 5;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservations = [];
var waitlist = [];

// Routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "/tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "/reserve.html"));
});

// Displays all characters
app.get("/api/tables", function(req, res) {
  return res.json(reservations);
});

app.get("/api/waitlist", function(req, res)
{
  return res.json(waitlist);
});

app.post("/api/tables", function(req, res)
{
  var newReservation = req.body;
  if(tableAmount > 0)
  {
    reservations.push(newReservation);
    tableAmount--;
    res.json(newReservation);
  }
  else if(waitlistAmount > 0)
  {
    waitlist.push(newReservation);
    waitlistAmount--;
    res.json(newReservation);
  }
  else
  {
    res.json(false);
  }
})

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
