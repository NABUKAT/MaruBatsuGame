//パス名の生成
var path = require("path");
var pathToPhaser = path.join(__dirname, "/node_modules/phaser/");
var phaser = path.join(pathToPhaser, "dist/phaser.js");

//webpackの出力設定
module.exports = {
  //実行開始地点となるファイル
  entry: './src/game.ts',
  //出力先
  output: {
    //カレントパス/dist
    path: path.resolve(__dirname, "public/dist"),
    //出力ファイル名
    filename: "bundle.js"
  },
  //依存関係解決の対象とするモジュール
  module: {
    rules: [
      //*.ts なファイルはts-loaderに処理を依頼。但し/node_modules/内は除く
      { test: /\.ts$/, loader: "ts-loader", exclude: "/node_modules/" },
      //phaser.jsなファイルはexposer-loaderに処理を依頼。phaserをグローバルオブジェクトとして出力
      {
        test: /phaser\.js$/,
        loader: "expose-loader",
        options: {
          exposes: ['phaser']
        }
      },      
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        // 拡張子 js または jsx のファイル（正規表現）
        test: /\.jsx?$/,
        loader: "babel-loader"
      }
    ]
  },
  //webpack-dev-serverの起動設定
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public")
    },
    host: "0.0.0.0",
    port: 8055
  },
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      phaser: phaser
    }
  }
};