var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var commonUI;
(function (commonUI) {
    var Image = laya.ui.Image;
    var GameSceneControl = /** @class */ (function (_super) {
        __extends(GameSceneControl, _super);
        function GameSceneControl() {
            var _this = _super.call(this) || this;
            _this.BG_MOVE_SPEED = 2;
            return _this;
        }
        GameSceneControl.prototype.onInit = function () {
            this.view = this._viewCenter.getView(commonUI.GameSceneView);
        };
        GameSceneControl.prototype.onShow = function () {
            this.view.closeBtn.clickHandler = laya.utils.Handler.create(this, this.onClick);
            this.bgHight = this.view.bg.height;
            this.bgAry = new Array();
            this.bgAry.push(new Image(), new Image());
            this.creatBg();
            this.startMoveBg();
            this.masterDataInit();
            manager.BattleLogicManager.instance.initBattleLogic();
        };
        /*玩家数据初始化*/
        GameSceneControl.prototype.masterDataInit = function () {
            manager.LayerManager.instance.addToLayer(this.view.life, 2 /* POP */);
            this.view.life.text = "生命值:" + master.Master.instance.life;
        };
        GameSceneControl.prototype.dispose = function () {
            this.bgAry.forEach(function (element) {
                element = null;
            });
            this.bgAry.slice(0, this.bgAry.length);
            this.bgAry = null;
            Laya.timer.clear(this, this.moveBg);
            this.view = null;
            _super.prototype.dispose.call(this);
        };
        GameSceneControl.prototype.startMoveBg = function () {
            Laya.timer.frameLoop(1, this, this.moveBg);
        };
        GameSceneControl.prototype.onClick = function () {
            manager.LayerManager.instance.removeFromLayer(this.view.life, 2 /* POP */);
            manager.BattleLogicManager.instance.uninitBattleLogic();
            UICenter.instance.closeUI(1 /* GameScene */);
            UICenter.instance.openUI(0 /* Main */);
        };
        GameSceneControl.prototype.moveBg = function () {
            for (var i = 0; i < this.bgAry.length; i++) {
                this.bgAry[i].y += this.BG_MOVE_SPEED;
                if (this.bgAry[i].y >= this.bgHight) {
                    this.bgAry[i].y = -this.bgHight;
                }
            }
            this.view.life.text = "生命值:" + master.Master.instance.life;
        };
        GameSceneControl.prototype.creatBg = function () {
            for (var i = 0; i < this.bgAry.length; i++) {
                this.bgAry[i].skin = this.view.bg.skin;
                this.bgAry[i].y = -i * this.bgHight;
                this.view.addChild(this.bgAry[i]);
            }
            this.view.removeChild(this.view.bg);
        };
        return GameSceneControl;
    }(BaseUIControl));
    commonUI.GameSceneControl = GameSceneControl;
})(commonUI || (commonUI = {}));
//# sourceMappingURL=GameSceneControl.js.map