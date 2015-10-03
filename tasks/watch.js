'use strict';

module.exports = function() {
    return {
        scripts: {
            files: [
                '<%= config.paths.src %>**/*.js',
                '<%= config.paths.test %>**/*.js'
            ],
            tasks: ['lint'],
            options: {
                spawn: false
            }
        }
    };
};
