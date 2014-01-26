/**
 * @fileOverview Wrap sinon.assert API to expect
 * @see http://sinonjs.org/docs/#assertions
 *
 * Examples you can find in test/unit/ folder
 */
(function(global) {
    var isNode = typeof module === "object" && typeof require === "function";

    var useSinonExpect = function(sinon, expect) {
        var generateExpectAssert = function(assertName) {
            return function() {
                sinon.assert[assertName].apply(sinon.assert, [this.obj].concat(Array.prototype.slice.call(arguments, 0)));
                return this;
            };
        };

        if (Object.keys) {
            Object.keys(sinon.assert).forEach(function(assertName) {
                if (expect.Assertion.prototype[assertName]) {
                    return;
                }

                return expect.Assertion.prototype[assertName] = generateExpectAssert(assertName);
            });
        } else {
            for (var assertName in sinon.assert) {
                if (sinon.assert.hasOwnProperty(assertName) && !expect.Assertion.prototype[assertName]) {
                    expect.Assertion.prototype[assertName] = generateExpectAssert(assertName);
                }
            }
        }

        expect.Assertion.prototype.argument = function(argumentIndex) {
            sinon.assert.called(this.obj);
            return expect(this.obj.args[0][argumentIndex]);
        };

        expect.Assertion.prototype.firstArgument = function() {
            return expect(this.obj).argument(0);
        };

        expect.Assertion.prototype.secondArgument = function() {
            return expect(this.obj).argument(1);
        };

        expect.sinon = sinon;
        return expect;
    };

    if (isNode) {
        /**
         * Nodejs
         */
        module.exports.expect = useSinonExpect(require('sinon'), require('expect.js'));
        module.exports.use = useSinonExpect;

        /**
         * Karma adapter
         */
        var path = require('path');
        var pattern = function(file) {
            return {
                pattern: file,
                included: true,
                served: true,
                watched: false
            };
        };
        var framework = function(files) {
            files.unshift(pattern(path.join(__dirname, 'sinon-expect.js')));
            files.unshift(pattern(path.resolve(require.resolve('expect.js'))));
            files.unshift(pattern(path.resolve(require.resolve('sinon'), '../../pkg/sinon.js')));
        };
        framework.$inject = ['config.files'];

        module.exports['framework:sinon-expect'] = ['factory', framework];
        return;
    }

    /**
     * Browser
     */
    useSinonExpect(global.sinon, global.expect);
}(this));
