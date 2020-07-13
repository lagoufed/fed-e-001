export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/bundle.iife.js',
      format: 'iife'
    }
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/bundle.cjs.js',
      format: 'cjs'
    }
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/bundle.esm.js',
      format: 'esm'
    }
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/bundle.amd.js',
      format: 'amd'
    }
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/bundle.system.js',
      format: 'system'
    }
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/bundle.umd.js',
      format: 'umd'
    }
  }
]
