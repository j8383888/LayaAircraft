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
            _this.registerOprID = -1;
            _this.OFFSET_X = 5;
            _this.OFFSET_Y = 40;
            /*宿主对象*/
            _this.host = null;
            return _this;
        }
        /*初始化*/
        Bullet.prototype.initialize = function () {
            manager.AtlasLoadManager.instance.tryGetTexture(gameObject.GameObject.ATLAS_FLAG, this._typeID, this._kindID, this._statusID, new laya.utils.Handler(this, this.setRenderTexture));
            this.registerOprID = manager.OperationManager.instance.registerOperation(this, 3 /* BULLET */);
            manager.LayerManager.instance.addToLayer(this, this._layerType);
        };
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
            manager.OperationManager.instance.unregisterOperation(this.registerOprID);
            this.registerOprID = -1;
            manager.LayerManager.instance.removeFromLayer(this, this._layerType);
        };
        Bullet.prototype.dispose = function () {
            this._curTexture = null;
            _super.prototype.dispose.call(this);
        };
        /*渲染纹理*/
        Bullet.prototype.setRenderTexture = function (tex) {
            if (tex == null) {
                console.assert(false, "Texture为空！");
            }
            //避免高频DC
            if (this._curTexture == null || (this._curTexture.url != tex.url)) {
                this.graphics.drawTexture(tex);
                this._curTexture = tex;
                this.pivot(this.width / 2, this.height / 2);
            }
        };
        return Bullet;
    }(gameObject.GameObject));
    gameObject.Bullet = Bullet;
})(gameObject || (gameObject = {}));
//# sourceMappingURL=Bullet.js.map