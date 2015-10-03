'use strict';

module.exports = function() {
    return {
        options: {
            jshintrc: true
        },
        gruntfile: {
            src: '<%= config.gruntfile %>'
        },
        build: {
            src: '<%= config.taskfiles %>'
        },
        main: {
            files: {
                all: [
                    '<%= config.paths.src %>**/*.js',
                    '<%= config.paths.test %>**/*.js'
                ]
            }
        }
    };
};
