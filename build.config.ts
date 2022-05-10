import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
  ],
  outDir: 'lib',
  declaration: true,
  externals: ['axios'],
  rollup: {
    emitCJS: true
  }
})
