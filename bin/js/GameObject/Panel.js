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
var gameObject;
(function (gameObject) {
    var Panel = /** @class */ (function (_super) {
        __extends(Panel, _super);
        function Panel() {
            return _super.call(this) || this;
        }
        /*初始化*/
        Panel.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.setRotation();
        };
        Panel.prototype.setRotation = function () {
            switch (this._teamID) {
                case 0 /* MASTER */:
                    break;
                case 1 /* ENEMY */:
                    this.rotation = 180;
                    break;
                case 2 /* FRIEND */:
                    break;
            }
        };
        Panel.prototype.setPos = function (x, y) {
            this.pos(x, y);
        };
        /*反初始化*/
        Panel.prototype.uninitialize = function () {
            manager.BulletManager.instance.removeBullets(this);
            _super.prototype.uninitialize.call(this);
        };
        Panel.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        /*添加一种子弹*/
        Panel.prototype.addBullet = function (bulletKind, bulletState) {
            manager.BulletManager.instance.addBullet(this, bulletKind, bulletState, this._teamID);
        };
        return Panel;
    }(gameObject.GameObjectEx));
    gameObject.Panel = Panel;
})(gameObject || (gameObject = {}));
//# sourceMappingURL=Panel.js.map