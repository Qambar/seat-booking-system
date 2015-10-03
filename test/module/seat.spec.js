define(['seat-booking-system/module/seat'], function(Seat) {
  'use strict';

  describe('seat-booking-system.module.seat', function() {

    var seat;

    beforeEach(function() {
      seat = new Seat({
        row: 0,
        col: 0
      });
    });

    afterEach(function() {
      seat = null;
    });

    it('can check if seat is available', function() {
      expect(seat.isAvailable()).toBe(true);
    });

    it('can book a seat', function() {
      seat.book();
      expect(seat.isAvailable()).toBe(false);
    });

    it('can cancel a booking', function() {
      //Make a  booking
      seat.book();

      //Verify it is booked.
      expect(seat.isAvailable()).toBe(false);

      //Cancel booking
      seat.cancel();
      expect(seat.isAvailable()).toBe(true);

    });

  });

});
