import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'

export default [
  {
    input: 'src/Querent.js',
    output: {
      file: 'build/Querent.js',
      format: 'umd',
      name: 'Querent',
      sourcemap: true
    },
    plugins: [
      resolve(),
      babel({
        babelrc: false,
        exclude: 'node_modules/**',
        plugins: ['external-helpers'],
        presets: [
          ['latest', { es2015: { modules: false } }],
        ],
      }),
    ],
  },
  {
    input: 'src/Querent.js',
    output: {
      file: 'build/Querent.min.js',
      format: 'umd',
      name: 'Querent',
      sourcemap: true
    },
    plugins: [
      resolve(),
      babel({
        babelrc: false,
        exclude: 'node_modules/**',
        plugins: ['external-helpers'],
        presets: [
          ['latest', { es2015: { modules: false } }],
        ],
      }),
      uglify(),
    ],
  },
]
