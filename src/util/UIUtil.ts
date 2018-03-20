/*
* name;
*/
class UIUtil{
    constructor(){
        
    }
    public static inBorder(x:number,y:number):Boolean{
        if(x < -20|| x > Laya.stage.width){
            return false
        }
        if(y < -20 || y > Laya.stage.height){
            return false;
        }
        return true;
    }
}