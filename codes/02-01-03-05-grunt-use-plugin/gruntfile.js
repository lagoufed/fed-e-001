module.exports = grunt => {
  grunt.initConfig({
    clean: {
      temp: 'temp/**'
    }
  })
  
  grunt.loadNpmTasks('grunt-contrib-clean')
}