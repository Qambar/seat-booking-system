define(['module/seat'], function(Seat) {
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

    _seats: [],

    /**
     * Returns seats
     * @returns {Array}
     */
    getSeats: function() {
      return this._seats;
    },
    /**
     * Initializes the seats
     * @returns {Array}
     * @private
     */
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

      return this._seats;
    }

  };
  return Initializer;
});
