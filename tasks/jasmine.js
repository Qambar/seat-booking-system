'use strict';

module.exports = function() {
    return {
        main: {
            src: '<%= config.paths.src %>**/*.js',
            options: {
                specs: '<%= config.paths.test %>**/*.spec.js',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfigFile: 'src/config.js'
                },
                helpers: 'node_modules/jasmine-ajax/lib/mock-ajax.js'
            }
        }
    };
};
