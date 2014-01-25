var sinon = require('sinon');

global.expect = require('expect.js');
global.sinon = sinon;

beforeEach(function() {
    global.sinon = sinon.sandbox.create();
});

afterEach(function() {
    global.sinon.restore();
});
