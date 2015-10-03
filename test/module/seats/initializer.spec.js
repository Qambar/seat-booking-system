define(['seat-booking-system/module/seats/initializer',], function(SeatsInitializer) {
  'use strict';

  describe('seat-booking-system.module.seats.initializer', function() {

    var seats;

    beforeEach(function() {
      var seatsInitializer = new SeatsInitializer();
      seats = seatsInitializer.getSeats();
    });

    afterEach(function() {
      seats = null;
    });

    it('total rows are correct', function() {
      expect(seats.length).toEqual(14);
    });

    it('total cols are correct for all but row with minimum number of seats', function() {
      for (var i = 1; i < seats.length; i++) {
        expect(seats[i].length).toEqual(5);
      }
    });

    it('total cols are correct for row with minimum number of seats', function() {
      expect(seats[0].length).toEqual(2);
    });

  });

});
