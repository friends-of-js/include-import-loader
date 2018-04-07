import { getOptions } from 'loader-utils'
import { loader } from 'webpack'

const IMPORT = 'import'
const REQUIRE = 'require'

export interface IncludeImportLoaderOptions {
  type: 'import' | 'require'
  files?: string[]
  file?: string
}

function resolveFiles ({ files, file }: { files?: string[], file?: string }) {
  return Array.isArray(files) ? files : [file]
}

function createIncludeString (this: loader.LoaderContext, type: 'import' | 'require' | any, files: string[]) {
  if (![IMPORT, REQUIRE].includes(type)) {
    this.emitError(
      new Error(`include-import-loader type option must be 'import' or 'require', but you pass '${type}'!`)
    )

    return ''
  }

  let includes = ''
  for (const file of files) {
    includes += type === IMPORT ? `import '${file}';\n` : `require('${file}');\n`
  }

  return includes
}

export default function includeImportLoader (this: loader.LoaderContext, source: string): string {
  const { type = REQUIRE, files, file }: IncludeImportLoaderOptions = getOptions(this) as any

  if (files === undefined && file === undefined) return source

  return `${createIncludeString.call(this, type, resolveFiles({ files, file }))}${source}`
}
