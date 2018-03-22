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
        AtlasLoadManager.prototype.tryGetTextureInCache = function (assetName, kindID, statusID) {
            var tex = null;
            /*未加载*/
            if (this._loadAtlasAry.indexOf(this._assetName) == -1) {
                return null;
            }
            else {
                var texURL = assetName + "_" + kindID + "_" + statusID;
                var URLAry = Laya.Loader.getAtlas("res/atlas/" + assetName + ".atlas");
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
        AtlasLoadManager.prototype.tryLoadAtals = function (assetName, kindID, statusID, callBack) {
            if (statusID === void 0) { statusID = 0; }
            if (this._loadAtlasAry.indexOf(assetName) == -1) {
                var url = "res/atlas/" + assetName + ".atlas";
                Laya.loader.load(url, laya.utils.Handler.create(this, this.onLoadAtlasComplete, [assetName, kindID, statusID, callBack]), null, Laya.Loader.ATLAS);
            }
        };
        //加载完毕
        AtlasLoadManager.prototype.onLoadAtlasComplete = function (assetName, kindID, statusID, callBack) {
            var tex = null;
            this._loadAtlasAry.push(this._assetName);
            tex = this.tryGetTextureInCache(assetName, kindID, statusID);
            if (tex == null) {
                console.assert(false, "Texture为空！");
            }
            if (callBack != null) {
                callBack.runWith(tex);
            }
        };
        //try获取纹理,自动识别缓存中是否有此纹理，无则加载，有则从缓存中获取
        AtlasLoadManager.prototype.tryGetAtlas = function (flagName, typeStr, kindID, statusID, varsData, callBack) {
            if (kindID === void 0) { kindID = -1; }
            if (statusID === void 0) { statusID = -1; }
            if (varsData === void 0) { varsData = null; }
            if (callBack === void 0) { callBack = null; }
            this._assetName = flagName + "_" + typeStr;
            if (flagName == GameObjectEnum.TEXTURE_FLAG) {
                var tex = null;
                tex = this.tryGetTextureInCache(this._assetName, kindID, statusID);
                if (tex == null) {
                    this.tryLoadAtals(this._assetName, kindID, statusID, callBack);
                }
                else {
                    if (callBack != null) {
                        callBack.runWith(tex);
                    }
                }
            }
            else if (flagName == GameObjectEnum.ANIMATION_FLAG) {
                if (this._loadAniAry.indexOf(this._assetName) == -1) {
                    if (varsData == null) {
                        console.assert(false, "动画参数未设置！");
                    }
                    this.tryGetAnimation(this._assetName, kindID, statusID, varsData["aniLength"], callBack);
                }
                else {
                    if (callBack != null) {
                        // Laya.Animation.createFrames(this.aniUrls(this._assetName,kindID,statusID,length),this._assetName);
                        callBack.runWith(this._assetName);
                    }
                }
            }
            else {
                console.assert(false, flagName + "不存在");
            }
        };
        //try获得动画 资源名字(assetName)与动画模板名字保持一致
        AtlasLoadManager.prototype.tryGetAnimation = function (assetName, kindID, statusID, length, callBack) {
            if (this._loadAniAry.indexOf(assetName) == -1) {
                this.tryLoadAniAtals(assetName, kindID, statusID, length, callBack);
            }
            else {
                if (callBack != null) {
                    callBack.runWith(assetName);
                }
            }
        };
        //try加载动画图集
        AtlasLoadManager.prototype.tryLoadAniAtals = function (assetName, kindID, statusID, length, callBack) {
            var url = "res/atlas/" + assetName + ".atlas";
            Laya.loader.load(url, laya.utils.Handler.create(this, this.onLoadAniComplete, [assetName, kindID, statusID, length, callBack]), null, Laya.Loader.ATLAS);
        };
        //动画加载完毕 
        AtlasLoadManager.prototype.onLoadAniComplete = function (assetName, kindID, statusID, length, callBack) {
            this._loadAniAry.push(assetName);
            //打包图集放置在缓存内
            Laya.Animation.createFrames(this.aniUrls(assetName, kindID, statusID, length), assetName);
            if (callBack != null) {
                callBack.runWith(assetName);
            }
        };
        //获得动画路径(目前只支持png 待添加...)
        AtlasLoadManager.prototype.aniUrls = function (assetName, kindID, statusID, length) {
            var urls = [];
            for (var i = 1; i < length + 1; i++) {
                urls.push(assetName + "/" + assetName + "_" + kindID + "_" + statusID + "_" + i + ".png");
            }
            return urls;
        };
        return AtlasLoadManager;
    }());
    manager.AtlasLoadManager = AtlasLoadManager;
})(manager || (manager = {}));
//# sourceMappingURL=AtlasLoadManager.js.map