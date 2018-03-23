/*
* name;
*/
var BaseUICenter = /** @class */ (function () {
    function BaseUICenter() {
        this._managers = new Map();
        this._openingUI = new Array();
    }
    BaseUICenter.prototype.addManager = function (id, className) {
        if (className == null) {
            return;
        }
        var manager = new className();
        manager.id = id;
        this._managers.addValue(id, manager);
    };
    BaseUICenter.prototype.getManager = function (id) {
        if (this._managers == null) {
            return null;
        }
        return this._managers.getValueByKey(id);
    };
    BaseUICenter.prototype.isExist = function (id) {
        if (this._managers == null) {
            return false;
        }
        return this._managers.isExist(id);
    };
    BaseUICenter.prototype.getOpenParam = function (id) {
        var manager = this.getManager(id);
        if (manager != null) {
            return manager.getOpenParam();
        }
        return null;
    };
    BaseUICenter.prototype.isOpen = function (id) {
        var manager = this.getManager(id);
        if (manager != null) {
            return manager.isOpened;
        }
        return true;
    };
    BaseUICenter.prototype.openUI = function (id) {
        var manager = this.getManager(id);
        if (manager != null) {
            manager.open(this.onUIinitCallBack);
        }
    };
    BaseUICenter.prototype.closeUI = function (id) {
        var manager = this.getManager(id);
        if (manager != null) {
            manager.close();
            var index = this._openingUI.indexOf(id);
            if (index != -1) {
                this._openingUI.splice(index, 1);
            }
        }
    };
    BaseUICenter.prototype.onUIinitCallBack = function (id) {
        if (this._openingUI != null) {
            this._openingUI.push(id);
        }
        else {
            this._openingUI = new Array();
            this._openingUI.push(id);
        }
    };
    BaseUICenter.prototype.dispose = function () {
        if (this._managers != null) {
            for (var i = 0; i < this._managers.length; i++) {
                var manager = this._managers.getValueByIndex(i);
                if (manager != null) {
                    manager.dispose();
                    manager = null;
                }
            }
            this._managers.dispose();
            this._managers = null;
        }
        if (this._openingUI != null) {
            this._openingUI.splice(0, this._openingUI.length);
            this._openingUI = null;
        }
    };
    return BaseUICenter;
}());
//# sourceMappingURL=BaseUICenter.js.map