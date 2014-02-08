/**
 * @fileOverview Wrap sinon.assert API to expect
 * @see http://sinonjs.org/docs/#assertions
 *
 * Examples you can find in test/unit/ folder
 */
(function(global) {
    var isNode = typeof module === "object" && typeof require === "function";
    /**
     * Inspect
     */
    var i = function(obj) {
        return obj.displayName || 'spy';
    };

    var useSinonExpect = function(sinon, expect) {
        var generateExpectAssert = function(assertName) {
            return function() {
                sinon.assert[assertName].apply(sinon.assert, [this.obj].concat(Array.prototype.slice.call(arguments, 0)));
                return this;
            };
        };

        // Change type of error from default sinon 'AssertError'
        // on expect 'Error'
        sinon.assert.failException = 'Error';

        /**
         * Sinon.JS ships with a set of assertions that mirror most behavior
         * verification methods and properties on spies and stubs.
         * The advantage of using the assertions is that failed expectations
         * on stubs and spies can be expressed directly as assertion
         * failures with detailed and helpful error messages.
         *
         * http://sinonjs.org/docs/#assertions-api
         */
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

        /**
         * @desc Array of arguments received, spy.args[0] is an array of arguments recevied in the first call.
         * @see http://sinonjs.org/docs/#spies-api
         * @param {argumentIndex} argumentIndex The index of argument
         */
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

        /**
         * @see http://sinonjs.org/docs/#spies-api
         */
        expect.Assertion.prototype.calledBefore = function(anotherSpy, msg) {
            this.assert(
                this.obj.calledBefore(anotherSpy),
                msg || function() {
                    return 'expected ' + i(this.obj) + ' to be called before ' + i(anotherSpy);
                },
                msg || function() {
                    return 'expected ' + i(this.obj) + ' not called before ' + i(anotherSpy);
                });
            return this;
        };

        expect.Assertion.prototype.calledAfter = function(anotherSpy, msg) {
            this.assert(
                this.obj.calledAfter(anotherSpy),
                msg || function() {
                    return 'expected ' + i(this.obj) + ' to be called after ' + i(anotherSpy);
                },
                msg || function() {
                    return 'expected ' + i(this.obj) + ' not called after ' + i(anotherSpy);
                });
            return this;
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
