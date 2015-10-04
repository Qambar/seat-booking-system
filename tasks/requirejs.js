'use strict';

module.exports = function() {
    return {
        options: {
            baseUrl: 'src/',
            mainConfigFile: '<%= config.paths.requireConfig %>',
            name: 'seatbookingsystem'
        },
        source: {
            options: {
                optimize: 'none',
                out: 'dist/seatbookingsystem.js'
            }
        },
        minified: {
            options: {
                optimize: 'uglify2',
                generateSourceMaps: false,
                out: 'dist/seatbookingsystem.min.js'
            }
        }
    };
};
