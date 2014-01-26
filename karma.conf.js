module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'sinon-expect'],
        files: [
            'test/unit/mocha-globals.js',
            'test/unit/**/*.js'
        ],
        plugins: [
            'karma-mocha',
            'karma-phantomjs-launcher',
            require('./sinon-expect.js'),
        ],
        logLevel: config.LOG_DEBUG,
        browsers: ['PhantomJS']
    });
};
