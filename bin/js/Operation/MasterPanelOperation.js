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
var operation;
(function (operation) {
    var MasterPanelOperation = /** @class */ (function (_super) {
        __extends(MasterPanelOperation, _super);
        function MasterPanelOperation() {
            var _this = _super.call(this) || this;
            _this._dragRect = new Laya.Rectangle(0, 0, Laya.stage.width, Laya.stage.height);
            return _this;
        }
        MasterPanelOperation.prototype.register = function (gameObj) {
            _super.prototype.register.call(this, gameObj);
            gameObj.texture;
            this._gameObj.on(Laya.Event.MOUSE_DOWN, this, this.mouseDownHandler);
        };
        MasterPanelOperation.prototype.mouseDownHandler = function (e) {
            this._gameObj.startDrag(this._dragRect);
        };
        MasterPanelOperation.prototype.unregister = function () {
            this._gameObj.off(Laya.Event.MOUSE_DOWN, this, this.mouseDownHandler);
            this._dragRect = null;
            _super.prototype.unregister.call(this);
        };
        return MasterPanelOperation;
    }(operation.BaseOperation));
    operation.MasterPanelOperation = MasterPanelOperation;
})(operation || (operation = {}));
//# sourceMappingURL=MasterPanelOperation.js.map