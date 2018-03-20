/*
* name;
*/
var UIDataCenter = /** @class */ (function () {
    function UIDataCenter() {
        this._datas = new Map();
        this._isLoading = false;
        this._isLoaded = false;
        this._isOpened = false;
        this._openParamClass = null;
        this._openParam = null;
    }
    UIDataCenter.prototype.setOpenParam = function (className) {
        this._openParamClass = className;
    };
    UIDataCenter.prototype.getOpenParam = function () {
        if (this._openParam == null) {
            if (this._openParamClass != null) {
                this._openParam = new this._openParamClass();
            }
        }
        return this._openParam;
    };
    UIDataCenter.prototype.dispose = function () {
        if (this._datas != null) {
            for (var i = 0; i < this._datas.length; i++) {
                var data = this._datas.getValueByIndex(i);
                if (data != null) {
                    data.dispose();
                    data = null;
                }
            }
            this._datas.dispose();
            this._datas = null;
        }
        if (this._openParam != null) {
            this._openParam.reset();
            this._openParam = null;
        }
    };
    UIDataCenter.prototype.onInit = function () {
        for (var i = 0; i < this._datas.length; i++) {
            var dataClass = this._datas.getKey(i);
            this._datas.addValue(dataClass, new dataClass());
        }
    };
    UIDataCenter.prototype.onShow = function () {
    };
    UIDataCenter.prototype.onHide = function () {
        if (this._datas != null) {
            for (var i = 0; i < this._datas.length; i++) {
                var data = this._datas.getValueByIndex(i);
                if (data != null) {
                    data.dispose();
                    data = null;
                    this._datas.addValue(this._datas.getKey(i), null);
                }
            }
        }
        if (this._openParam != null) {
            this._openParam.reset();
        }
    };
    UIDataCenter.prototype.addData = function (className) {
        if (className == null) {
            return;
        }
        this._datas.addValue(className, null);
    };
    UIDataCenter.prototype.getData = function (className) {
        if (this._datas == null) {
            return null;
        }
        return this._datas.getValueByKey(className);
    };
    UIDataCenter.prototype.isExist = function (className) {
        if (this._datas == null) {
            return false;
        }
        return this._datas.isExist(className);
    };
    Object.defineProperty(UIDataCenter.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        set: function (value) {
            this._isLoading = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIDataCenter.prototype, "isLoaded", {
        get: function () {
            return this._isLoaded;
        },
        set: function (value) {
            this._isLoaded = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIDataCenter.prototype, "isOpened", {
        get: function () {
            return this._isOpened;
        },
        set: function (value) {
            this._isOpened = value;
        },
        enumerable: true,
        configurable: true
    });
    return UIDataCenter;
}());
//# sourceMappingURL=UIDataCenter.js.map