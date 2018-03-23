var MathUtil = /** @class */ (function () {
    function MathUtil() {
    }
    /** 获得一个 范围内的 随机整数 */
    MathUtil.randomToInt = function (min, max) {
        var minInt = Math.floor(min);
        var maxInt = Math.floor(max);
        return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
    };
    /**
     * 获得百分比数，保留两位有效小数
     * @param numerator
     * @param denominator
     */
    MathUtil.percent = function (numerator, denominator) {
        return (numerator / denominator).toFixed(2);
    };
    /** 通过角度获得弧度 */
    MathUtil.getRadian = function (angle) {
        return angle * Math.PI / 180;
    };
    /** 通过弧度获得角度 */
    MathUtil.getAngle = function (radian) {
        return radian * 180 / Math.PI;
    };
    return MathUtil;
}());
//# sourceMappingURL=RandomUtil.js.map