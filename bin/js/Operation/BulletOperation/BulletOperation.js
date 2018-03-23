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
var operation;
(function (operation) {
    var BulletOperation = /** @class */ (function (_super) {
        __extends(BulletOperation, _super);
        function BulletOperation() {
            var _this = _super.call(this) || this;
            _this.BULLET_SPEED = 3;
            return _this;
        }
        BulletOperation.prototype.register = function (gameObj) {
            _super.prototype.register.call(this, gameObj);
            Laya.timer.frameLoop(1, this, this.update);
        };
        BulletOperation.prototype.unregister = function () {
            Laya.timer.clearAll(this);
            _super.prototype.unregister.call(this);
        };
        BulletOperation.prototype.update = function () {
            if (UIUtil.inBorder(this._gameObj.x, this._gameObj.y)) {
                if (this._gameObj.teamID == 0 /* MASTER */) {
                    this._gameObj.y -= 5;
                }
                else if (this._gameObj.teamID == 1 /* ENEMY */) {
                    this._gameObj.y += 5;
                }
            }
            else {
                Laya.timer.clearAll(this);
                gameObject.GameObjectFactory.instance.disposeGameObject(this._gameObj);
            }
        };
        return BulletOperation;
    }(operation.BaseOperation));
    operation.BulletOperation = BulletOperation;
})(operation || (operation = {}));
//# sourceMappingURL=BulletOperation.js.map