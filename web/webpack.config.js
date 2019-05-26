// web/webpack.config.js

const path = require('path')
const webpack = require('webpack')

const arInclude = require('./include.config')

//const appDirectory = path.resolve(__dirname, '../');
const appDirectory = path.resolve(__dirname)

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.js$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [path.resolve(appDirectory, 'index.js'), ...arInclude],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'react-native' preset is recommended to match React Native's packager
      presets: ['module:metro-react-native-babel-preset'],
      //      presets: ['babel-preset-expo'],
      // Re-write paths to import only the modules needed by the app

      plugins: [
        'react-native-web',
        //["react-native-web", { commonjs: true }]
      ],
    },
  },
}

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
}

module.exports = (env, options) => {
  return {
    entry: [
      // load any web API polyfills
      // path.resolve(appDirectory, 'polyfills-web.js'),
      // your web-specific entry file
      path.resolve(appDirectory, 'index.js'),
    ],

    // configures where the build ends up
    output: {
      filename: 'bundle.js',
      path: path.resolve(appDirectory, 'build'),
      publicPath: '/',
    },
    devServer: {
      contentBase: './build',
    },

    // ...the rest of your config

    module: {
      rules: [babelLoaderConfiguration, imageLoaderConfiguration],
    },

    resolve: {
      // This will only alias the exact import "react-native"
      alias: {
        'react-native$': 'react-native-web',

        //after move rn-app from subfolder
        'react-native-web': path.resolve(
          appDirectory,
          'node_modules/react-native-web'
        ),
        //      'react-native': 'react-native-web',

        //need "bla-bla-bla invariant vialotion", rn-app use hooks
        react: path.resolve(appDirectory, 'node_modules/react'),
        'react-dom': path.resolve(appDirectory, 'node_modules/react-dom'),
      },
      // If you're working on a multi-platform React Native app, web-specific
      // module implementations should be written in files using the extension
      // `.web.js`.

      //modules: [path.resolve(appDirectory, 'node_modules'), path.resolve(appDirectory, 'rncliapp/node_modules') ],

      extensions: ['.web.js', '.js'],
    },
    plugins: [
      //new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        __DEV__: options.mode==='development',
      }),
    ],
    // optimization: {
    //   // We no not want to minimize our code.
    //   minimize: false
    // },
  }
}
