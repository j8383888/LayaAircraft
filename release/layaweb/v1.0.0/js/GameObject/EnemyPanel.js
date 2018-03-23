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
var gameObject;
(function (gameObject) {
    var EnemyPanel = /** @class */ (function (_super) {
        __extends(EnemyPanel, _super);
        function EnemyPanel() {
            return _super.call(this) || this;
        }
        /*初始化*/
        EnemyPanel.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.rotation = 180;
            manager.EventManager.instance.addEventListener(manager.EventManager.ENEMY_ON_DESTORY, this, this.onDestroy);
        };
        /*反初始化*/
        EnemyPanel.prototype.uninitialize = function () {
            manager.EventManager.instance.removeEventListener(manager.EventManager.ENEMY_ON_DESTORY, this, this.onDestroy);
            _super.prototype.uninitialize.call(this);
        };
        EnemyPanel.prototype.onDestroy = function (panel) {
            if (panel.uID == this.uID) {
                manager.AnimationManager.instance.aniPlayOnce(GameObjectEnum.BURST, this.x, this.y);
                manager.BattleLogicManager.instance.inViewEnemyPanels.remove(this.uID);
                gameObject.GameObjectFactory.instance.disposeGameObject(this);
            }
        };
        return EnemyPanel;
    }(gameObject.Panel));
    gameObject.EnemyPanel = EnemyPanel;
})(gameObject || (gameObject = {}));
//# sourceMappingURL=EnemyPanel.js.map