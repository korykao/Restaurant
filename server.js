var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 6969;
var tableAmount = 5;
var waitlistAmount = 5;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservationsData = {};
var waitlistData = {};

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
  return res.json(reservationsData);
});

app.get("/api/waitlist", function(req, res)
{
  return res.json(waitlistData);
});

app.post("/api/tables", function(req, res)
{
  var newReservation = req.body;
  if(tableAmount > 0)
  {
    reservationsData.push(newReservation);
    tableAmount--;
    res.json(newReservation);
  }
  else if(waitlistAmount > 0)
  {
    waitlistData.push(newReservation);
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
