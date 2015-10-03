define([
  'seat-booking-system/module/seats/initializer',
  'seat-booking-system/module/seats/finder'
], function(SeatsInitializer, SeatsFinder) {
  'use strict';

  var Main;

  Main = function(options) {
    options = options || {};

    this.totalSeats           = options.totalSeats || 67;
    this.seatsInOneRow        = options.seatsInOneRow || 5;
    this.maxBookingPerPerson  = options.maxBookingPerPerson || 5;

    this.numOfRows            = Math.ceil(this.totalSeats / this.seatsInOneRow);

  };
  Main.prototype = {

    _seats: null,

    init: function() {
      var seatsInitializer =  SeatsInitializer({
        'totalSeats': this.totalSeats,
        'seatsInOneRow': this.seatsInOneRow,
        'maxBookingPerPerson': this.maxBookingPerPerson
      });

      var seats = seatsInitializer.getSeats();
    },
    book: function(numOfSeats) {

    }



  };
  return Main;
});
