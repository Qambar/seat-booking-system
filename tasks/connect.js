'use strict';

module.exports = function(grunt) {
    return {
        server: {
            options: {
                hostname: '<%= config.server.hostname %>',
                port: '<%= config.server.port %>',
                base: ['<%= config.paths.docs %>'],
                keepalive: true,
                middleware: function(connect, options, middlewares) {
                    var paths = grunt.config.get('config.paths');
                    // Passing an array to the middleware, the first item is the "route"
                    middlewares.push(['/src', connect['static'](paths.src)]);
                    middlewares.push(['/dist', connect['static'](paths.dist)]);
                    return middlewares;
                }
            }
        }
    };
};
