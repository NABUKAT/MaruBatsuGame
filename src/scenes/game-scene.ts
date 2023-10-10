import backbtn from "../jsx/back-button.jsx";
import replaybtn from "../jsx/replay-button.jsx";

export class GameScene extends Phaser.Scene {
    issenko: boolean;
    isdown: boolean;
    putcnt: integer;
    putplace: (boolean)[][];

    constructor() {
        // 識別ID設定
        super({
            key: "GameScene"
        });
    }

    preload(): void {
        // ◯✗画像をロード
        this.load.image('maru_img', 'assets/maru.png');
        this.load.image('batsu_img', 'assets/batsu.png');
    }

    create(){
        // 背景色を変更
        this.cameras.main.setBackgroundColor("#b98c46");
        // フェードイン
        this.cameras.main.fadeIn(500, 255, 255, 255);
        // 線を引く
        const l1 = this.add.line(0, 0, 50, 270, 1150, 270, 0x8d6449).setLineWidth(5);
        const l2 = this.add.line(0, 0, 50, 540, 1150, 540, 0x8d6449).setLineWidth(5);
        const l3 = this.add.line(0, 0, 200, 150, 200, 1500, 0x8d6449).setLineWidth(5);
        const l4 = this.add.line(0, 0, 400, 150, 400, 1500, 0x8d6449).setLineWidth(5);
        // 先攻後攻
        this.issenko = true;
        // マウス入力を有効にする
        this.input.mouse.enabled = true;
        // マウス入力の状態変数
        this.isdown = false;
        // 置いたマルバツをカウント
        this.putcnt = 0;
        // 置いた位置を記憶する
        this.putplace = [
            [false, false, false],
            [false, false, false],
            [false, false, false]
        ];
    }

    update(time: number, delta: number): void {
        var pointer = this.input.activePointer;
        // タップを検知、フラグがオフなら処理を開始
        if(pointer.isDown && this.isdown == false){
            // 連続タップ防止のため、フラグを立てる
            this.isdown = true;
            // タップ位置から、◯✗画像配置位置を取得
            var zahyo = this.getPutPoint(pointer.x, pointer.y);
            // 既に配置していたら無視
            if(zahyo[0] != -1 && zahyo[1] != -1){
                // 先攻のターンなら◯を配置
                if(this.issenko){
                    this.add.image(zahyo[0], zahyo[1], 'maru_img');
                    this.issenko = false;
                    this.putcnt++;
                }
                // 後攻のターンなら✗を配置
                else{
                    this.add.image(zahyo[0], zahyo[1], 'batsu_img');
                    this.issenko = true;
                    this.putcnt++;
                }
                // すべて埋まったらゲーム終了
                if(this.putcnt == 9){
                    // ゲーム終了後のボタンを配置
                    this.putButton();
                }
            }
        }
        // 画面から指が離れたらフラグをリセット
        else if(!pointer.isDown && this.isdown){
            this.isdown = false;
        }
    }

    // クリック位置から◯✗画像配置位置を計算、配置位置を記憶する
    getPutPoint(x: number, y: number){
        var ix = Math.floor(x / 200);
        var iy = Math.floor(y / 270);
        if(this.putplace[ix][iy]){
            return [-1, -1];
        }
        else{
            this.putplace[ix][iy] = true;
            return [
                ix * 200 + 100,
                iy * 270 + 135
            ];
        }
    }

    // ゲーム終了後のボタン配置
    putButton(){
        // Backボタンの表示
        const bb = this.add.dom(200, 400, backbtn);
        // Replayボタンの表示
        const rb = this.add.dom(400, 400, replaybtn);
        // Backボタンのリスナー設定
        bb.addListener("click").on("click", () => {
            bb.destroy();
            rb.destroy();
            this.cameras.main.fadeOut(500, 255, 255, 255);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('TitleScene');
            });
        });
        // Replayボタンのリスナー設定
        rb.addListener("click").on("click", () => {
            bb.destroy();
            rb.destroy();
            this.cameras.main.fadeOut(500, 255, 255, 255);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('GameScene');
            });
        });
    }
}