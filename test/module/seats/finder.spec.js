define([
  'seat-booking-system/module/seats/finder',
  'seat-booking-system/module/seat'
], function(SeatsFinder, Seat) {
  'use strict';

  describe('seat-booking-system.module.seats.finder', function() {

    var seats;
    var seatFinder;

    var maxNumOfSeatsInARow = 5;

    beforeEach(function() {

      //create dummy seats
      seats = [];
      for (var i = 0; i < 5; i++) {
        seats[i] = [];
        for (var j = 0; j < maxNumOfSeatsInARow; j++) {
          seats[i][j] = new Seat({
            'row' : i,
            'col' : j
          });
        }
      }

    });

    afterEach(function() {
      seatFinder = null;
    });

    it('a person gets right number of seats', function() {
      seatFinder = new SeatsFinder(seats, maxNumOfSeatsInARow);
      for (var i = 1; i <= 5; i++) {
        expect(seatFinder.find(i).length).toEqual(i);
      }
    });

    it('can do group booking for ' + maxNumOfSeatsInARow + ' People', function() {
      seatFinder = new SeatsFinder(seats, maxNumOfSeatsInARow);

      var availableSeats = seatFinder.find(maxNumOfSeatsInARow, maxNumOfSeatsInARow);
      expect(availableSeats.length).toEqual(maxNumOfSeatsInARow);
    });

    it('can do booking in multiple rows if all seats are not available in one row', function() {

      //Book all seats
      seats.forEach(function(seatsRow) {
        seatsRow.forEach(function(seat) {
          seat.book();
        });
      });
      seatFinder = new SeatsFinder(seats, maxNumOfSeatsInARow);

      //Cancel 3 bookings in different rows
      seats[0][1].cancel();
      seats[1][1].cancel();
      seats[2][1].cancel();

      expect(seatFinder.find(3).length).toEqual(3);

    });

    it('cannot do booking if no seat is available', function() {

      //Should not be able to book any number of seats

      //Book all seats
      seats.forEach(function(seatsRow) {
        seatsRow.forEach(function(seat) {
          seat.book();
        });
      });
      seatFinder = new SeatsFinder(seats, maxNumOfSeatsInARow);

      for (var i = 1; i <= maxNumOfSeatsInARow; i++) {
        expect(seatFinder.find(i).length).toEqual(0);
      }

    });

    it('can find a random seat in seats which is available', function() {

      //Book all seats
      seats.forEach(function(seatsRow) {
        seatsRow.forEach(function(seat) {
          seat.book();
        });
      });
      seatFinder = new SeatsFinder(seats, maxNumOfSeatsInARow);

      var randomRow = Math.floor(Math.random() * 4);
      var randomCol = Math.floor(Math.random() * 4);

      seats[randomRow][randomCol].cancel();

      expect(seatFinder.find(1).length).toEqual(1);

    });

    it('a person cannot book more than 5 seats', function() {
      seatFinder = new SeatsFinder(seats, maxNumOfSeatsInARow);

      expect(function() {
        seatFinder.find(6);
      }).toThrow(new Error('Cannot book more than 5 seats'));
    });

    it('a person cannot book zero or less seats', function() {
      seatFinder = new SeatsFinder(seats, maxNumOfSeatsInARow);

      expect(function() {
        seatFinder.find(0);
      }).toThrow(new Error('You cannot find 0 or less seats'));

    });

    it('does not return any seats if required seats are greater than available', function() {
      //Book all seats
      seats.forEach(function(seatsRow) {
        seatsRow.forEach(function(seat) {
          seat.book();
        });
      });
      seats[0][0].cancel();

      seatFinder = new SeatsFinder(seats, maxNumOfSeatsInARow);

      expect(seatFinder.find(2).length).toEqual(0);
    });

  });

});
