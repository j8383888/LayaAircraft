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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var GameScene;
    (function (GameScene) {
        var GameSceneUI = /** @class */ (function (_super) {
            __extends(GameSceneUI, _super);
            function GameSceneUI() {
                return _super.call(this) || this;
            }
            GameSceneUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.GameScene.GameSceneUI.uiView);
            };
            GameSceneUI.uiView = { "type": "View", "props": { "width": 480, "height": 800 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "bg", "skin": "GameScene/img_systemimg.png" } }, { "type": "Button", "props": { "y": 7, "x": 446, "var": "closeBtn", "skin": "comp/btn_close.png", "rotation": 0 } }, { "type": "Text", "props": { "y": 9, "x": 216, "width": 77, "var": "life", "text": "415646", "height": 29, "fontSize": 20, "font": "Arial", "color": "#ffffff" } }] };
            return GameSceneUI;
        }(View));
        GameScene.GameSceneUI = GameSceneUI;
    })(GameScene = ui.GameScene || (ui.GameScene = {}));
})(ui || (ui = {}));
(function (ui) {
    var Main;
    (function (Main) {
        var MainUI = /** @class */ (function (_super) {
            __extends(MainUI, _super);
            function MainUI() {
                return _super.call(this) || this;
            }
            MainUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.Main.MainUI.uiView);
            };
            MainUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 480, "height": 800 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "Main/back_of_about.jpg" } }, { "type": "Image", "props": { "y": 6, "x": 16, "skin": "Main/img_main_logo.png" } }, { "type": "Button", "props": { "y": 567, "x": 145, "var": "btnStart", "stateNum": 1, "skin": "Main/btn_main_Btn_pressed8.png" } }, { "type": "Animation", "props": { "y": 369, "x": 216, "var": "aircraftAni", "source": "Main/Aircraft.ani" } }] };
            return MainUI;
        }(View));
        Main.MainUI = MainUI;
    })(Main = ui.Main || (ui.Main = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map