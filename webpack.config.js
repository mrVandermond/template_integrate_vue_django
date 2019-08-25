const path = require('path');
const fs = require('fs');
var BundleTracker = require('webpack-bundle-tracker');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require('webpack');

const home = process.env.HOME;
const output = path.resolve(home, 'www', 'static', 'chunks');

const bundlesPath = path.resolve('./bundles');

// Собираем .bem файлы из папки bundles
const entries = {
    app: './vue/templates/vue/index.html',
};
fs.readdirSync(bundlesPath).forEach(dirname => {
    const dirPath = path.resolve(bundlesPath, dirname);
    if (fs.lstatSync(dirPath).isDirectory()) {
        fs.readdirSync(dirPath).forEach(filename => {
            if (filename.endsWith('.bem')) {
                const bundlePath = path.resolve(dirPath, filename);
                const bundleName = dirname + ':' + filename.replace(new RegExp('\.bem$'), '');
                entries[bundleName] = bundlePath
            }
        });
    }
});

module.exports = env => {
    const filename = env && env.fast ? '[name]/[name]' : '[name]/[name]_[chunkhash]';

    const config = {
        mode: 'production',
        devtool: 'source-map',
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true
                }),
                new OptimizeCSSAssetsPlugin()
            ]
        },
        entry: entries,
        output: {
            filename: filename + '.js',
            path: output
        },
        plugins: [
            new BundleTracker({filename: './webpack-stats-in-progress.json'}),
            new MiniCssExtractPlugin({
                filename: filename + ".css",
                chunkFilename: "[id].css"
            }),
            new webpack.ProvidePlugin({jQuery: 'jquery', $: 'jquery', "window.jQuery": "jquery"}),
        ],
        resolve: {
            alias: {
                jquery$: path.resolve('./www/js/libs/jquery/1.11.1/jquery.min.js'),
                libs: path.resolve('./www/js/libs/'),
                css: path.resolve('./www/css/')
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                "presets": [
                                    [
                                        "env",
                                        {
                                            modules: false,
                                            "targets": {
                                                "ie": "10"
                                            }
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.bem/,
                    use: [
                        'babel-loader',
                        path.resolve('./bem.js')
                    ]
                },
                {
                    test: /\.s?css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: "css-loader",
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                }
            ]
        }
    };

    if (env && env.fast) {
        config.mode = 'development';
        config.devtool = undefined;
        config.optimization = {minimizer: []};
        config.output.path = path.resolve(home, 'www', 'static-test', 'chunks');
    }
    return config;
};
