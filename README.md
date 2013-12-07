# chai-locomotive-helpers

[![Build](https://travis-ci.org/jaredhanson/chai-locomotive-helpers.png)](https://travis-ci.org/jaredhanson/chai-locomotive-helpers)
[![Coverage](https://coveralls.io/repos/jaredhanson/chai-locomotive-helpers/badge.png)](https://coveralls.io/r/jaredhanson/chai-locomotive-helpers)
[![Quality](https://codeclimate.com/github/jaredhanson/chai-locomotive-helpers.png)](https://codeclimate.com/github/jaredhanson/chai-locomotive-helpers)
[![Dependencies](https://david-dm.org/jaredhanson/chai-locomotive-helpers.png)](https://david-dm.org/jaredhanson/chai-locomotive-helpers)


Helpers for testing [Locomotive](http://locomotivejs.org/) helpers with the
[Chai](http://chaijs.com/) assertion library.

## Install

    $ npm install chai-locomotive-helpers

## Usage

#### Use Plugin

Use this plugin as you would all other Chai plugins:

```javascript
var chai = require('chai');

chai.use(require('chai-locomotive-helpers'));
```

#### Write Test Cases

Once used, the `chai.locomotive.helper` and `chai.locomotive.dynamicHelper`
functions will be available to set up test cases for Locomotive helpers.

## Tests

    $ npm install
    $ npm test

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
