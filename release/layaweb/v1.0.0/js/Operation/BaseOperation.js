/**
* name
*/
var operation;
(function (operation) {
    var BaseOperation = /** @class */ (function () {
        function BaseOperation() {
        }
        /*父类必须调用super.register()*/
        BaseOperation.prototype.register = function (gameObj) {
            this._gameObj = gameObj;
        };
        /*父类必须调用super.unregister()*/
        BaseOperation.prototype.unregister = function () {
            this._gameObj = null;
        };
        return BaseOperation;
    }());
    operation.BaseOperation = BaseOperation;
})(operation || (operation = {}));
//# sourceMappingURL=BaseOperation.js.map