define(['seatbookingsystem'], function(SeatBookingSystem) {
  'use strict';

  describe('seatbookingsystem', function() {
    var sbs;

    beforeEach(function() {
      sbs = new SeatBookingSystem();
    });

    it('can book seats from 1 to 5', function() {
      for (var i = 1; i <= 5; i++) {
        expect(sbs.book(i).length).toEqual(i);

      }
    });

    it('seats become unavailable after booking', function() {
      var checkSeatAvailable = function(seat) {
        expect(seat.isAvailable()).toBe(false);
      };

      for (var i = 1; i <= 5; i++) {
        sbs.book(i).forEach(checkSeatAvailable);
      }
    });

    it('returns all the available seats', function() {
      expect(sbs.getAllSeats().length).toEqual(14);
    });

    it('booking checks for invalid number', function() {
      expect(function() {
        sbs.book('NOTANUMBER');
      }).toThrow(new Error('Invalid Argument for numOfSeatsRequired'));
    });

    it('can cancel seats by taking seat position', function() {
      var seat = sbs.book(1)[0];

      //Verify seat is booked
      expect(seat.isAvailable()).toBe(false);

      sbs.cancel({
        'row': seat.row,
        'col': seat.col
      });
      //Seat should now be available
      expect(seat.isAvailable()).toBe(true);
    });

  });

});
