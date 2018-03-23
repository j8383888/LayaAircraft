/*
* name;
*/
var UIUtil = /** @class */ (function () {
    function UIUtil() {
    }
    UIUtil.inBorder = function (x, y) {
        if (x < -20 || x > Laya.stage.width) {
            return false;
        }
        if (y < -20 || y > Laya.stage.height) {
            return false;
        }
        return true;
    };
    return UIUtil;
}());
//# sourceMappingURL=UIUtil.js.map