import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/index.js',
    output: {
        file: 'index.js',
        format: 'cjs'
    },
    plugins: [
        commonjs(),
        nodeResolve( {
            exportConditions: [ 'browser', 'worker' ],
            browser: true,
        } ),
        terser( {
            ecma: 2020,
            mangle: { toplevel: false },
            compress: {
                module: true,
                toplevel: true
            },
            output: { quote_style: 1 }
        } )
    ]
};