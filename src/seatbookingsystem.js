define([
  'module/seats/initializer',
  'module/seats/finder'
], function(SeatsInitializer, SeatsFinder) {
  'use strict';

  var SeatBookingSystem;

  SeatBookingSystem = function(options) {
    options = options || {};

    this.totalSeats           = options.totalSeats || 67;
    this.seatsInOneRow        = options.seatsInOneRow || 5;
    this.maxBookingPerPerson  = options.maxBookingPerPerson || 5;

    this.numOfRows            = Math.ceil(this.totalSeats / this.seatsInOneRow);

    this.init();
  };
  SeatBookingSystem.prototype = {

    _seatsFinder: null,
    _seats: [],
    /**
     * Initializes seats and seats finder.
     */
    init: function() {
      var seatsInitializer =  new SeatsInitializer({
        'totalSeats': this.totalSeats,
        'seatsInOneRow': this.seatsInOneRow,
        'maxBookingPerPerson': this.maxBookingPerPerson
      });

      this._seats = seatsInitializer.getSeats();

      this._seatsFinder = new SeatsFinder(
        this._seats,
        this.maxBookingPerPerson
      );
    },

    /**
     * Takes a number of seats required to book seats.
     * @param {int} numOfSeatsRequired
     * @returns {Array}
     */
    book: function(numOfSeatsRequired) {

      if (isNaN(numOfSeatsRequired)) {
        throw new Error('Invalid Argument for numOfSeatsRequired');
      }

      var seats = this._seatsFinder.find(numOfSeatsRequired);

      if (seats.length > 0) {
        seats.forEach(function(seat) {
          seat.book();
        });
      }
      return seats;
    },

    /**
     *
     * @param {object} seatPosition object containing row and col
     * @returns {boolean} returns true if operation is success
     */
    cancel: function(seatPosition) {
      if (
        isNaN(seatPosition.row) ||
        isNaN(seatPosition.col) ||
        seatPosition.row > this.numOfRows ||
        seatPosition.col > this.seatsInOneRow
      ) {
        throw new Error('Invalid seat position');
      }

      return this._seats[seatPosition.row][seatPosition.col].cancel();
    },

    /**
     * @returns {Array} all seats
     */
    getAllSeats: function() {
      return this._seats;
    }
  };
  return SeatBookingSystem;
});
