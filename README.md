karma-sinon-expect
================

![Karma](http://karma-runner.github.io/assets/img/banner.png "Karma")

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

Additional expectation

- firstArgument
- secondArgument
- argument

```coffee
describe 'tests sinon spy with arguments', ->

  it 'expect first argument', ->
    foo = bar: ->
    sinon.spy foo, 'bar'

    foo.bar 'baz'

    expect(foo.bar).firstArgument().to.be.equal 'baz'

  it 'expect second argument', ->
    foo = bar: ->
    sinon.spy foo, 'bar'

    foo.bar 'baz', 'foo'

    expect(foo.bar).secondArgument().to.be.equal 'foo'

  it 'expect any argument', ->
    foo = bar: ->
    sinon.spy foo, 'bar'

    foo.bar 'baz', 'foo', 'bar'

    expect(foo.bar).argument(2).to.be.equal 'bar'
```

Conversion table
----------------

| sinon.assert                 | expect                         |
| -----------------------------|:------------------------------:|
| sinon.assert.calledOnce(spy) | expect(spy).to.be.calledOnce() |
