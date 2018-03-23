// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(480, 800);
        Laya.stage.frameRate = "mouse";
        Laya.stage.bgColor = ColorUtil.HTML_BLACK;
        Laya.stage.scaleMode = "noscale";
        Laya.stage.alignH = "center";
        Laya.stage.alignV = "middle";
        Laya.Stat.show();
        Laya.loader.load([{ url: "res/atlas" }]);
    }
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=GameMain.js.map