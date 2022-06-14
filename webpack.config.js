const path = require( 'path' );

module.exports = {
    entry: './src/ts/App.ts',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve( __dirname, 'dist/js' ),
    },
    optimization: {
        minimize: true
    },
    // include: [
    //     "src/types/**/*"
    // ],
};