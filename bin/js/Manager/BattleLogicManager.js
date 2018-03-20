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
* name
*/
var manager;
(function (manager) {
    var BattleLogicManager = /** @class */ (function (_super) {
        __extends(BattleLogicManager, _super);
        function BattleLogicManager() {
            var _this = _super.call(this) || this;
            _this.allEnemyPanels = new Dictionary();
            _this.inViewEnemyPanels = new Dictionary();
            return _this;
        }
        Object.defineProperty(BattleLogicManager, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new BattleLogicManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        BattleLogicManager.prototype.initBattleLogic = function () {
            this.creatMaster();
            this.creatEnemys();
            manager.BulletManager.instance.initBulletManager();
        };
        BattleLogicManager.prototype.uninitBattleLogic = function () {
            this.dispose();
        };
        BattleLogicManager.prototype.dispose = function () {
            this.destroyMaster();
            this.destroyEnemys();
            manager.BulletManager.instance.uninitBulletManager();
            this.offAll();
            this.allEnemyPanels.clear();
            this.inViewEnemyPanels.clear();
            this._selfPanel = null;
        };
        BattleLogicManager.prototype.destroyMaster = function () {
            gameObject.GameObjectFactory.instance.disposeGameObject(this._selfPanel);
        };
        BattleLogicManager.prototype.destroyEnemys = function () {
            Laya.timer.clear(this, this.creatEnemyAry);
            var len = this.inViewEnemyPanels.values.length;
            for (var i = 0; i < len; i++) {
                var enemy = this.inViewEnemyPanels.values[i];
                gameObject.GameObjectFactory.instance.disposeGameObject(enemy);
            }
        };
        BattleLogicManager.prototype.creatMaster = function () {
            this._selfPanel = gameObject.GameObjectFactory.instance.creatGameObject(1 /* PANEL */, 0 /* PANEL_KIND_0 */, 0 /* ALIVE */, 0 /* MASTER */);
            this._selfPanel.registerOperation(0 /* MASTER */);
            this._selfPanel.setPos((Laya.stage.width - 88) / 2, Laya.stage.height - 100);
            this._selfPanel.addBullet(0 /* BULLET_KIND_0 */, 0);
        };
        BattleLogicManager.prototype.creatEnemys = function () {
            Laya.timer.frameLoop(50, this, this.creatEnemyAry);
        };
        BattleLogicManager.prototype.creatEnemyAry = function () {
            var randomPos = MathUtil.random(0, 400);
            var randomEnemyPanelType = MathUtil.random(1, 4);
            var randomEnemyBulletType = MathUtil.random(1, 4);
            var enemyPanel = gameObject.GameObjectFactory.instance.creatGameObject(1 /* PANEL */, randomEnemyPanelType, 0 /* ALIVE */, 1 /* ENEMY */);
            enemyPanel.setPos(randomPos, 60);
            enemyPanel.registerOperation(1 /* ENEMY */);
            enemyPanel.addBullet(randomEnemyBulletType, 0);
            this.allEnemyPanels.set(enemyPanel.uID, enemyPanel);
            this.inViewEnemyPanels.set(enemyPanel.uID, enemyPanel);
        };
        BattleLogicManager.prototype.dispatchEvent = function (event, data) {
            this.event(event, data);
        };
        BattleLogicManager.prototype.addEventListener = function (event, caller, listener, args) {
            this.on(event, caller, listener, args);
        };
        BattleLogicManager.prototype.removeEventListener = function (event, caller, listener, onceOnly) {
            this.off(event, caller, listener, onceOnly);
        };
        BattleLogicManager.ENEMY_ON_DESTORY = "enemy_on_destory";
        /*单例*/
        BattleLogicManager._instance = null;
        return BattleLogicManager;
    }(laya.events.EventDispatcher));
    manager.BattleLogicManager = BattleLogicManager;
})(manager || (manager = {}));
//# sourceMappingURL=BattleLogicManager.js.map