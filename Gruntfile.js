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
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        watch: {
            files: ['index.js', 'src/**/*.js', '<%= simplemocha.unit.src %>'],
            tasks: ['test']
        }
    });

    grunt.registerTask('test', ['simplemocha:unit', 'karma:unit']);
    grunt.registerTask('default', ['test']);
};
