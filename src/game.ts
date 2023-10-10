//必要なimport
import "phaser";
import { TitleScene } from "./scenes/title-scene";
import { GameScene } from "./scenes/game-scene";

// スマホ画面用スケール設定
const scale: Phaser.Types.Core.ScaleConfig = {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 600,
    height: 800
}

//ゲームの基本設定
const config: Phaser.Types.Core.GameConfig = {
    title: "MaruBatsuGame",    //タイトル
    version: "0.0.1",       //バージョン
    scale: scale,
    parent: "game",          //DOM上の親
    dom: {
		createContainer: true
	},
    type: Phaser.AUTO,      //canvasかwebGLかを自動選択
    scene: [                //利用するSceneクラス
        TitleScene,
        GameScene
    ]
};

//ゲームメインのクラス
export class Game extends Phaser.Game{
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

//windowイベントで、ロードされたらゲーム開始
window.addEventListener("load", () => {
    var game = new Game(config);
});