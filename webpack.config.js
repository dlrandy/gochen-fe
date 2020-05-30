/* eslint-disable no-param-reassign */
/* eslint-disable global-require */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ImageminPlugin = require('imagemin-webpack'); // 手动压缩文件， 减少打包时间，也为了保证image的质量
// lossless
// const imageminJpegtran = require('imagemin-jpegtran');
// const imageminOptipng = require('imagemin-optipng');
// lossy
// const imageminMozjpeg = require('imagemin-mozjpeg');
// const ImageminPlugin = require('imagemin-webpack-plugin').default;
//  webpack-libs-optimizations
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');
const workboxPlugin = require('workbox-webpack-plugin');


const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const postcssNormalize = require('postcss-normalize');

const alias = [
  '@Actions',
  '@Assets',
  '@Common',
  '@Components',
  '@Containers',
  '@Epics',
  '@Networks',
  '@Reducers',
  '@Routes',
  '@Store',
  '@@Types',
  '@Utils',
  '@Common',
].reduce((obj, key) => {
  obj[key] = path.resolve(
    path.join(
      './src',
      key.substring(1).toLowerCase(),
    ),
  );
  return obj;
}, {});


module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'production',
  target: 'web',
  devtool: 'source-map',
  entry: ['./index.ts'],
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: '/',
    // pathinfo: true,
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.png', '.jpg', 'jpeg', 'webp'],
    alias,
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          // { loader: 'cache-loader' },
          // {
          //   loader: 'thread-loader',
          //   options: {
          //     // there should be 1 cpu for the fork-ts-checker-webpack-plugin
          //     workers: require('os').cpus().length - 1,
          //   },
          // },
          {
            loader: 'ts-loader',
            options: {
              // happyPackMode: true,
              configFile: 'tsconfig.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssNormalize(/* pluginOptions */),
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009',
                    grid: 'autoplace',
                  },
                  stage: 0,
                }),
              ],
            },
          },
        ],
      },
      {
        test: [/\.(bmp|gif|jpeg|jpg|webp|png|svg)$/],
        loader: 'file-loader',
        options: {
          name: 'media/[path][name].[hash:6].[ext]',
        },
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'asset/[name].[ext]',
          },
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
      title: 'GOChen best practices',
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|zh/),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash:8:6].css',
      chunkFilename: 'styles/[id].[contenthash:8:6].css',
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new PurgecssPlugin({
      paths: glob.sync('./src/**/*', { nodir: true }),
      only: ['bundle', 'vendor'],
    }),
    new workboxPlugin.GenerateSW({
      swDest: 'js/sw.js',
      clientsClaim: true,
      skipWaiting: false,
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'disabled',
    }),
  ],
  optimization: {
    moduleIds: 'named',
    chunkIds: 'named',
    minimizer: [
      // new ImageminPlugin({
      //   bail: false,
      //   cache: true,
      //   imageminOptions: {
      //     plugins: [
      //       ['gifsicle', { interlaced: true }],
      //       ['jpegtran', { progressive: true }],
      //       ['optipng', { optimizationLevel: 5 }],
      //       [
      //         'svgo',
      //         {
      //           plugins: [
      //             {
      //               removeViewBox: false,
      //             },
      //           ],
      //         },
      //       ],
      //     ],
      //   },
      //   loader: false,
      //   name: '[path][name].[ext]',
      // }),
      // new ImageminPlugin({
      //   pngquant: ({quality: [0.5, 0.5]}),
      //   plugins: [imageminMozjpeg({quality: 50})]
      // })
      new TerserPlugin({
        cache: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      minSize: 30000,
      cacheGroups: {
        defaultVendors: {
          priority: -10,
          reuseExistingChunk: true,
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
  performance: false,
};
