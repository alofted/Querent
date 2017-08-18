import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  moduleName: 'Querent',
  entry: 'src/Querent.js',
  dest: 'build/Querent.js',
  plugins: [
    resolve(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      plugins: ["external-helpers"],
      presets: [
        ["latest", { es2015: { modules: false } }]
      ],
    }),
  ],
  format: 'umd',
  sourceMap: true,
}
