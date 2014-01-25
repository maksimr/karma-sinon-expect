module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        simplemocha: {
            options: {
                ui: 'bdd',
                reporter: 'dot'
            },
            unit: {
                src: [
                    'test/unit/mocha-globals.js',
                    'test/unit/**/*.js'
                ]
            }
        },
        watch: {
            files: '<%= simplemocha.unit.src %>',
            tasks: ['test:unit']
        }
    });

    grunt.registerTask('test', ['simplemocha:unit']);
    grunt.registerTask('default', ['test']);
};
