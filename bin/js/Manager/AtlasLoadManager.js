/**
* name
*/
var manager;
(function (manager) {
    var AtlasLoadManager = /** @class */ (function () {
        function AtlasLoadManager() {
            this._loadedAtlasAry = new Array();
        }
        Object.defineProperty(AtlasLoadManager, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new AtlasLoadManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        //try获取纹理
        AtlasLoadManager.prototype.tryGetTextureInCache = function (flagName, typeID, kindID, statusID) {
            if (statusID === void 0) { statusID = 0; }
            var tex = null;
            var typeStr = GameObjectEnum.instance.enumDic.get(typeID);
            this._atlasName = flagName + "_" + typeStr;
            /*未加载*/
            if (this._loadedAtlasAry.indexOf(this._atlasName) == -1) {
                return null;
            }
            else {
                var texURL = flagName + "_" + typeID + "_" + kindID + "_" + statusID;
                var URLAry = Laya.Loader.getAtlas("res/atlas/" + this._atlasName + ".atlas");
                if (URLAry.length <= 0) {
                    console.assert(false, "图集url错误");
                }
                for (var i = 0; i < URLAry.length; i++) {
                    var url = URLAry[i];
                    if (url.indexOf(texURL) != -1) {
                        tex = Laya.loader.getRes(url);
                        break;
                    }
                }
            }
            return tex;
        };
        //try加载图集
        AtlasLoadManager.prototype.tryLoadAtals = function (flagName, typeID, kindID, statusID, callBack) {
            if (statusID === void 0) { statusID = 0; }
            if (callBack === void 0) { callBack = null; }
            if (this._loadedAtlasAry.indexOf(this._atlasName) == -1) {
                var url = "res/atlas/" + this._atlasName + ".atlas";
                Laya.loader.load(url, laya.utils.Handler.create(this, this.onLoadComplete, [flagName, typeID, kindID, statusID, callBack]), null, Laya.Loader.ATLAS);
            }
        };
        //加载完毕
        AtlasLoadManager.prototype.onLoadComplete = function (flagName, typeID, kindID, statusID, callBack) {
            var tex = null;
            this._loadedAtlasAry.push(this._atlasName);
            tex = this.tryGetTextureInCache(flagName, typeID, kindID, statusID);
            if (tex == null) {
                console.assert(false, "Texture为空！");
            }
            if (callBack != null) {
                callBack.runWith(tex);
            }
        };
        //try获取纹理,自动识别缓存中是否有此纹理，无则加载，有则从缓存中获取（对tryGetTextureInCache，tryLoadAtals进行封装）
        AtlasLoadManager.prototype.tryGetTexture = function (flagName, typeID, kindID, statusID, callBack) {
            if (statusID === void 0) { statusID = 0; }
            if (callBack === void 0) { callBack = null; }
            var tex = null;
            tex = this.tryGetTextureInCache(flagName, typeID, kindID, statusID);
            if (tex == null) {
                this.tryLoadAtals(flagName, typeID, kindID, statusID, callBack);
            }
            else {
                if (callBack != null) {
                    callBack.runWith(tex);
                }
            }
        };
        return AtlasLoadManager;
    }());
    manager.AtlasLoadManager = AtlasLoadManager;
})(manager || (manager = {}));
//# sourceMappingURL=AtlasLoadManager.js.map