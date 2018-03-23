var Dictionary = laya.utils.Dictionary;
/*
* map数据结构  使用更加方便  但是不适合大数据存储  会消耗大量内存
*/
var Map = /** @class */ (function () {
    function Map() {
        this._hashKeys = new Dictionary();
        this._keys = new Array();
        this._datas = new Dictionary();
    }
    Map.prototype.dispose = function () {
        this.clear();
        this._hashKeys = null;
        this._datas = null;
        this._keys = null;
    };
    Map.prototype.addValue = function (key, value) {
        if (this.isExist(key)) {
            this._datas[key] = value;
            return;
        }
        this._hashKeys[key] = key;
        this._datas[key] = value;
        this._keys.push(key);
    };
    Map.prototype.removeValue = function (key) {
        var count = this._keys.length;
        for (var i = 0; i < count; i++) {
            var curKey = this._keys[i];
            if (curKey == key) {
                this._keys.splice(i, 1);
                delete this._datas[key];
                delete this._hashKeys[key];
                return;
            }
        }
    };
    Map.prototype.isExist = function (key) {
        if (key == null) {
            return false;
        }
        return (this._hashKeys[key] != null);
    };
    Map.prototype.clear = function () {
        var count = this._keys.length;
        for (var i = 0; i < count; ++i) {
            var key = this._keys[i];
            if (key != null) {
                delete this._datas[key];
                delete this._hashKeys[key];
            }
        }
        this._keys.splice(0, this._keys.length);
    };
    Object.defineProperty(Map.prototype, "length", {
        get: function () {
            return this._keys.length;
        },
        enumerable: true,
        configurable: true
    });
    Map.prototype.getKey = function (index) {
        if (index >= this._keys.length) {
            return null;
        }
        var key = this._keys[index];
        return key;
    };
    Map.prototype.getKeys = function () {
        var keys = new Array();
        var count = this._keys.length;
        for (var i = 0; i < count; ++i) {
            var key = this._keys[i];
            if (key != null) {
                keys.push(key);
            }
        }
        return keys;
    };
    Map.prototype.getValueByKey = function (key) {
        if (!this.isExist(key)) {
            return null;
        }
        return this._datas[key];
    };
    Map.prototype.getValueByIndex = function (index) {
        if (index >= this._keys.length) {
            return null;
        }
        var key = this._keys[index];
        return this._datas[key];
    };
    return Map;
}());
//# sourceMappingURL=Map.js.map