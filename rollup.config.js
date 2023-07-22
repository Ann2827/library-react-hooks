import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: 'src/index.tsx',
    output: {
      exports: 'named',
      file: 'dist/index.modern.js',
      format: 'es',
      sourcemap: false,
    },
    plugins: [
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser({
        output: {
          comments: false,
        },
      }),
    ],
  },
];
