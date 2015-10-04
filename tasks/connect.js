'use strict';

module.exports = function(grunt) {
    return {
        server: {
            options: {
                hostname: '<%= config.server.hostname %>',
                port: '<%= config.server.port %>',
                base: ['<%= config.paths.example %>'],
                keepalive: true,
                middleware: function(connect, options, middlewares) {
                    var paths = grunt.config.get('config.paths');
                    // Passing an array to the middleware, the first item is the "route"
                    middlewares.push(['/node_modules', connect['static'](paths.nodeModules)]);
                    middlewares.push(['/dist', connect['static'](paths.dist)]);
                    return middlewares;
                }
            }
        }
    };
};
