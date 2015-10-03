module.exports = function(grunt) {
    'use strict';

    require('time-grunt')(grunt);

    // Prevent grunt from autoloading templates to avoid an error message
    // see https://github.com/maenu/grunt-template-jasmine-istanbul/issues/8
    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*', '!grunt-template-jasmine-requirejs']
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: grunt.file.readJSON('./tasks/config.json'),
        clean: require('./tasks/clean')(grunt),
        jshint: require('./tasks/jshint')(grunt),
        jscs: require('./tasks/jscs')(grunt),
        jasmine: require('./tasks/jasmine')(grunt),
        requirejs: require('./tasks/requirejs')(grunt),
        connect: require('./tasks/connect')(grunt),
        watch: require('./tasks/watch')(grunt)
    });

    //Load tasks from the specified Grunt plugin.
    grunt.loadNpmTasks('grunt-contrib-watch');

    //Register an "alias task" or a task function.
    grunt.registerTask('lint', ['jshint', 'jscs']);
    grunt.registerTask('test', ['lint', 'jasmine']);
    grunt.registerTask('serve', ['connect:server']);
    grunt.registerTask('dist', ['clean', 'test', 'requirejs']);

    //Default
    grunt.registerTask('default', ['clean', 'test']);


};