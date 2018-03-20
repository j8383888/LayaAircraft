/*
* name;
*/
var UIViewCenter = /** @class */ (function () {
    function UIViewCenter() {
        this._views = new Map();
    }
    UIViewCenter.prototype.dispose = function () {
        if (this._views != null) {
            for (var i = 0; i < this._views.length; i++) {
                var view = this._views.getValueByIndex(i);
                if (view != null) {
                    view.dispose();
                    view = null;
                }
            }
            this._views.clear();
            this._views = null;
        }
    };
    UIViewCenter.prototype.onInit = function () {
        var i = 0;
        for (i = 0; i < this._views.length; i++) {
            var viewClass = this._views.getKey(i);
            this._views.addValue(viewClass, new viewClass());
        }
        for (i = 0; i < this._views.length; i++) {
            var view = this._views.getValueByIndex(i);
            if (view != null) {
                view.onInit();
            }
        }
    };
    UIViewCenter.prototype.onShow = function () {
        for (var i = 0; i < this._views.length; i++) {
            var view = this._views.getValueByIndex(i);
            if (view != null) {
                view.onShow();
            }
        }
    };
    UIViewCenter.prototype.onHide = function () {
        for (var i = 0; i < this._views.length; i++) {
            var view = this._views.getValueByIndex(i);
            if (view != null) {
                view.onHide();
                view.dispose();
                this._views.addValue(this._views.getKey(i), null);
            }
        }
    };
    UIViewCenter.prototype.addView = function (className) {
        if (className == null) {
            return;
        }
        this._views.addValue(className, null);
    };
    UIViewCenter.prototype.getView = function (className) {
        if (this._views == null) {
            return null;
        }
        return this._views.getValueByKey(className);
    };
    UIViewCenter.prototype.isExist = function (className) {
        if (this._views == null) {
            return false;
        }
        return this._views.isExist(className);
    };
    Object.defineProperty(UIViewCenter.prototype, "viewLength", {
        get: function () {
            return this._views.length;
        },
        enumerable: true,
        configurable: true
    });
    UIViewCenter.prototype.getViewByIndex = function (index) {
        return this._views.getValueByIndex(index);
    };
    return UIViewCenter;
}());
//# sourceMappingURL=UIViewCenter.js.map