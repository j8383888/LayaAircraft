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
            var _this = _super.call(this) || this;
            _this._registerOprID = -1;
            return _this;
        }
        /*初始化*/
        Panel.prototype.initialize = function () {
            manager.AtlasLoadManager.instance.tryGetTexture(gameObject.GameObject.ATLAS_FLAG, this._typeID, this._kindID, this._statusID, new laya.utils.Handler(this, this.setRenderTexture));
            this._registerOprID = manager.OperationManager.instance.registerOperation(this, this._teamID);
            manager.LayerManager.instance.addToLayer(this, this._layerType);
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
            manager.OperationManager.instance.unregisterOperation(this._registerOprID);
            this._registerOprID = -1;
            manager.LayerManager.instance.removeFromLayer(this, this._layerType);
            manager.BulletManager.instance.removeBullets(this);
        };
        Panel.prototype.dispose = function () {
            this._curTexture = null;
            _super.prototype.dispose.call(this);
        };
        /*渲染纹理*/
        Panel.prototype.setRenderTexture = function (tex) {
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
        /*添加一种子弹*/
        Panel.prototype.addBullet = function (bulletKind, bulletState) {
            manager.BulletManager.instance.addBullet(this, bulletKind, bulletState, this._teamID);
        };
        return Panel;
    }(gameObject.GameObject));
    gameObject.Panel = Panel;
})(gameObject || (gameObject = {}));
//# sourceMappingURL=Panel.js.map