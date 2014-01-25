karma-sinon-expect
================

  * [Sinon](http://sinonjs.org/)
  * [Expect.js](https://github.com/LearnBoost/expect.js/)

for [Karma](http://karma-runner.github.io)

This package wrap [sinon.assert API](http://sinonjs.org/docs/#assertions) to expect.

Requirements
------------

This Karma plugin requires Karma `~0.10.0`

Installation
------------

Install the module via npm

```sh
$ npm install --save-dev karma-sinon-expect
```

## Nodejs

Use sinon and expect from karma-sinon-expect package

```js
global.expect = require('karma-sinon-expect').expect;
```

Use custom version of sinon and expect

```js
global.expect = require('karma-sinon-expect').use(require('sinon'), require('expect.js'));
```

## Karma

Add `sinon-expect` to the `frameworks` key in your Karma configuration:

```js
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'sinon-expect'],
    ...
  });
}
```

Usage
-----

Sinon and expect matchers for Sinon are also available:

```coffee
describe 'karma tests with sinon', ->

  it 'can spy on objects', ->
    foo = bar: ->
    sinon.spy foo, 'bar'

    foo.bar 'baz'

    expect(foo.bar).to.be.calledWith 'baz'
```

Conversion table
----------------

| sinon.assert                 | expect                         |
| -----------------------------|:------------------------------:|
| sinon.assert.calledOnce(spy) | expect(spy).to.be.calledOnce() |
