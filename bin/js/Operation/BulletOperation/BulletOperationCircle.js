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
    var BulletOperationCircle = /** @class */ (function (_super) {
        __extends(BulletOperationCircle, _super);
        function BulletOperationCircle() {
            var _this = _super.call(this) || this;
            _this._curAngle = 0;
            _this._radius = 0;
            _this._bornX = 0;
            _this._bornY = 0;
            return _this;
        }
        BulletOperationCircle.prototype.register = function (gameObj) {
            _super.prototype.register.call(this, gameObj);
            BulletOperationCircle.ANGLE++;
            this._curAngle = BulletOperationCircle.ANGLE;
            this._gameObj.rotation += this._curAngle;
            this._bornX = this._gameObj.x;
            this._bornY = this._gameObj.y;
            Laya.timer.frameLoop(1, this, this.update);
        };
        BulletOperationCircle.prototype.update = function () {
            if (UIUtil.inBorder(this._gameObj.x, this._gameObj.y)) {
                this._radius += 3;
                this._gameObj.x = this._bornX + Math.cos(this._curAngle) * this._radius;
                this._gameObj.y = this._bornY + Math.sin(this._curAngle) * this._radius;
            }
            else {
                Laya.timer.clear(this, this.update);
                gameObject.GameObjectFactory.instance.disposeGameObject(this._gameObj);
            }
        };
        BulletOperationCircle.prototype.unregister = function () {
            Laya.timer.clear(this, this.update);
            _super.prototype.unregister.call(this);
        };
        BulletOperationCircle.ANGLE = 0.5;
        return BulletOperationCircle;
    }(operation.BaseOperation));
    operation.BulletOperationCircle = BulletOperationCircle;
})(operation || (operation = {}));
//# sourceMappingURL=BulletOperationCircle.js.map