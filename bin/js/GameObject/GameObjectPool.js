/**
* name
*/
var gameObject;
(function (gameObject) {
    var GameObjectPool = /** @class */ (function () {
        function GameObjectPool() {
            this.MAX_CACHE_NUM = 1000;
            this._curCacheObjNum = 0;
            /**一级缓存用于缓存只被用了一次的资源 */
            this._objectFirstPool = null;
            /**二级缓存用于缓存经常使用的资源，从资源池拿去先从当前资源池拿取 */
            this._objectSecondPool = null;
            this._objectFirstPool = new Dictionary();
            this._objectSecondPool = new Dictionary();
        }
        Object.defineProperty(GameObjectPool, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new GameObjectPool();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        GameObjectPool.prototype.tryGetGameObjInPool = function (flagName, tryStr, kindID, statusID) {
            /*先遍历二级缓存*/
            var gameObj = null;
            var gameObjAry;
            var key = flagName + "_" + tryStr + "_" + kindID + "_" + statusID;
            gameObjAry = this._objectSecondPool.get(key);
            if (gameObjAry != null && gameObjAry.length >= 1) {
                gameObj = gameObjAry.shift();
                this._curCacheObjNum--;
            }
            else {
                gameObjAry = this._objectFirstPool.get(key);
                if (gameObjAry != null && gameObjAry.length >= 1) {
                    //一级缓存有 就扔到二级缓存里
                    this._objectSecondPool.set(key, gameObjAry);
                    this._objectFirstPool.remove(key);
                    gameObj = gameObjAry.shift();
                    this._curCacheObjNum--;
                }
                else {
                }
            }
            if (gameObj != null) {
                gameObj.refCount++;
            }
            return gameObj;
        };
        GameObjectPool.prototype.disposeGameObject = function (gameObj) {
            /*刚存进 不能马上被释放*/
            gameObj.canDispose = false;
            gameObj.uninitialize();
            var key = gameObj.flagName + "_" + gameObj.typeID + "_" + gameObj.kindID + "_" + gameObj.statusID;
            if (gameObj == null) {
                console.assert(false, "gameObj为空！");
            }
            var gameObjAry = null;
            var gameObjAryB = null;
            //对象被多次引用
            if (gameObj.refCount >= 1) {
                if (this._objectFirstPool.indexOf(key) != -1) {
                    if (this._objectSecondPool.indexOf(key) != -1) {
                        gameObjAry = this._objectFirstPool.get(key);
                        for (var i = 0; i < gameObjAry.length; i++) {
                            gameObjAryB = this._objectSecondPool.get(key);
                            if (gameObjAryB != null) {
                                gameObjAryB.push(gameObjAry[i]);
                            }
                            else {
                                console.assert(false, "逻辑有误！");
                            }
                        }
                        this._objectSecondPool.set(key, gameObjAryB);
                        this._objectFirstPool.remove(key);
                    }
                    else {
                        gameObjAry = this._objectFirstPool.get(key);
                        this._objectSecondPool.set(key, gameObjAry);
                        this._objectSecondPool.remove(key);
                    }
                }
                else if (this._objectSecondPool.indexOf(key) == -1) {
                    console.assert(false, "逻辑有误！");
                }
                gameObjAry = this._objectSecondPool.get(key);
                if (gameObjAry == null) {
                    console.assert(false, "数组为空！");
                }
                gameObjAry.push(gameObj);
                this._curCacheObjNum++;
                this._objectSecondPool.set(key, gameObjAry);
            }
            else {
                if (this._objectFirstPool.indexOf(gameObj) != -1) {
                    gameObjAry = this._objectFirstPool.get(key);
                    gameObjAry.push(gameObj);
                    this._curCacheObjNum++;
                }
                else {
                    gameObjAry = new Array();
                    gameObjAry.push(gameObj);
                    this._curCacheObjNum++;
                }
                /*刚存进 不能马上被释放*/
                this._objectFirstPool.set(key, gameObjAry);
            }
            if (this._curCacheObjNum > this.MAX_CACHE_NUM) {
                this.cleanFirstPool();
            }
            gameObj.canDispose = true;
        };
        /*清理资源池 清理所有一级缓存* */
        GameObjectPool.prototype.cleanFirstPool = function () {
            var len = this._objectFirstPool.keys.length;
            var gameObjAry = null;
            var objNum = 0;
            for (var i = 0; i < len; i++) {
                gameObjAry = this._objectFirstPool.values[i];
                if (gameObjAry == null) {
                    console.assert(false, "数组为空");
                }
                if (gameObjAry.length == 0) {
                    gameObjAry = null;
                }
                else {
                    for (var j = 0; j < gameObjAry.length; j++) {
                        if (gameObjAry[j].canDispose) {
                            objNum += gameObjAry.length;
                            gameObjAry[j].dispose();
                            gameObjAry[j] = null;
                        }
                    }
                    gameObjAry.splice(0, gameObjAry.length);
                    gameObjAry = null;
                }
            }
            this._curCacheObjNum -= objNum;
            this._objectFirstPool.clear();
            if (this._curCacheObjNum >= this.MAX_CACHE_NUM) {
                this.deepCleanCachePool();
            }
        };
        /*清理二级缓存*/
        GameObjectPool.prototype.deepCleanCachePool = function () {
        };
        GameObjectPool._instance = null;
        return GameObjectPool;
    }());
    gameObject.GameObjectPool = GameObjectPool;
})(gameObject || (gameObject = {}));
//# sourceMappingURL=GameObjectPool.js.map