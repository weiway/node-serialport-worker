'use strict';

module.exports = (grunt)=>{

  require('time-grunt')(grunt);

  grunt.initConfig({
    mochaTest: {
      test: {
        options: { reporter: 'spec' },
        src: ['test/**/*.js']
      }
    },
    jshint: {
      all: ['*.js', 'test/**/*.js', 'arduinoTest/**/*.js'],
      options:{
        jshintrc: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['mochaTest']);

};
