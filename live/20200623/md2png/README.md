# md2png

[![Build Status][travis-image]][travis-url]
[![Coverage Status][codecov-image]][codecov-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![NPM Version][version-image]][version-url]
[![License][license-image]][license-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

> Awesome node module

## Installation

```shell
$ npm install md2png

# or yarn
$ yarn add md2png
```

## Usage

<!-- TODO: Introduction of API use -->

```javascript
const md2Png = require("md2png");
const result = md2Png("zce");
// result => 'zce@zce.me'
```

## API

<!-- TODO: Introduction of API -->

### md2Png(name[, options])

#### name

- Type: `string`
- Details: name string

#### options

##### host

- Type: `string`
- Details: host string
- Default: `'zce.me'`

## CLI Usage

<!-- TODO: Introduction of CLI -->

```shell
$ yarn global add md2png

# or npm
$ npm install md2png -g
```

```shell
$ md2png --help

  Usage: md2png <input>

  Options:

    -V, --version  output the version number
    -H, --host     Email host
    -h, --help     output usage information
```

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; zce <w@zce.me> (https://zce.me)

[travis-image]: https://img.shields.io/travis/zce/md2png/master.svg
[travis-url]: https://travis-ci.org/zce/md2png
[codecov-image]: https://img.shields.io/codecov/c/github/zce/md2png/master.svg
[codecov-url]: https://codecov.io/gh/zce/md2png
[downloads-image]: https://img.shields.io/npm/dm/md2png.svg
[downloads-url]: https://npmjs.org/package/md2png
[version-image]: https://img.shields.io/npm/v/md2png.svg
[version-url]: https://npmjs.org/package/md2png
[license-image]: https://img.shields.io/github/license/zce/md2png.svg
[license-url]: https://github.com/zce/md2png/blob/master/LICENSE
[dependency-image]: https://img.shields.io/david/zce/md2png.svg
[dependency-url]: https://david-dm.org/zce/md2png
[devdependency-image]: https://img.shields.io/david/dev/zce/md2png.svg
[devdependency-url]: https://david-dm.org/zce/md2png?type=dev
[style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-url]: https://standardjs.com
