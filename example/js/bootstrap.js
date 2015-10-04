requirejs.config({
  "baseUrl": "../",
  "paths": {
    "seatbookingsystem": "dist/seatbookingsystem",
    "jquery": "node_modules/jquery/dist/jquery.min"
  }
});

require(['jquery', 'seatbookingsystem'], function($, SeatBookingSystem) {

  var options = {
    'totalSeats' : 67,
    'seatsInOneRow' : 5,
    'maxBookingPerPerson': 5
  };


  var sbs = new SeatBookingSystem(options);
  


  for (var i = 1; i <= 13; i++) {
    console.log(sbs.book(5));
  }
  console.log(sbs.book(2));

  console.log(sbs.book(2));


});