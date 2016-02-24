'use strict';

module.exports = (grunt)=>{

  require('time-grunt')(grunt);

  grunt.initConfig({
    mochaTest: {
      serial: {
        options: { reporter: 'spec' },
        src: ['test/**/*.js']
      },
      basic:{
          options: { reporter: 'spec' },
          src: ['test/serialport-0.js']
      }

    },
    jshint: {
      all: ['*.js'],
      options:{
        jshintrc: true,
        esverion: 9
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['mochaTest:basic','mochaTest:serial']);
  grunt.registerTask('basic', ['mochaTest:basic']);
  grunt.registerTask('hint', ['jshint']);

};
