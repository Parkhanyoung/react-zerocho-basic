// webpack.congig >> 웹팩의 설정을 총괄
const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  name: 'wordrelay-setting',
  mode: 'development', // or production
  devtool: 'eval', // or hidden-source-map
  resolve: {
    extensions: ['.js', '.jsx']
  }, // resolve/extensions는 entry에 일일이 확장자를 달지 않아도 되게 만들어줌
// entry(입력)와 output(출력)이 가장 중요!!!
  entry: {
    app: ['./client'], // client.jsx가 WordRelay.jsx나 React, ReactDom를 파일 내부에서 import하고 있기 때문에 따로 적어줄 필요없다.
  },

  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: ['> 5% in KR'],
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
    }]
  },
  // 
  plugins: [
    new RefreshWebpackPlugin()
  ],
  output: {
    path: path.join(__dirname, 'dist'), // path.join(__dirname, ) >> 현재경로를 찾아서 두번째 인자와 연결해줌
    filename: 'app.js',
    publicPath: '/dist'
  },
  devServer: {
    devMiddleware: { publicPath: '/dist' },
    // 실제로 존재하는 html(정적 파일)의 경로를 써준다. *여기서는 index.js의 경로ㄴㄴㄴㄴ
    static: { directory: path.resolve(__dirname) },
    hot: true
  }
};