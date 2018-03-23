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
var operation;
(function (operation) {
    var EnemyPanelOperation = /** @class */ (function (_super) {
        __extends(EnemyPanelOperation, _super);
        function EnemyPanelOperation() {
            return _super.call(this) || this;
        }
        EnemyPanelOperation.prototype.register = function (gameObj) {
            _super.prototype.register.call(this, gameObj);
            Laya.timer.frameLoop(1, this, this.update);
        };
        EnemyPanelOperation.prototype.update = function () {
            if (UIUtil.inBorder(this._gameObj.x, this._gameObj.y)) {
                this._gameObj.y += 1;
            }
            else {
                this.removeView();
            }
        };
        EnemyPanelOperation.prototype.unregister = function () {
            _super.prototype.unregister.call(this);
            Laya.timer.clearAll(this);
        };
        /*从视野中移除*/
        EnemyPanelOperation.prototype.removeView = function () {
            Laya.timer.clear(this, this.update);
            gameObject.GameObjectFactory.instance.disposeGameObject(this._gameObj);
        };
        return EnemyPanelOperation;
    }(operation.BaseOperation));
    operation.EnemyPanelOperation = EnemyPanelOperation;
})(operation || (operation = {}));
//# sourceMappingURL=EnemyPanelOperation.js.map