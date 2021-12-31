const path = require('path');
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// 배포 시: process.env.NODE_ENV = 'production'; 

module.exports = {
  mode: 'development', // 배포 시: production
  devtool: 'eval', // 배포 시: hidden-source-map
  // stats: {
  //   errorDetails: true,
  // },
  resolve: {
    extensions: ['.jsx', '.js'],
  },

  entry: {
    app: './client',    
  },
  module: {
    rules: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: {
                browsers: ['> 5% in KR'] //browserslist
              },
              debug: true,
            }],
            '@babel/preset-react'
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            'react-refresh/babel',
          ],
        }
    }],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new RefreshWebpackPlugin()
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist/'
  },
  devServer: {
    // 새로고침 시 404 뜨는 오류 막기 (dev 서버에서 router 주소를 인식 못하는 점 해결)
    historyApiFallback: true,
    devMiddleware: { publicPath: '/dist/' },
    static: { directory: path.resolve(__dirname) },
  },
};