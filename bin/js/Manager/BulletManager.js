/*
* name;
*/
var manager;
(function (manager) {
    var BulletManager = /** @class */ (function () {
        function BulletManager() {
            this._hostToBulletsDic = new Dictionary();
            this._allBulletsDic = new Dictionary();
        }
        Object.defineProperty(BulletManager, "instance", {
            /*获取单例*/
            get: function () {
                if (this._instance == null) {
                    this._instance = new BulletManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        BulletManager.prototype.initBulletManager = function () {
        };
        BulletManager.prototype.uninitBulletManager = function () {
            for (var i = 0; i < this._allBulletsDic.values.length; i++) {
                gameObject.GameObjectFactory.instance.disposeGameObject(this._allBulletsDic.values[i]);
            }
            this._hostToBulletsDic.clear();
            this._allBulletsDic.clear();
            Laya.timer.clearAll(this);
        };
        /*写入*/
        BulletManager.prototype.writeIn = function (key, value) {
            var bulletAry = this._hostToBulletsDic.get(key);
            if (bulletAry == null) {
                bulletAry = new Array();
            }
            bulletAry.push(value);
            this._hostToBulletsDic.set(key, bulletAry);
            this._allBulletsDic.set(value.uID, value);
        };
        /*移除*/
        BulletManager.prototype.removeHostToBulletsByKey = function (key) {
            this._hostToBulletsDic.remove(key);
        };
        BulletManager.prototype.removeAllBulletsDicByKey = function (key) {
            this._hostToBulletsDic.remove(key);
        };
        return BulletManager;
    }());
    manager.BulletManager = BulletManager;
})(manager || (manager = {}));
//# sourceMappingURL=BulletManager.js.map