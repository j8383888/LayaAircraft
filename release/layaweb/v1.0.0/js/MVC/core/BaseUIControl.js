/*
* name;
*/
var BaseUIControl = /** @class */ (function () {
    function BaseUIControl() {
        this._dataCenter = null;
        this._viewCenter = null;
    }
    BaseUIControl.prototype.init = function (dataCenter, viewCenter) {
        this._dataCenter = dataCenter;
        this._viewCenter = viewCenter;
    };
    BaseUIControl.prototype.onInit = function () {
    };
    BaseUIControl.prototype.onShow = function () {
    };
    BaseUIControl.prototype.onOpenAgain = function () {
    };
    BaseUIControl.prototype.onHide = function () {
    };
    BaseUIControl.prototype.dispose = function () {
        this._viewCenter = null;
        this._dataCenter = null;
    };
    return BaseUIControl;
}());
//# sourceMappingURL=BaseUIControl.js.map