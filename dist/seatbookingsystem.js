define('module/seat',[], function() {
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

define('module/seats/initializer',['module/seat'], function(Seat) {
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

define('module/seats/finder',['module/seat'], function() {
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

define('seatbookingsystem',[
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

