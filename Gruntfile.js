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
        bump: {
            options: {
                commitMessage: 'chore: release v%VERSION%',
                pushTo: 'origin'
            }
        },
        'npm-publish': {
            options: {
                abortIfDirty: true
            }
        },
        'npm-contributors': {
            options: {
                commitMessage: 'chore: update contributors'
            }
        },
        uglify: {
            all: {
                files: {
                    'sinon-expect.min.js': ['sinon-expect.js']
                }
            }
        },
        watch: {
            files: ['sinon-expect.js', 'src/**/*.js', '<%= simplemocha.unit.src %>'],
            tasks: ['test']
        }
    });

    grunt.registerTask('build', ['uglify:all']);
    grunt.registerTask('release', 'Bump the version and publish to NPM.', function(type) {
        return grunt.task.run(['test', 'build', 'npm-contributors', "bump:" + (type || 'patch') + ':bump-only', 'bump-commit', 'npm-publish']);
    });
    grunt.registerTask('test', ['simplemocha:unit', 'karma:unit']);
    grunt.registerTask('default', ['build', 'test']);
};
