const path = require('path');
const devMode = process.env.NODE_ENV === 'development' || process.env.WEBPACK_SERVE === 'true';

let config = {
  name: 'Assets',
  context: path.resolve('./src'),
  mode: devMode ? 'development' : 'production',
  devServer: {
    compress: true,
    hot: true,
    static: {
      directory: path.join(__dirname, 'demo'),
    },
  },
  performance: {
    hints: devMode ? false : 'warning',
  },
  entry: {
    scratchcard: './ScratchCard.ts'
  },
  output: {
    publicPath: "/",
    filename: devMode ? '[name].js' : '[name].min.js',
    chunkFilename: '[name].bundle.js',
    path: path.join(__dirname, 'dist'),
    library: {
      export: 'default',
      name: 'ScratchCard',
      type: 'umd',
    },
  },
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader','ts-loader'],
        exclude: /node_modules/
      }
    ]
  },
};

module.exports = config;
