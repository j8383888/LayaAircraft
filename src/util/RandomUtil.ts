class MathUtil
{
    
    /** 获得一个 范围内的 随机整数 */		
    public static randomToInt(min:number, max:number):number{
        var minInt:number = Math.floor(min);
        var maxInt:number = Math.floor(max);
        return Math.floor(Math.random() * (maxInt - minInt))+ minInt;
    }
    
    /**
     * 获得百分比数，保留两位有效小数
     * @param numerator
     * @param denominator
     */		
    public static percent(numerator:number, denominator:number):String{
        return (numerator/denominator).toFixed(2);
    }
    
    /** 通过角度获得弧度 */		
    public static getRadian(angle:number):number{
        return angle * Math.PI / 180;
    }
    
    /** 通过弧度获得角度 */		
    public static getAngle(radian:number):number{
        return radian * 180 / Math.PI;
    }
}
