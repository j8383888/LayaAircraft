/**
* name
*/
var gameData;
(function (gameData) {
    /**玩家信息 */
    var Master = /** @class */ (function () {
        function Master() {
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
        Master.prototype.getDataByType = function (type) {
            var localData = localStorage.getItem(Master.MASTER_STORAGE);
            if (localData != undefined) {
                var jsonData = JSON.parse(localData);
                return jsonData[type];
            }
            return null;
        };
        /**覆盖旧值，更新值 */
        Master.prototype.updateDataByType = function (value, type, isCoverOldValue) {
            if (isCoverOldValue === void 0) { isCoverOldValue = false; }
            var localData = localStorage.getItem(Master.MASTER_STORAGE);
            if (localData != undefined) {
                var jsonData = JSON.parse(localData);
                if (isCoverOldValue) {
                    jsonData[type] = value;
                }
                else {
                    if (typeof value == "number") {
                        var oldValue = jsonData[type];
                        var newValue = oldValue + value;
                        jsonData[type] = newValue;
                    }
                }
                var jsonStr = JSON.stringify(jsonData);
                localStorage.setItem(Master.MASTER_STORAGE, jsonStr);
            }
        };
        /**利用localstorage存储 */
        Master.prototype.initData = function (data) {
            var localData = localStorage.getItem(Master.MASTER_STORAGE);
            if (localData == undefined) {
                var jsonStr = JSON.stringify(data);
                localStorage.setItem(Master.MASTER_STORAGE, jsonStr);
            }
        };
        Master.MASTER_STORAGE = "master_data";
        Master.CONF_PATH = "res/config/master.json";
        Master.MONEY = "money";
        Master.ENERGY = "energy";
        Master.NAME = "name";
        Master.DEFAULT_PANEL_NUM = "default_panel_num";
        Master._instance = null;
        return Master;
    }());
    gameData.Master = Master;
})(gameData || (gameData = {}));
//# sourceMappingURL=Master.js.map