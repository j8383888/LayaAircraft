/*
* name;
*/
var master;
(function (master) {
    var Master = /** @class */ (function () {
        function Master() {
            this.life = 10;
            this.score = 0;
        }
        Object.defineProperty(Master, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new Master();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Master.prototype, "masterPanel", {
            /*获得玩家飞机*/
            get: function () {
                return this._masterPanel;
            },
            set: function (value) {
                this._masterPanel = value;
            },
            enumerable: true,
            configurable: true
        });
        Master._instance = null;
        return Master;
    }());
    master.Master = Master;
})(master || (master = {}));
//# sourceMappingURL=Master.js.map