// Webpack Config for JS, SCSS, Images, Fonts & SVG's
const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const globImporter = require('node-sass-glob-importer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackBar = require('webpackbar');
const Dotenv = require('dotenv-webpack');

const buildPath = path.resolve(__dirname, './public/dist/');

module.exports = (env, argv) => {
    const devMode = argv.mode === 'development';

    const args = {
        entry: {
            app: ['./assets/javascript/app.js', './assets/stylesheets/style.scss'],
            editor: ['./assets/stylesheets/editor.scss', './assets/javascript/editor.js'],
        },
        output: {
            filename: devMode ? '[name].js' : '[name].[hash].min.js',
            path: path.resolve(__dirname, './public/dist/'),
        },
        devtool: 'source-maps',
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: [
                                '@babel/plugin-proposal-export-default-from',
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-transform-runtime',
                            ],
                        },
                    },
                    resolve: {
                        extensions: ['.js', '.jsx'],
                    },
                },
                {
                    test: /\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true },
                        },
                        {
                            loader: 'postcss-loader',
                            options: { sourceMap: true },
                        },
                        { loader: 'resolve-url-loader' },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                importer: globImporter(),
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif|webp)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'images/',
                                name: '[name].[ext]',
                                publicPath: `${buildPath}images/`,
                            },
                        },
                    ],
                },
                {
                    test: /\.(svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'svgs/',
                                name: '[name].[ext]',
                                publicPath: `${buildPath}svgs/`,
                            },
                        },
                        {
                            loader: 'svgo-loader',
                            options: {
                                plugins: [
                                    { removeTitle: true },
                                    { convertColors: { shorthex: false } },
                                    { convertPathData: false },
                                ],
                            },
                        },
                    ],
                },
                {
                    test: /\.(woff(2)?|ttf|eot)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'fonts/',
                                name: '[name].[ext]',
                            },
                        },
                    ],
                },
            ],
        },
        externals: {
            jquery: 'jQuery',
        },
        plugins: [
            new CleanWebpackPlugin(),
            new FixStyleOnlyEntriesPlugin(),
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : '[name].[hash].min.css',
                chunkFilename: devMode ? '[id].css' : '[id].[hash].min.css',
            }),
            new ImageminPlugin({
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                cacheFolder: './imgcache',
            }),
            new ManifestPlugin(),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
            }),
            new WebpackBar(),
            new Dotenv({
                path: '../../../.env',
                systemvars: true,
            }),
        ],
    };

    if (devMode === 'production') {
        args.optimization = {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    terserOptions: { output: { comments: false } },
                }),
            ],
        };
    }

    return args;
};
