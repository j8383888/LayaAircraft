/**
* name
*/
var gameObject;
(function (gameObject) {
    var GameObjectFactory = /** @class */ (function () {
        function GameObjectFactory() {
            this._objClassDic = null;
            this._orderIndex = 0;
            this._objClassDic = new Dictionary();
            this._objClassDic.set(GameObjectEnum.TEXTURE_FLAG + GameObjectEnum.MASTER_PANEL, gameObject.MasterPanel);
            this._objClassDic.set(GameObjectEnum.TEXTURE_FLAG + GameObjectEnum.ENEMY_PANEL, gameObject.EnemyPanel);
            this._objClassDic.set(GameObjectEnum.TEXTURE_FLAG + GameObjectEnum.STONE, gameObject.Stone);
            this._objClassDic.set(GameObjectEnum.TEXTURE_FLAG + GameObjectEnum.BULLET, gameObject.Bullet);
            this._objClassDic.set(GameObjectEnum.ANIMATION_FLAG + GameObjectEnum.BURST, gameObject.Burst);
        }
        Object.defineProperty(GameObjectFactory, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new GameObjectFactory();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /*创建一个GameObject*/
        GameObjectFactory.prototype.creatGameObject = function (flagName, typeStr, kindID, statusID, teamID, varsData) {
            if (varsData === void 0) { varsData = null; }
            var gameObj = null;
            /*将美术资源一样的对象 视为同一个对象*/
            gameObj = gameObject.GameObjectPool.instance.tryGetGameObjInPool(flagName, typeStr, kindID, statusID);
            /*资源池无此资源*/
            if (gameObj == null) {
                var className = this._objClassDic.get(flagName + typeStr);
                gameObj = new className();
                gameObj.setData(flagName, typeStr, kindID, statusID, teamID, this._orderIndex, varsData);
            }
            else {
                /*但由于携带参数可能不同 所以要重新赋值 比如子弹 宿主对象一直在变*/
                if (varsData != null) {
                    gameObj.varsData = varsData;
                }
                gameObj.teamID = teamID;
            }
            // gameObj.teamID = teamID;
            gameObj.initialize();
            this._orderIndex++;
            return gameObj;
        };
        GameObjectFactory.prototype.disposeGameObject = function (gameObj) {
            gameObject.GameObjectPool.instance.disposeGameObject(gameObj);
        };
        GameObjectFactory._instance = null;
        return GameObjectFactory;
    }());
    gameObject.GameObjectFactory = GameObjectFactory;
})(gameObject || (gameObject = {}));
//# sourceMappingURL=GameObjectFactory.js.map