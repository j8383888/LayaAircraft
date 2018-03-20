/*
* name;
*/
var UIControlCenter = /** @class */ (function () {
    function UIControlCenter(ui, dataCenter, viewCenter) {
        this._ui = null;
        this._dataCenter = null;
        this._viewCenter = null;
        this._controls = new Map();
        this._ui = ui;
        this._dataCenter = dataCenter;
        this._viewCenter = viewCenter;
    }
    UIControlCenter.prototype.dispose = function () {
        if (this._controls != null) {
            for (var i = 0; i < this._controls.length; ++i) {
                var control = this._controls.getValueByIndex(i);
                if (control != null) {
                    control.dispose();
                    control = null;
                }
            }
            this._controls.clear();
            this._controls = null;
        }
        this._viewCenter = null;
        this._dataCenter = null;
        this._ui = null;
    };
    UIControlCenter.prototype.onInit = function () {
        var control = null;
        var i = 0;
        for (i = 0; i < this._controls.length; ++i) {
            var controlClass = this._controls.getKey(i);
            control = new controlClass();
            control.init(this._dataCenter, this._viewCenter);
            this._controls.addValue(controlClass, control);
        }
        for (i = 0; i < this._controls.length; ++i) {
            control = this._controls.getValueByIndex(i);
            if (control != null) {
                control.onInit();
            }
        }
    };
    UIControlCenter.prototype.onShow = function () {
        for (var i = 0; i < this._controls.length; ++i) {
            var control = this._controls.getValueByIndex(i);
            if (control != null) {
                control.onShow();
            }
        }
    };
    UIControlCenter.prototype.onOpenAgain = function () {
        for (var i = 0; i < this._controls.length; ++i) {
            var control = this._controls.getValueByIndex(i);
            if (control != null) {
                control.onOpenAgain();
            }
        }
    };
    UIControlCenter.prototype.onHide = function () {
        for (var i = 0; i < this._controls.length; ++i) {
            var control = this._controls.getValueByIndex(i);
            if (control != null) {
                control.onHide();
                control.dispose();
                this._controls.addValue(this._controls.getKey(i), null);
            }
        }
    };
    UIControlCenter.prototype.addControl = function (className) {
        if (null == className) {
            return;
        }
        this._controls.addValue(className, null);
    };
    UIControlCenter.prototype.getControl = function (className) {
        if (null == this._controls) {
            return null;
        }
        return this._controls.getValueByKey(className);
    };
    UIControlCenter.prototype.isExist = function (className) {
        if (null == this._controls) {
            return false;
        }
        return this._controls.isExist(className);
    };
    return UIControlCenter;
}());
//# sourceMappingURL=UIControlCenter.js.map