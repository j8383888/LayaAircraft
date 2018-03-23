// 程序入口
// 已知问题 第一次 爆炸位置有偏移
// 快速返回主菜单 进入游戏 有部分子弹异常加速
var GameEntry = /** @class */ (function () {
    function GameEntry() {
        this.checkPlatform();
        Laya.init(480, 800, Laya.WebGL);
        // laya.debug.DebugPanel.init();
        Laya.stage.frameRate = "fast";
        Laya.stage.bgColor = ColorUtil.HTML_BLACK;
        Laya.stage.scaleMode = "noscale";
        Laya.stage.alignH = "center";
        Laya.stage.alignV = "middle";
        Laya.Stat.show();
        this.loadCommonAsset();
    }
    GameEntry.prototype.checkPlatform = function () {
        if (laya.utils.Browser.onPC || laya.utils.Browser.onAndriod) {
            //待添加
        }
        else {
            console.log("不支持当前平台");
        }
    };
    GameEntry.prototype.loadCommonAsset = function () {
        Laya.loader.load([{ url: "res/atlas/comp.atlas", type: Laya.Loader.ATLAS }], new laya.utils.Handler(this, this.GameStart));
    };
    //游戏开始
    GameEntry.prototype.GameStart = function () {
        // alert("Hello World")
        // gameData.Master.instance.initData(Laya.loader.getRes("res/config/Master.json"));
        UICenter.instance.openUI(0 /* Main */);
    };
    return GameEntry;
}());
new GameEntry();
//# sourceMappingURL=GameEntry.js.map