const path = require( 'path' );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );

module.exports = {
    entry: './src/App.ts',
    mode: 'production',
    plugins: [ new MiniCssExtractPlugin() ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: "asset",
                use: [ {
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'img/[hash]-[name].[ext]'
                    }
                } ]
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve( __dirname, 'dist' ),
        publicPath: '',
    },
    optimization: {
        minimize: true
    },
    // include: [
    //     "src/types/**/*"
    // ],
};