'use strict';

module.exports = function() {
    return {
        options: {
            baseUrl: 'src/',
            mainConfigFile: '<%= config.paths.requireConfig %>',
            name: 'seat-booking-system/api'
        },
        source: {
            options: {
                optimize: 'none',
                out: 'dist/seat-booking-system.src.js'
            }
        },
        minified: {
            options: {
                optimize: 'uglify2',
                generateSourceMaps: false,
                out: 'dist/seat-booking-system.min.js'
            }
        }
    };
};
