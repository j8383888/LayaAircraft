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
* 自动加载动画资源并放置在舞台上（并可以注册一种行为）多种行为 待添加
*/
var gameObject;
(function (gameObject) {
    var Animation = Laya.Animation;
    var GameObjectAnimation = /** @class */ (function (_super) {
        __extends(GameObjectAnimation, _super);
        // private _aniData:Object = null;
        function GameObjectAnimation() {
            var _this = _super.call(this) || this;
            /*一个动画模板 对应一个varsData*/
            _this._animationName = null;
            /*渲染对象*/
            _this._render = null;
            _this._registerOprID = -1;
            _this._render = new Animation();
            _this._render.autoSize = true;
            _this.addChild(_this._render);
            return _this;
        }
        /*初始化*/
        GameObjectAnimation.prototype.initialize = function () {
            if (this._varsData == null) {
                console.assert(false, "动画参数未设置！");
            }
            if (this._animationName == null) {
                manager.AtlasLoadManager.instance.tryGetAtlas(GameObjectEnum.ANIMATION_FLAG, this._typeStr, this._kindID, this._statusID, this._varsData, new laya.utils.Handler(this, this.setRenderAnimation));
            }
            else {
                this.playAniOnce();
            }
            manager.LayerManager.instance.addToLayer(this, this._layerType);
        };
        /*反初始化*/
        GameObjectAnimation.prototype.uninitialize = function () {
            manager.OperationManager.instance.unregisterOperation(this._registerOprID);
            this._registerOprID = -1;
            manager.LayerManager.instance.removeFromLayer(this, this._layerType);
        };
        GameObjectAnimation.prototype.dispose = function () {
            this._animationName = null;
            if (this._render != null) {
                this._render.destroy();
                this.render = null;
            }
            _super.prototype.dispose.call(this);
        };
        /*渲染纹理*/
        GameObjectAnimation.prototype.setRenderAnimation = function (animationName) {
            if (animationName == null) {
                console.assert(false, "动画模板名字为空!");
            }
            if (this._animationName == null || (this._animationName != animationName)) {
                this._animationName = animationName;
            }
            this.playAniOnce();
        };
        GameObjectAnimation.prototype.playAniOnce = function () {
            this._render.play(0, false, this._animationName, true);
            this._render.on(Laya.Event.COMPLETE, this, this.playOver);
        };
        GameObjectAnimation.prototype.playOver = function () {
            // this._render.pivot(this._render.width/2,this._render.height/2); 
            this.pivot(this.width / 2, this.height / 2);
            this._render.off(Laya.Event.COMPLETE, this, this.playOver);
            gameObject.GameObjectFactory.instance.disposeGameObject(this);
        };
        /*注册一种行为*/
        GameObjectAnimation.prototype.registerOperation = function (operationID) {
            this._registerOprID = manager.OperationManager.instance.registerOperation(this, operationID);
        };
        return GameObjectAnimation;
    }(gameObject.GameObject));
    gameObject.GameObjectAnimation = GameObjectAnimation;
})(gameObject || (gameObject = {}));
//# sourceMappingURL=GameObjectAnimation.js.map