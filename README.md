# @friends-of-js/include-import-loader

[![Build Status](https://travis-ci.org/friends-of-js/include-import-loader.svg?branch=master)](https://travis-ci.org/friends-of-js/include-import-loader)
[![Test Coverage](https://api.codeclimate.com/v1/badges/86f943cef7d400ad6b6a/test_coverage)](https://codeclimate.com/github/friends-of-js/include-import-loader/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/86f943cef7d400ad6b6a/maintainability)](https://codeclimate.com/github/friends-of-js/include-import-loader/maintainability)
[![code coverage](https://img.shields.io/codecov/c/github/friends-of-js/include-import-loader.svg)](https://codecov.io/gh/friends-of-js/tslint-configs)
[![license](https://img.shields.io/github/license/friends-of-js/include-import-loader.svg)](LICENSE)

> Webpack loader for including files in your bundles, that can be usefull in testing

## Install

```bash
npm install --save-dev @friends-of-js/include-import-loader
```

## Usage

**webpack.config.js**
```javascript
const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.spec\.js$/,
        use: [
          {
            loader: '@friends-of-js/include-import-loader',
            options: {
              type: 'import',
              files: [
                path.resolve(__dirname, 'prepare/test-environment.js')
              ]
            }
          }
        ]
      }
    ]
  }
}
```

## Generated code

This loader would add at top of your spec bundles this code:

```javascript
import 'absolute_path/prepare/test-environment.js'
// your code
```

If your set type to 'require', it would produce this code:
```javascript
require('absolute_path/prepare/test-environment.js')
// your code
```

## Options

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`type`**|`{String}`|`require`|'import' or 'require'|
|**`files`**|`{String[]}`|`undefined`|Specify array of files to include in your code. Should be an absolute path. If you specify **`files`** property - **`file`** property would be ignored|
|**`file`**|`{String}`|`undefined`|Specify file to include in your code. Should be an absolute path.|


## License
@friends-of-js/include-import-loader © [Dmitriy Romanov](https://github.com/friends-of-js), released under the MIT License.
Authored and maintained with help from contributors ([list](https://github.com/friends-of-js/include-import-loader/contributors)).
