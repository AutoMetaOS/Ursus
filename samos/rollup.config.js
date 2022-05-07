import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.js',
    output: {
        file: 'index.js',
        format: 'cjs'
    },
    plugins: [
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