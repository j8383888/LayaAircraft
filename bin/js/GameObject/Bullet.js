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
            _this.OFFSET_X = 35;
            _this.OFFSET_Y = 20;
            /*宿主对象*/
            _this._host = null;
            return _this;
        }
        /*初始化*/
        Bullet.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            if (this._varsData["operationID"] == null) {
                console.assert(false, "子弹未注册operationID");
            }
            if (this._varsData["host"] == null) {
                console.assert(false, "子弹宿主对象为空");
            }
            this._host = this._varsData["host"];
            this.setBulletInitPos();
            this.registerOperation(this._varsData["operationID"]);
        };
        /*设置子弹的初始位置位置*/
        Bullet.prototype.setBulletInitPos = function () {
            if (this._host != null) {
                if (this._teamID == 0 /* MASTER */) {
                    this.pos(this._host.x, this._host.y - this.OFFSET_Y);
                }
                else if (this._teamID == 1 /* ENEMY */) {
                    this.pos(this._host.x, this._host.y + this.OFFSET_Y);
                }
            }
            this.rotation = this._host.rotation;
        };
        /*反初始化*/
        Bullet.prototype.uninitialize = function () {
            _super.prototype.uninitialize.call(this);
        };
        Bullet.prototype.dispose = function () {
            this._host = null;
            _super.prototype.dispose.call(this);
        };
        return Bullet;
    }(gameObject.GameObjectTexture));
    gameObject.Bullet = Bullet;
})(gameObject || (gameObject = {}));
//# sourceMappingURL=Bullet.js.map