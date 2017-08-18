import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'

export default [
  {
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
          ["latest", { es2015: { modules: false } }],
        ],
      }),
    ],
    format: 'umd',
    sourceMap: true,
  },
  {
    moduleName: 'Querent',
    entry: 'src/Querent.js',
    dest: 'build/Querent.min.js',
    plugins: [
      resolve(),
      babel({
        babelrc: false,
        exclude: 'node_modules/**',
        plugins: ["external-helpers"],
        presets: [
          ["latest", { es2015: { modules: false } }],
        ],
      }),
      uglify(),
    ],
    format: 'umd',
    sourceMap: true,
  },
]
