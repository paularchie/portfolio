var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js']
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    port: 5000,
    inline: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/public/index.html')
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  }
};
