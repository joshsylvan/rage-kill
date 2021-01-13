import htmlTemplate from 'rollup-plugin-generate-html-template';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import image from 'rollup-plugin-img';
import copy from 'rollup-plugin-copy';
import { uglify } from 'rollup-plugin-uglify';

module.exports = {
	input: 'src/index.js',
	output: {
		// file: 'bundle.js',
		dir: 'dist',
		format: 'iife',
		compact: true,
	},
	plugins: [
		babel({
			exclude: 'node_modules/**',
			presets: ['@babel/env'],
		}),
		copy({
			targets: [{ src: 'resources/sounds/*', dest: 'dist/resources/sounds' }],
		}),
		commonjs({
			include: 'node_modules/**', // Default: undefined
			exclude: [], // Default: undefined
			extensions: ['.js'], // Default: [ '.js' ]
			ignoreGlobal: false, // Default: false
			sourceMap: false, // Default: true
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
		uglify(),
	],
};
