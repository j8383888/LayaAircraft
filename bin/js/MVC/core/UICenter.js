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
var UICenter = /** @class */ (function (_super) {
    __extends(UICenter, _super);
    function UICenter() {
        var _this = _super.call(this) || this;
        _this.addManager(0 /* Main */, commonUI.MainManager);
        _this.addManager(1 /* GameScene */, commonUI.GameSceneManager);
        return _this;
    }
    Object.defineProperty(UICenter, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new UICenter();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    UICenter._instance = null;
    return UICenter;
}(BaseUICenter));
//# sourceMappingURL=UICenter.js.map