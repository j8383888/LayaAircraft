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
/**
* name
*/
var commonUI;
(function (commonUI) {
    var GameSceneManager = /** @class */ (function (_super) {
        __extends(GameSceneManager, _super);
        function GameSceneManager() {
            var _this = _super.call(this) || this;
            _this.addControl(commonUI.GameSceneControl);
            _this.addView(commonUI.GameSceneView);
            _this.addResData(new ResData("GameScene/img_systemimg.png", Laya.Loader.IMAGE));
            return _this;
        }
        return GameSceneManager;
    }(BaseUIManager));
    commonUI.GameSceneManager = GameSceneManager;
})(commonUI || (commonUI = {}));
//# sourceMappingURL=GameSceneManager.js.map