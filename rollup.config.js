import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  moduleName: 'Querent',
  entry: 'src/Querent.js',
  dest: 'build/Querent.js',
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  format: 'umd',
  sourceMap: true,
}
