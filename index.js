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
                return expect.Assertion.prototype[assertName] = generateExpectAssert(assertName);
            });
        } else {
            for (var assertName in sinon.assert) {
                if (sinon.assert.hasOwnProperty(assertName)) {
                    expect.Assertion.prototype[assertName] = generateExpectAssert(assertName);
                }
            }
        }

        expect.sinon = sinon;
        return expect;
    };

    if (isNode) {
        module.exports = useSinonExpect(require('sinon'), require('expect.js'));
        module.exports.use = useSinonExpect;
        return;
    }

    useSinonExpect(global.sinon, global.expect);
}(this));
