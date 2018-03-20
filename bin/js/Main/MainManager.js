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
    var MainManager = /** @class */ (function (_super) {
        __extends(MainManager, _super);
        function MainManager() {
            var _this = _super.call(this) || this;
            _this.addControl(commonUI.MainControl);
            _this.addView(commonUI.MainView);
            _this.addResData(new ResData("res/atlas/Main.atlas", Laya.Loader.ATLAS));
            return _this;
        }
        return MainManager;
    }(BaseUIManager));
    commonUI.MainManager = MainManager;
})(commonUI || (commonUI = {}));
//# sourceMappingURL=MainManager.js.map