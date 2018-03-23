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
    var MainView = /** @class */ (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            return _super.call(this) || this;
        }
        MainView.prototype.dispose = function () {
            _super.prototype.destroy.call(this);
        };
        MainView.prototype.clear = function () {
        };
        MainView.prototype.onInit = function () {
            manager.LayerManager.instance.addToLayer(this, 0 /* MAIN */);
        };
        MainView.prototype.onShow = function () {
        };
        MainView.prototype.onHide = function () {
            manager.LayerManager.instance.removeFromLayer(this, 0 /* MAIN */);
        };
        return MainView;
    }(ui.Main.MainUI));
    commonUI.MainView = MainView;
})(commonUI || (commonUI = {}));
//# sourceMappingURL=MainView.js.map