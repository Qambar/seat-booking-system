'use strict';

module.exports = function() {
    return {
        options: {
            config: '.jscsrc'
        },
        main: [
            '<%= config.paths.src %>**/*.js',
            '<%= config.paths.test %>**/*.js'
        ]
    };
};
