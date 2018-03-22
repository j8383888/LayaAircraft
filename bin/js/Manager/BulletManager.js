/*
* name;
*/
var manager;
(function (manager) {
    var BulletManager = /** @class */ (function () {
        function BulletManager() {
            this._hostBulletDataDic = new Dictionary();
            this.allBulletDic = new Dictionary();
        }
        BulletManager.prototype.initBulletManager = function () {
            Laya.timer.frameLoop(10, this, this.startCreatBullet);
        };
        BulletManager.prototype.uninitBulletManager = function () {
            Laya.timer.clear(this, this.startCreatBullet);
            this._hostBulletDataDic.clear();
            var len = this.allBulletDic.values.length;
            for (var i = 0; i < len; i++) {
                gameObject.GameObjectFactory.instance.disposeGameObject(this.allBulletDic.values[i]);
            }
            this.allBulletDic.clear();
        };
        BulletManager.prototype.startCreatBullet = function () {
            if (this._hostBulletDataDic == null || this._hostBulletDataDic.values.length <= 0) {
                return;
            }
            this._hostBulletDataDic.keys.forEach(function (key) {
                var bulletDataAry = this._hostBulletDataDic.get(key);
                if (key == null || bulletDataAry.length == 0) {
                    console.assert(false, "key值错误！");
                }
                for (var i = 0; i < bulletDataAry.length; i++) {
                    var bullet = gameObject.GameObjectFactory.instance.creatGameObject(GameObjectEnum.TEXTURE_FLAG, GameObjectEnum.BULLET, bulletDataAry[i]["kind"], bulletDataAry[i]["status"], bulletDataAry[i]["team"], { host: key, operationID: bulletDataAry[i]["operation"] });
                    this.allBulletDic.set(bullet.uID, bullet);
                }
            }, this);
        };
        Object.defineProperty(BulletManager, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new BulletManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /*添加子弹*/
        BulletManager.prototype.addBullet = function (host, bulletData) {
            var bulletDataAry = null;
            bulletDataAry = this._hostBulletDataDic.get(host);
            if (bulletDataAry == null) {
                bulletDataAry = new Array();
            }
            bulletDataAry.push(bulletData);
            this._hostBulletDataDic.set(host, bulletDataAry);
        };
        /*移出飞机上的所有子弹*/
        BulletManager.prototype.removeBullets = function (host) {
            if (this._hostBulletDataDic.indexOf(host) != -1) {
                this._hostBulletDataDic.remove(host);
            }
        };
        /*移出飞机上的指定子弹*/
        BulletManager.prototype.removeTargetBullet = function (host, kindID, statusID) {
            var obj = new laya.utils.Pool();
            if (this._hostBulletDataDic.indexOf(host) != -1) {
                var bulletDataAry = this._hostBulletDataDic.get(host);
                var len = bulletDataAry.length;
                for (var i = 0; i < len; i++) {
                    if (bulletDataAry[i]["kind"] == kindID && bulletDataAry[i]["status"] == statusID) {
                        bulletDataAry.splice(bulletDataAry.indexOf(i), 1);
                        this._hostBulletDataDic.set(host, bulletDataAry);
                        break;
                    }
                }
            }
            else {
                console.assert(false, "宿主对象为空！请检查！");
            }
        };
        return BulletManager;
    }());
    manager.BulletManager = BulletManager;
})(manager || (manager = {}));
//# sourceMappingURL=BulletManager.js.map