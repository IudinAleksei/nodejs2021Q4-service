const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.cjs',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  optimization: {
    nodeEnv: 'production',
  },
  target: 'node',
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
};
