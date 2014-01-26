(function() {
    var isNode = typeof module === "object" && typeof require === "function";

    if (isNode) {
        global.expect = require('../../sinon-expect.js').expect;
        global.sinon = require('sinon');
    }
}());
