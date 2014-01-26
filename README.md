karma-sinon-expect
================

[![Build Status](https://travis-ci.org/maksimr/karma-sinon-expect.png?branch=master)](https://travis-ci.org/maksimr/karma-sinon-expect)

  * [Sinon](http://sinonjs.org/)
  * [Expect.js](https://github.com/LearnBoost/expect.js/)

for [Karma](http://karma-runner.github.io)

This package wrap [sinon.assert API](http://sinonjs.org/docs/#assertions) to expect.

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

This Karma plugin requires Karma `~0.10.0`

Add `sinon-expect` to the `frameworks` key in your Karma configuration:

```js
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'sinon-expect'],
    ...
  });
}
```

## Browser

Install the module via bower

```sh
$ bower install sinon-expect
```

```html
<script src="bower_components/expect/expect.js" type="text/javascript"></script>
<script src="bower_components/sinonjs/sinon.js" type="text/javascript"></script>
<script src="bower_components/sinon-expect/index.js" type="text/javascript"></script>
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
