requirejs.config({
  "baseUrl": "../",
  "paths": {
    "seatbookingsystem": "dist/seatbookingsystem",
    "jquery": "node_modules/jquery/dist/jquery.min",
    "seatmapgenerator": "js/seatmapgenerator"
  }
});

require(['jquery', 'seatbookingsystem', 'seatmapgenerator'], function($, SeatBookingSystem, SeatMapGenerator) {

  var options = {
    'totalSeats' : 67,
    'seatsInOneRow' : 5,
    'maxBookingPerPerson': 5
  };

  var sbs = new SeatBookingSystem(options);

  options.seatMapContainer = '#js-seat-map-container';
  var smg = new SeatMapGenerator(sbs.getAllSeats(), options);
  smg.generate();

  var countBooked = 0;

  $('.js-book-seat').click(function(e) {
    "use strict";

    e.preventDefault();

    if (countBooked == options.totalSeats) {
      alert("Carriage is full");
      return;
    }

    var numOfRequiredSeats = parseInt($('.js-number-of-seats').val());
    var seatsBooked = sbs.book(numOfRequiredSeats);
    if (seatsBooked.length === 0) {
      alert("Not enough seats available!");
    }

    countBooked += seatsBooked.length;

    smg.refresh();
  });

});