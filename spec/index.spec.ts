import { expect } from 'chai'
import * as webpack from '@webpack-contrib/test-utils'
import * as path from 'path'
import { IncludeImportLoaderOptions } from 'include-import-loader'

function createConfig (options: Partial<IncludeImportLoaderOptions>) {
  return {
    context: __dirname,
    entry: './fixtures/fixture.js',
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: path.resolve(__dirname, '../lib/module/commonjs/index.js'),
          options: options
        }
      }
    ]
  }
}

describe('Loader', () => {
  context('without type option', () => {
    it('should add require statement in source code', async () => {
      const config = createConfig({
        file: './test/file.js'
      })
      const stats = await webpack(undefined, config)
      const { source } = stats.toJson().modules[0]
      expect(source).to.be.equal('require(\'./test/file.js\');\nexport function test () {\n  return Math.random()\n}\n')
    })
  })

  context('with type equal to "import"', () => {
    it('should add require statement in source code', async () => {
      const config = createConfig({
        type: 'import',
        file: './test/file.js'
      })
      const stats = await webpack(undefined, config)
      const { source } = stats.toJson().modules[0]
      expect(source).to.be.equal('import \'./test/file.js\';\nexport function test () {\n  return Math.random()\n}\n')
    })
  })

  context('with type equal to "require"', () => {
    it('should add require statement in source code', async () => {
      const config = createConfig({
        type: 'require',
        file: './test/file.js'
      })
      const stats = await webpack(undefined, config)
      const { source } = stats.toJson().modules[0]
      expect(source).to.be.equal('require(\'./test/file.js\');\nexport function test () {\n  return Math.random()\n}\n')
    })
  })

  describe('add multiple files to source code', () => {
    it('should add 2 files to source code', async () => {
      const config = createConfig({
        type: 'import',
        files: ['./test/first.js', './test/second.js']
      })
      const stats = await webpack(undefined, config)
      const { source } = stats.toJson().modules[0]
      expect(source).to.be.equal('import \'./test/first.js\';\nimport \'./test/second.js\';\nexport function test () {\n  return Math.random()\n}\n')
    })
  })

  context('without file or files options', () => {
    it('should not add any code to source', async () => {
      const config = createConfig({})
      const stats = await webpack(undefined, config)
      const { source } = stats.toJson().modules[0]
      expect(source).to.be.equal('export function test () {\n  return Math.random()\n}\n')
    })
  })

  context('wrong type option value', () => {
    it('should emit error', async () => {
      const config = createConfig({ type: 'wrong', file: './test/first.js' } as any)
      const stats = await webpack(undefined, config)
      const { errors } = stats.toJson()
      expect(errors[0]).to.match(/Error: include-import-loader type option should be 'import' or 'require' value, but you pass 'wrong'!/)
    })
  })
})
