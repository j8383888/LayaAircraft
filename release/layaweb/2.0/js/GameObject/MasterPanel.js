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
    var MasterPanel = /** @class */ (function (_super) {
        __extends(MasterPanel, _super);
        function MasterPanel() {
            return _super.call(this) || this;
        }
        /*初始化*/
        MasterPanel.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            master.Master.instance.masterPanel = this;
            manager.EventManager.instance.addEventListener(manager.EventManager.MASTER_ON_HIT, this, this.onHit);
        };
        /*反初始化*/
        MasterPanel.prototype.uninitialize = function () {
            manager.EventManager.instance.removeEventListener(manager.EventManager.MASTER_ON_HIT, this, this.onHit);
            _super.prototype.uninitialize.call(this);
        };
        MasterPanel.prototype.onHit = function (panel) {
            if (this.uID == panel.uID) {
                master.Master.instance.life--;
            }
        };
        return MasterPanel;
    }(gameObject.Panel));
    gameObject.MasterPanel = MasterPanel;
})(gameObject || (gameObject = {}));
//# sourceMappingURL=MasterPanel.js.map