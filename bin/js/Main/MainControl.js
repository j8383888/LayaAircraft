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
    var MainControl = /** @class */ (function (_super) {
        __extends(MainControl, _super);
        function MainControl() {
            return _super.call(this) || this;
        }
        MainControl.prototype.onShow = function () {
            var view = this._viewCenter.getView(commonUI.MainView);
            view.btnStart.clickHandler = laya.utils.Handler.create(null, this.onClick);
            view.aircraftAni.play(0, true);
        };
        MainControl.prototype.onClick = function (e) {
            UICenter.instance.closeUI(0 /* Main */);
            UICenter.instance.openUI(1 /* GameScene */);
        };
        return MainControl;
    }(BaseUIControl));
    commonUI.MainControl = MainControl;
})(commonUI || (commonUI = {}));
//# sourceMappingURL=MainControl.js.map