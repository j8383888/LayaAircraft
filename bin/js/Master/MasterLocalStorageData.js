/**
* name
*/
var master;
(function (master) {
    /**玩家信息 */
    var MasterLocalStorageData = /** @class */ (function () {
        function MasterLocalStorageData() {
        }
        Object.defineProperty(MasterLocalStorageData, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new MasterLocalStorageData();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        MasterLocalStorageData.prototype.getDataByType = function (type) {
            var localData = localStorage.getItem(MasterLocalStorageData.MASTER_STORAGE);
            if (localData != undefined) {
                var jsonData = JSON.parse(localData);
                return jsonData[type];
            }
            return null;
        };
        /**覆盖旧值，更新值 */
        MasterLocalStorageData.prototype.updateDataByType = function (value, type, isCoverOldValue) {
            if (isCoverOldValue === void 0) { isCoverOldValue = false; }
            var localData = localStorage.getItem(MasterLocalStorageData.MASTER_STORAGE);
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
                localStorage.setItem(MasterLocalStorageData.MASTER_STORAGE, jsonStr);
            }
        };
        /**利用localstorage存储 */
        MasterLocalStorageData.prototype.initData = function (data) {
            var localData = localStorage.getItem(MasterLocalStorageData.MASTER_STORAGE);
            if (localData == undefined) {
                var jsonStr = JSON.stringify(data);
                localStorage.setItem(MasterLocalStorageData.MASTER_STORAGE, jsonStr);
            }
        };
        MasterLocalStorageData.MASTER_STORAGE = "master_data";
        MasterLocalStorageData.CONF_PATH = "res/config/master.json";
        MasterLocalStorageData.MONEY = "money";
        MasterLocalStorageData.ENERGY = "energy";
        MasterLocalStorageData.NAME = "name";
        MasterLocalStorageData.DEFAULT_PANEL_NUM = "default_panel_num";
        MasterLocalStorageData._instance = null;
        return MasterLocalStorageData;
    }());
    master.MasterLocalStorageData = MasterLocalStorageData;
})(master || (master = {}));
//# sourceMappingURL=MasterLocalStorageData.js.map