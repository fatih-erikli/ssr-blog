const path = require('path')

module.exports = {
  entry: {'worker': './src/index.ts', 'client': './src/client'},
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
  devtool: 'cheap-module-source-map',
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  target: 'web',
  plugins: [],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {},
      },
    ],
  },
}
