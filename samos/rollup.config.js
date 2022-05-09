import { terser } from 'rollup-plugin-terser';
import ts from "rollup-plugin-ts";

export default {
    input: 'src/index.js',
    output: {
        file: 'index.js',
        format: 'cjs'
    },
    plugins: [
        ts( {
            tsconfig: {
                target: 'es2021',
                allowSyntheticDefaultImports: true,
                allowJs: true,
                checkJs: true,
                strict: true,
                noImplicitAny: true,
            }
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