/**
* name
*/
var manager;
(function (manager) {
    var AtlasLoadManager = /** @class */ (function () {
        function AtlasLoadManager() {
            this._loadAtlasAry = new Array();
            this._loadAniAry = new Array();
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
            var tex = null;
            var typeStr = GameObjectEnum.instance.enumDic.get(typeID);
            this._assetName = flagName + "_" + typeStr;
            /*未加载*/
            if (this._loadAtlasAry.indexOf(this._assetName) == -1) {
                return null;
            }
            else {
                var texURL = flagName + "_" + typeID + "_" + kindID + "_" + statusID;
                var URLAry = Laya.Loader.getAtlas("res/atlas/" + this._assetName + ".atlas");
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
            if (this._loadAtlasAry.indexOf(this._assetName) == -1) {
                var url = "res/atlas/" + this._assetName + ".atlas";
                Laya.loader.load(url, laya.utils.Handler.create(this, this.onLoadAtlasComplete, [flagName, typeID, kindID, statusID, callBack]), null, Laya.Loader.ATLAS);
            }
        };
        //加载完毕
        AtlasLoadManager.prototype.onLoadAtlasComplete = function (flagName, typeID, kindID, statusID, callBack) {
            var tex = null;
            this._loadAtlasAry.push(this._assetName);
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
        //try获得动画 资源名字("ani_"+aniName)与动画模板名字保持一致
        AtlasLoadManager.prototype.tryGetAnimation = function (aniName, length, posX, posY, callBack) {
            this._assetName = "ani_" + aniName;
            if (this._loadAniAry.indexOf(this._assetName) == -1) {
                this.tryLoadAniAtals(this._assetName, length, posX, posY, callBack);
            }
            else {
                if (callBack != null) {
                    callBack.runWith({ name: this._assetName, x: posX, y: posY });
                }
            }
        };
        //try加载动画图集
        AtlasLoadManager.prototype.tryLoadAniAtals = function (assetName, length, posX, posY, callBack) {
            var url = "res/atlas/" + assetName + ".atlas";
            Laya.loader.load(url, laya.utils.Handler.create(this, this.onLoadAniComplete, [assetName, length, posX, posY, callBack]), null, Laya.Loader.ATLAS);
        };
        //动画加载完毕 
        AtlasLoadManager.prototype.onLoadAniComplete = function (assetName, length, posX, posY, callBack) {
            this._loadAniAry.push(assetName);
            //打包图集放置在缓存内
            Laya.Animation.createFrames(this.aniUrls(assetName, length), assetName);
            if (callBack != null) {
                callBack.runWith({ name: this._assetName, x: posX, y: posY });
            }
        };
        //获得动画路径
        AtlasLoadManager.prototype.aniUrls = function (assetName, length) {
            var urls = [];
            for (var i = 1; i < length + 1; i++) {
                urls.push(assetName + "/" + assetName + "_" + i + ".png");
            }
            return urls;
        };
        return AtlasLoadManager;
    }());
    manager.AtlasLoadManager = AtlasLoadManager;
})(manager || (manager = {}));
//# sourceMappingURL=AtlasLoadManager.js.map