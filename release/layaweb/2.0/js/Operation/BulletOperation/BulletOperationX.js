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
var operation;
(function (operation) {
    var BulletOperationX = /** @class */ (function (_super) {
        __extends(BulletOperationX, _super);
        function BulletOperationX() {
            var _this = _super.call(this) || this;
            _this.Duration_Time = 2000;
            return _this;
        }
        BulletOperationX.prototype.register = function (gameObj) {
            _super.prototype.register.call(this, gameObj);
            var masterPanel = manager.BattleLogicManager.instance.masterPanel;
            var targetX = masterPanel.x;
            var targetY = masterPanel.y;
            // while(UIUtil.inBorder(targetX,targetY)){
            // 	targetX += 1;
            // 	targetY += 1;
            // }
            laya.utils.Tween.to(gameObj, { x: targetX, y: targetY }, this.Duration_Time, Laya.Ease.linearNone, new laya.utils.Handler(this, this.onTweenComplete), 0, true);
        };
        BulletOperationX.prototype.unregister = function () {
            laya.utils.Tween.clearAll(this._gameObj);
            _super.prototype.unregister.call(this);
        };
        BulletOperationX.prototype.onTweenComplete = function () {
            gameObject.GameObjectFactory.instance.disposeGameObject(this._gameObj);
        };
        return BulletOperationX;
    }(operation.BaseOperation));
    operation.BulletOperationX = BulletOperationX;
})(operation || (operation = {}));
//# sourceMappingURL=BulletOperationX.js.map