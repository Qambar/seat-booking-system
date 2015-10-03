define(['seat-booking-system/module/seat'], function(Seat) {
  'use strict';

  var Initializer;

  Initializer = function(options) {
    options = options || {};

    this.totalSeats           = options.totalSeats || 67;
    this.seatsInOneRow        = options.seatsInOneRow || 5;

    this.numOfRows            = Math.ceil(this.totalSeats / this.seatsInOneRow);

    this._initSeats();
  };
  Initializer.prototype = {

    _seats: null,

    getSeats: function() {
      return this._seats;
    },
    _initSeats: function() {
      this._seats = [];

      for (var i = 0, countSeats = 0; i < this.numOfRows; i++) {

        this._seats[i] = [];
        for (
          var j = 0;
          // Making sure that we don't create seats which don't exists
          j < this.seatsInOneRow && countSeats <  this.totalSeats;
          j++, countSeats++
        ) {
          this._seats[i][j] = new Seat({
            'row': i,
            'col': j
          });
        }//endfor

      }//endfor

      // Reversing the array so that it starts filling up
      // from the minimum number of seats.
      this._seats.reverse();

      return this._seats;
    }

  };
  return Initializer;
});
