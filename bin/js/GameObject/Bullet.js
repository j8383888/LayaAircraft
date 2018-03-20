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
    var Bullet = /** @class */ (function (_super) {
        __extends(Bullet, _super);
        function Bullet() {
            var _this = _super.call(this) || this;
            _this.OFFSET_X = 5;
            _this.OFFSET_Y = 40;
            /*宿主对象*/
            _this.host = null;
            return _this;
        }
        /*初始化*/
        Bullet.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.registerOperation(3 /* BULLET */);
        };
        /*设置位置*/
        Bullet.prototype.setPos = function () {
            if (this.host != null) {
                if (this._teamID == 0 /* MASTER */) {
                    this.pos(this.host.x, this.host.y - this.OFFSET_Y);
                }
                else if (this._teamID == 1 /* ENEMY */) {
                    this.pos(this.host.x, this.host.y + this.OFFSET_Y);
                }
            }
            this.rotation = this.host.rotation;
        };
        /*反初始化*/
        Bullet.prototype.uninitialize = function () {
            _super.prototype.uninitialize.call(this);
        };
        Bullet.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return Bullet;
    }(gameObject.GameObjectEx));
    gameObject.Bullet = Bullet;
})(gameObject || (gameObject = {}));
//# sourceMappingURL=Bullet.js.map