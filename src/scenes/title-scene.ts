import playbtn from "../jsx/play-button.jsx";

export class TitleScene extends Phaser.Scene {
    constructor() {
        //識別ID設定
        super({
            key: "TitleScene"
        });
    }

    preload(): void {
        // タイトルロゴをロード
        this.load.image('title_img', 'assets/title_logo.png');
    }

    create() {
        // 背景色を変更
        this.cameras.main.setBackgroundColor("#ffffff");

        // タイトルロゴ表示
        const title_logo = this.add.image(300, 100, 'title_img');
        title_logo.setDisplaySize(600, 255);

        // Playボタンの表示、設定
        const pb = this.add.dom(300, 400, playbtn);
        pb.addListener("click").on("click", () => {
            pb.destroy();
            this.cameras.main.fadeOut(500, 255, 255, 255);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('GameScene');
            });
        });
    }
}