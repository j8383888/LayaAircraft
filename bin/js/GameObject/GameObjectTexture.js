/*
* 自动加载纹理并放置在舞台上（并可以注册一种行为）多种行为 待添加
*/
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
    var Sprite = laya.display.Sprite;
    var GameObjectTexture = /** @class */ (function (_super) {
        __extends(GameObjectTexture, _super);
        function GameObjectTexture() {
            var _this = _super.call(this) || this;
            _this._curTexture = null;
            /*渲染对象*/
            _this._render = null;
            _this._registerOprID = -1;
            _this._render = new Sprite();
            _this._render.autoSize = true;
            _this._render.cacheAs = "none";
            _this.addChild(_this._render);
            return _this;
        }
        /*初始化*/
        GameObjectTexture.prototype.initialize = function () {
            if (this._curTexture == null) {
                manager.AtlasLoadManager.instance.tryGetAtlas(GameObjectEnum.TEXTURE_FLAG, this._typeStr, this._kindID, this._statusID, -1, new laya.utils.Handler(this, this.setRenderTexture));
            }
            else {
            }
            manager.LayerManager.instance.addToLayer(this, this._layerType);
        };
        /*反初始化*/
        GameObjectTexture.prototype.uninitialize = function () {
            manager.OperationManager.instance.unregisterOperation(this._registerOprID);
            this._registerOprID = -1;
            manager.LayerManager.instance.removeFromLayer(this, this._layerType);
        };
        Object.defineProperty(GameObjectTexture.prototype, "Render", {
            /*小写render就报错 真烦*/
            get: function () {
                return this._render;
            },
            enumerable: true,
            configurable: true
        });
        GameObjectTexture.prototype.dispose = function () {
            this._curTexture = null;
            if (this._render != null) {
                this._render.destroy();
                this._render = null;
            }
            _super.prototype.dispose.call(this);
        };
        /*渲染纹理*/
        GameObjectTexture.prototype.setRenderTexture = function (tex) {
            if (tex == null) {
                console.assert(false, "Texture为空！");
            }
            //避免高频DC
            if (this._curTexture == null || (this._curTexture.url != tex.url)) {
                //不知道为什么会报错 先return
                if (this._render == null)
                    return;
                this._render.graphics.drawTexture(tex);
                this._curTexture = tex;
                this.pivot(this.width / 2, this.height / 2);
            }
        };
        /*注册一种行为*/
        GameObjectTexture.prototype.registerOperation = function (operationID) {
            this._registerOprID = manager.OperationManager.instance.registerOperation(this, operationID);
        };
        return GameObjectTexture;
    }(gameObject.GameObject));
    gameObject.GameObjectTexture = GameObjectTexture;
})(gameObject || (gameObject = {}));
//# sourceMappingURL=GameObjectTexture.js.map