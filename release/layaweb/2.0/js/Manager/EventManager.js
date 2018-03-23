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
/*
* name;
*/
var manager;
(function (manager) {
    var EventManager = /** @class */ (function (_super) {
        __extends(EventManager, _super);
        function EventManager() {
            return _super.call(this) || this;
        }
        Object.defineProperty(EventManager, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new EventManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        EventManager.prototype.dispatchEvent = function (event, data) {
            this.event(event, data);
        };
        EventManager.prototype.addEventListener = function (event, caller, listener, args) {
            this.on(event, caller, listener, args);
        };
        EventManager.prototype.removeEventListener = function (event, caller, listener, onceOnly) {
            this.off(event, caller, listener, onceOnly);
        };
        /*敌人被摧毁事件*/
        EventManager.ENEMY_ON_DESTORY = "enemy_on_destory";
        /*master被子弹击中事件*/
        EventManager.MASTER_ON_HIT = "master_on_hit";
        return EventManager;
    }(laya.events.EventDispatcher));
    manager.EventManager = EventManager;
})(manager || (manager = {}));
//# sourceMappingURL=EventManager.js.map