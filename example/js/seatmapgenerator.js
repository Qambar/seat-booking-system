define(['jquery'], function() {
  'use strict';

  var SeatMapGenerator;


  SeatMapGenerator = function(seats, options) {
    if (!seats) {
      throw Error('Cannot generate seat map without seats');
    }

    this._seats = seats;

    options = options || {};
    this.totalSeats           = options.totalSeats || 67;
    this.seatsInOneRow        = options.seatsInOneRow || 5;
    this.maxBookingPerPerson  = options.maxBookingPerPerson || 5;
    this.seatMapContainer     = $(options.seatMapContainer || '#js-seat-map-container');
  };

  SeatMapGenerator.prototype = {
    generate: function() {
      var self = this;

      this._seats.forEach(function(seatsRow) {
        seatsRow.forEach(function(seat) {
          self.seatMapContainer.append(self.getUISeat(seat));
        });
      });
    },

    getUISeat: function(seat) {
      var uiSeat = $('<div>').addClass('seat');

      uiSeat.attr('data-row', seat.row);
      uiSeat.attr('data-col', seat.col);

      var seatNumber = (seat.col+1) +  ("0" + (seat.row+1)).slice(-2);
      if (seat.isAvailable()) {
        uiSeat.addClass('seat-available');
      } else {
        uiSeat.removeClass('seat-available');
        seatNumber = seatNumber + "B";
        uiSeat.attr('title', 'Click to unbook this seat');
        uiSeat.addClass('js-seat-booked');
      }

      uiSeat.text(seatNumber);

      return uiSeat;
    },

    refresh: function() {
      this.seatMapContainer.html('');
      this.generate();
    }

  };

  return SeatMapGenerator;

});