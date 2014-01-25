(function() {
    var isNode = typeof module === "object" && typeof require === "function";

    if (isNode) {
        global.expect = require('../../index.js').expect;
        global.sinon = require('sinon');
    }
}());
