import htmlTemplate from 'rollup-plugin-generate-html-template';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import image from 'rollup-plugin-img';
import copy from 'rollup-plugin-copy';
import { uglify } from 'rollup-plugin-uglify';

module.exports = {
	input: 'src/index.js',
	output: {
		// file: 'bundle.js',
		dir: 'dist',
		// format: 'iife',
		format: 'es',
		compact: false,
	},
	plugins: [
		// babel({
		//   exclude: 'node_modules/**',
		// }),
		copy({
			targets: [{ src: 'resources/sounds/*', dest: 'dist/resources/sounds' }],
		}),
		commonjs({
			include: 'node_modules/**', // Default: undefined
			exclude: [], // Default: undefined
			extensions: ['.js'], // Default: [ '.js' ]
			ignoreGlobal: false, // Default: false
			sourceMap: true, // Default: true
		}),
		image({
			output: 'dist', // default the root
			extensions: /\.(png|jpg|jpeg|gif|svg)$/, // support png|jpg|jpeg|gif|svg, and it's alse the default value
			limit: 8192, // default 8192(8k)
			exclude: 'node_modules/**',
		}),
		htmlTemplate({
			template: 'src/index.html',
			target: 'dist/index.html',
		}),
		serve({
			host: 'localhost',
			contentBase: ['dist'],
			verbose: true,
			port: 8080,
		}),
		livereload({
			watch: 'dist',
			verbose: true, // Disable console output
		}),
	],
};
