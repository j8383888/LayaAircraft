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
* 所有飞机物体的基类
*/
var gameObject;
(function (gameObject) {
    var Panel = /** @class */ (function (_super) {
        __extends(Panel, _super);
        function Panel() {
            var _this = _super.call(this) || this;
            /*当前飞机已经有子弹*/
            _this.bulletDataAry = null;
            return _this;
        }
        /*初始化*/
        Panel.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.bulletDataAry = new Array();
        };
        Panel.prototype.setPos = function (x, y) {
            this.pos(x, y);
        };
        /*反初始化*/
        Panel.prototype.uninitialize = function () {
            if (this.bulletDataAry != null) {
                var len = this.bulletDataAry.length;
                for (var i = 0; i < len; i++) {
                    this.bulletDataAry[i] = null;
                }
                this.bulletDataAry.slice(0, len);
                this.bulletDataAry = null;
            }
            manager.BulletManager.instance.removeBullets(this);
            _super.prototype.uninitialize.call(this);
        };
        Panel.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        /*添加一种子弹*/
        Panel.prototype.addBullet = function (bulletKind, bulletState, operationID) {
            var bulletData = { kind: bulletKind, status: bulletState, team: this._teamID, operation: operationID };
            var len = this.bulletDataAry.length;
            if (len != 0) {
                for (var i = 0; i < len; i++) {
                    if (this.bulletDataAry[i] == bulletData) {
                        return;
                    }
                }
            }
            this.bulletDataAry.push(bulletData);
            manager.BulletManager.instance.addBullet(this, bulletData);
        };
        return Panel;
    }(gameObject.GameObjectTexture));
    gameObject.Panel = Panel;
})(gameObject || (gameObject = {}));
//# sourceMappingURL=Panel.js.map