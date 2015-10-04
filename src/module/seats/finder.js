define(['module/seat'], function() {
  'use strict';

  var Finder;

  Finder = function(seats, maxSeatsInARow) {
    if (typeof seats === 'undefined') {
      throw new Error('Seats are not defined.');
    }

    this._seats = seats;
    this._maxSeatsInARow = maxSeatsInARow;
  };

  Finder.prototype =  {
    _maxSeatsInARow: null,
    _seats: null,
    _seatsAvailableInEachRow: [],

    /**
     * @param {int} numOfSeatsRequired
     * @returns {Array}
     */
    find: function(numOfSeatsRequired) {

      if (numOfSeatsRequired > this._maxSeatsInARow) {
        throw new Error('Cannot book more than 5 seats');
      }

      if (numOfSeatsRequired < 1) {
        throw new Error('You cannot find 0 or less seats');
      }

      //Find and cache all available seats.
      this._calculateAvailableSeats();

      //Case # 1 :
      //  Try to find seats together for group booking
      var groupSeats = this._tryToFindSeatsInOneRow(numOfSeatsRequired);

      if (groupSeats.length > 0) {
        return groupSeats;
      }

      //Case # 2:
      //  If not found together we can try matching with other rows
      var normalSeats = this._tryToFindSeatsAnywhere(numOfSeatsRequired);

      if (normalSeats) {
        return normalSeats;
      }

      //Default:
      //  Not found any available seats
      return [];
    },

    /**
     * Calculates available seats
     * @private
     */
    _calculateAvailableSeats: function() {
      this._seatsAvailableInEachRow = this._getAllAvailableSeats();
    },

    /**
     * @param {int} numOfSeatsRequired
     * @returns {Array} if numOfSeatsRequired is matched with row
     * @private
     */
    _tryToFindSeatsAnywhere: function(numOfSeatsRequired) {
      var seats = [];

      this._seatsAvailableInEachRow.forEach(function(seatsRow) {
        seatsRow.forEach(function(seat) {
          if (seats.length === numOfSeatsRequired) {
            return;
          }
          seats.push(seat);
        });
      });

      //If found seat
      if (seats.length === numOfSeatsRequired) {
        //return first match
        return seats;
      }

      return [];
    },

    /**
     * @param {int} numOfSeatsRequired
     * @returns {Array} if numOfSeatsRequired is matched with row
     * @private
     */
    _tryToFindSeatsInOneRow: function(numOfSeatsRequired) {
      var seatsRow = this._seatsAvailableInEachRow.filter(function(seatsRow) {
        return seatsRow.length >= numOfSeatsRequired;
      });

      //If found a row with required seats
      if (seatsRow.length > 0) {
        //return first row with only number of seats required
        return seatsRow[0].slice(0, numOfSeatsRequired);
      }

      return [];
    },

    /**
     *
     * @returns {Array} containing available seats in all rows
     * @private
     */
    _getAllAvailableSeats: function() {
      var self = this;
      var seatsAvailableInEachRow = [];
      this._seats.forEach(function(seatsRow) {
        var availableSeats = self._getSeatsAvailableInOneRow(seatsRow);
        //Record the current status of seats available in each row.
        seatsAvailableInEachRow.push(availableSeats);
      });

      return seatsAvailableInEachRow;
    },

    /**
     * @param {Array} seatsRow
     * @returns {Array} containing seats in one row.
     * @private
     */
    _getSeatsAvailableInOneRow: function(seatsRow) {
      var availableSeatsInARow = [];

      for (var i = 0; i < seatsRow.length; i++) {
        if (seatsRow[i].isAvailable()) {
          availableSeatsInARow.push(seatsRow[i]);
        }
      }
      return availableSeatsInARow;
    }

  };
  return Finder;
});
