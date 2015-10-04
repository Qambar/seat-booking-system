define([''], function() {
  'use strict';

  var Seat;

  Seat = function(options) {
    options = options || {};

    if (typeof options.row === 'undefined' || typeof options.col === 'undefined') {
      throw new Error('You need to specify the seat position.');
    }
    if (options.row < 0 || options.col < 0) {
      throw new Error('Seat position cannot be negative.');
    }

    this.row = options.row;
    this.col = options.col;

    this.booked   = false;
  };

  Seat.prototype =  {

    /**
     * Books a seat
     * @returns {boolean} true on operation success
     */
    book: function() {
      if (this.isAvailable()) {
        this.booked = true;
        return true;
      }
      throw new Error('Seat is already booked.');
    },
    /**
     * Cancel's a seat
     * @returns {boolean} true on operation success
     */
    cancel: function() {
      if (!this.isAvailable()) {
        this.booked = false;
        return true;
      }
      throw new Error('Seat was never booked.');
    },
    /**
     * Checks if seat is available
     * @returns {boolean}
     */
    isAvailable: function() {
      return !this.booked;
    }
  };
  return Seat;
});
