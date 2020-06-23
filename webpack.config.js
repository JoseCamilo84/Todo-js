const HtmlWebPackPlugin       = require('html-webpack-plugin');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const CopyWepPackPlugin = require('copy-webpack-plugin');

module.exports = {

   mode: 'development',
   optimization: {
      minimizer: [new OptimizeCssAssetsPlugin()]
   },
   
   module: {
      rules: [
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
               minimize: false
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
         filename: '[name].css'
      }),
      new CopyWepPackPlugin({
         patterns:[
            {
               from: 'src/assets', 
               to: 'assets/'
            }
         ] 
      })
   ]
}