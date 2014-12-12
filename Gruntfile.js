module.exports = function(grunt) {

  // Configuration
  grunt.initConfig({
    
    // Build ember
    exec: {
      build: 'ember build --environment=production'
    },
    
    // Deploy
    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    }
    
  });


  // Load task plugins
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-gh-pages');


  // Tasks
  grunt.registerTask('default', ['uglify']);

};  