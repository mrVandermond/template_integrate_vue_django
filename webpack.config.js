const path = require('path');
const fs = require('fs');
const BundleTracker = require('webpack-bundle-tracker');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const EslintFriendlyFormatter = require('eslint-friendly-formatter');
const webpack = require('webpack');

// Отредактировать env как нужно
const projectDir = process.env.PROJECT_DIR;
const output = path.resolve(projectDir, 'www', 'webpack_bundle');

const bundlesPath = path.resolve(projectDir, 'bundles');

// Собираем .bem файлы из папки bundles
const entries = {
// Файл для конкретного template
  main: './www/js/app/main.js',
};
fs.readdirSync(bundlesPath).forEach((dirname) => {
  const dirPath = path.resolve(bundlesPath, dirname);
  if (fs.lstatSync(dirPath).isDirectory()) {
    fs.readdirSync(dirPath).forEach((filename) => {
      if (filename.endsWith('.bem')) {
        const bundlePath = path.resolve(dirPath, filename);
        const bundleName = `${dirname}:${filename.replace(new RegExp('.bem$'), '')}`;
        entries[bundleName] = bundlePath;
      }
    });
  }
});

module.exports = (env) => {
  const filename = env && env.fast ? '[name]/[name]' : '[name]/[name]_[chunkhash]';

  const config = {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
        new OptimizeCSSAssetsPlugin(),
      ],
    },
    devServer: {
      hot: true,
      quiet: true,
      headers: { 'Access-Control-Allow-Origin': '*' },
    },
    entry: entries,
    output: {
      filename: `${filename}.js`,
      path: output,
      publicPath: '',
    },
    plugins: [
      new BundleTracker({ filename: './webpack-stats-in-progress.json' }),
      new MiniCssExtractPlugin({
        filename: `${filename}.css`,
        chunkFilename: '[id].css',
      }),
      new webpack.ProvidePlugin({ jQuery: 'jquery', $: 'jquery', 'window.jQuery': 'jquery' }),
      new VueLoaderPlugin(),
    ],
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: path.resolve('./www/js/libs/vue.2.6.10.min.js'),
        jquery$: path.resolve('./www/js/libs/jquery/1.11.1/jquery.min.js'),
        libs: path.resolve('./www/js/libs/'),
        css: path.resolve('./www/css/'),
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: [
            path.resolve(projectDir, 'www', 'js', 'app'),
          ],
          options: {
            formatter: EslintFriendlyFormatter,
          },
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    'env',
                    {
                      modules: false,
                      targets: {
                        ie: '10',
                      },
                    },
                  ],
                  'stage-2',
                ],
              },
            },
          ],
        },
        {
          test: /\.bem/,
          use: [
            'babel-loader',
            path.resolve('./bem.js'),
          ],
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                url: false,
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
      ],
    },
  };

  if (env && env.fast) {
    config.mode = 'development';
    config.devtool = undefined;
    config.optimization = { minimizer: [] };
    config.output.path = path.resolve(projectDir, 'www', 'webpack_bundle');
    config.output.publicPath = 'http://localhost:8080/';
  }
  return config;
};
