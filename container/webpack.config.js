const HtmlWebPackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './public/index.html',
  filename: './index.html',
});
module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
    vue: './src/vue/index.js',
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3001,
    historyApiFallback: {
      index: '/public/index.html',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [
    htmlPlugin,
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: 'container',
      filename: 'remoteEntry.js',
      remotes: {
        MicroFrontend: 'MicroFrontend@http://localhost:3000/remoteEntry.js',
        // VueMicroFrontend: "VueMicroFrontend@http://localhost:3002/remoteEntry.js"
      },
    }),
  ],
};
