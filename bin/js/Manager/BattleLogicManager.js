/**
* name
*/
var manager;
(function (manager) {
    var BattleLogicManager = /** @class */ (function () {
        function BattleLogicManager() {
            this.enemyBulletKindAry = [10, 12, 14, 16];
            this.allEnemyPanels = new Dictionary();
            this.inViewEnemyPanels = new Dictionary();
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
            manager.BulletManager.instance.uninitBulletManager();
            this.destroyMaster();
            this.destroyEnemys();
            this.allEnemyPanels.clear();
            this.inViewEnemyPanels.clear();
            this.masterPanel = null;
        };
        BattleLogicManager.prototype.destroyMaster = function () {
            gameObject.GameObjectFactory.instance.disposeGameObject(this.masterPanel);
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
            this.masterPanel = gameObject.GameObjectFactory.instance.creatGameObject(GameObjectEnum.TEXTURE_FLAG, GameObjectEnum.MASTER_PANEL, 0 /* PANEL_KIND_0 */, 0 /* ALIVE */, 0 /* MASTER */);
            this.masterPanel.registerOperation(0 /* MASTER */);
            this.masterPanel.setPos((Laya.stage.width - 88) / 2, Laya.stage.height - 100);
            this.masterPanel.addBullet(0 /* BULLET_KIND_0 */, 0, 3 /* BULLET */, 10);
        };
        BattleLogicManager.prototype.creatEnemys = function () {
            // Laya.timer.frameLoop(20,this,this.creatEnemyAry);
            this.creatEnemyAry();
        };
        BattleLogicManager.prototype.creatEnemyAry = function () {
            var randomPos = MathUtil.randomToInt(0, 400);
            var randomEnemyPanelType = MathUtil.randomToInt(1, 4);
            var randomEnemyBulletKind = MathUtil.randomToInt(0, 3);
            var enemyPanel = gameObject.GameObjectFactory.instance.creatGameObject(GameObjectEnum.TEXTURE_FLAG, GameObjectEnum.ENEMY_PANEL, randomEnemyPanelType, 0 /* ALIVE */, 1 /* ENEMY */);
            enemyPanel.setPos(randomPos, 50);
            enemyPanel.registerOperation(1 /* ENEMY */);
            enemyPanel.addBullet(this.enemyBulletKindAry[randomEnemyBulletKind], 0, 5 /* BULLET_CIRCLE */, 1, 3);
            // enemyPanel.addBullet(randomEnemyBulletType,0,OPERATION_TYPE.BULLET);						
            this.allEnemyPanels.set(enemyPanel.uID, enemyPanel);
            this.inViewEnemyPanels.set(enemyPanel.uID, enemyPanel);
        };
        /*单例*/
        BattleLogicManager._instance = null;
        return BattleLogicManager;
    }());
    manager.BattleLogicManager = BattleLogicManager;
})(manager || (manager = {}));
//# sourceMappingURL=BattleLogicManager.js.map