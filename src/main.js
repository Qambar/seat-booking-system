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

    this.init();
  };
  Main.prototype = {

    _seatsFinder: null,

    /**
     * Initializes seats and seats finder.
     */
    init: function() {
      var seatsInitializer =  new SeatsInitializer({
        'totalSeats': this.totalSeats,
        'seatsInOneRow': this.seatsInOneRow,
        'maxBookingPerPerson': this.maxBookingPerPerson
      });

      var seats = seatsInitializer.getSeats();

      this._seatsFinder = new SeatsFinder(
        seats,
        this.maxBookingPerPerson
      );
    },

    /**
     * Takes a number of seats required to book seats.
     * @param {int} numOfSeatsRequired
     * @returns {Array}
     */
    book: function(numOfSeatsRequired) {
      var seats = this._seatsFinder.find(numOfSeatsRequired);
      if (seats.length > 0) {
        seats.forEach(function(seat) {
          seat.book();
        });
      }
      return seats;
    }

  };
  return Main;
});
