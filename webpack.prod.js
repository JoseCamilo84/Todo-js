const HtmlWebPackPlugin       = require('html-webpack-plugin');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin            = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

const CopyWepPackPlugin = require('copy-webpack-plugin');

module.exports = {

   mode: 'production',
   optimization: {
      minimizer: [new OptimizeCssAssetsPlugin()]
   },

   output: {
      filename:
         'main.[contentHash].js'
   },

   module: {
      rules: [

         { 
            test: /\.js$/,
            exclude: /node_modules/, 
            use: [
               "babel-loader"
            ] 
         },

         {
            test: /\.css$/,
            exclude: /style\.css$/,
            use: [
               'style-loader',
               'css-loader'
            ],
         },

         {
            test: /style\.css$/,
            use: [
               MiniCssExtractPlugin.loader,
               'css-loader'
            ]
         },

         {
            test: /\.html$/,
            loader: 'html-loader',
            options: {
               attributes: false,
               minimize: true
            }
         },

         {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     esModule: false
                  }  
               }
            ]
         }
      ]
   },
   plugins: [
      new HtmlWebPackPlugin({
         template: './src/index.html',
         filename: './index.html'
      }),
      new MiniCssExtractPlugin({
         filename: '[name].[contentHash].css'
      }),
      new CopyWepPackPlugin({
         patterns:[
            {
               from: 'src/assets', 
               to: 'assets/'
            }
         ] 
      }),
      new MinifyPlugin(),
      new CleanWebpackPlugin()
   ]
}