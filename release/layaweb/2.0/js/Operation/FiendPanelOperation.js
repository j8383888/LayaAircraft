var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var operation;
(function (operation) {
    var FiendPanelOperation = /** @class */ (function (_super) {
        __extends(FiendPanelOperation, _super);
        function FiendPanelOperation() {
            return _super.call(this) || this;
        }
        FiendPanelOperation.prototype.register = function (gameObj) {
            _super.prototype.register.call(this, gameObj);
        };
        FiendPanelOperation.prototype.unregister = function () {
            _super.prototype.unregister.call(this);
        };
        return FiendPanelOperation;
    }(operation.BaseOperation));
    operation.FiendPanelOperation = FiendPanelOperation;
})(operation || (operation = {}));
//# sourceMappingURL=FiendPanelOperation.js.map