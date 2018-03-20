// /*
// * 自动加载纹理并放置在舞台上（并可以注册一种行为）多种行为 待添加
// */
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
var gameObject;
(function (gameObject) {
    var GameObjectEx = /** @class */ (function (_super) {
        __extends(GameObjectEx, _super);
        function GameObjectEx() {
            var _this = _super.call(this) || this;
            _this._registerOprID = -1;
            return _this;
        }
        /*初始化*/
        GameObjectEx.prototype.initialize = function () {
            manager.AtlasLoadManager.instance.tryGetTexture(gameObject.GameObject.ATLAS_FLAG, this._typeID, this._kindID, this._statusID, new laya.utils.Handler(this, this.setRenderTexture));
            manager.LayerManager.instance.addToLayer(this, this._layerType);
        };
        /*反初始化*/
        GameObjectEx.prototype.uninitialize = function () {
            manager.OperationManager.instance.unregisterOperation(this._registerOprID);
            this._registerOprID = -1;
            manager.LayerManager.instance.removeFromLayer(this, this._layerType);
        };
        GameObjectEx.prototype.dispose = function () {
            this._curTexture = null;
            _super.prototype.dispose.call(this);
        };
        /*渲染纹理*/
        GameObjectEx.prototype.setRenderTexture = function (tex) {
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
        /*注册一种行为*/
        GameObjectEx.prototype.registerOperation = function (operationID) {
            this._registerOprID = manager.OperationManager.instance.registerOperation(this, operationID);
        };
        return GameObjectEx;
    }(gameObject.GameObject));
    gameObject.GameObjectEx = GameObjectEx;
})(gameObject || (gameObject = {}));
//# sourceMappingURL=GameObjectEx.js.map