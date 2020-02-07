import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';

const production = process.env.BUILD === "production";

export default {
  input: ['src/main.js', 'src/paperscript.js', 'src/sw.js'],
  output: {
    sourcemap: true,
    // format: 'iife',
    name: 'app',
    dir: 'public/js'
  },
  plugins: [
    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({ browser: true }),
    commonjs(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),
  ],
  watch: {
    clearScreen: false
  }
};
