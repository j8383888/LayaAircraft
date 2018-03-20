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
            this._objClassDic.set(0 /* BULLET */, gameObject.Bullet);
            this._objClassDic.set(1 /* PANEL */, gameObject.Panel);
            this._objClassDic.set(2 /* STONE */, gameObject.Stone);
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
        GameObjectFactory.prototype.creatGameObject = function (typeID, kindID, statusID, teamID) {
            var gameObj = null;
            gameObj = gameObject.GameObjectPool.instance.tryGetGameObjInPool(typeID, kindID, statusID);
            /*资源池无此资源*/
            if (gameObj == null) {
                var className = this._objClassDic.get(typeID);
                gameObj = new className();
                gameObj.setData(typeID, kindID, statusID, teamID, this._orderIndex);
            }
            else {
                //待添加
            }
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