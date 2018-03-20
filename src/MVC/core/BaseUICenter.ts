
/*
* name;
*/
class BaseUICenter{

    protected _managers:Map = new Map();
    protected _openingUI:Array<number> = new Array();

    constructor(){
       
    }

    public addManager(id:number,className:any):void{
        if(className == null){
            return;
        }
        var manager:BaseUIManager = new className();
        manager.id = id;            
        this._managers.addValue(id,manager);
    }

    public getManager(id:number):any{
        if(this._managers == null){
            return null;
        }
        return this._managers.getValueByKey(id);
    }   

    public isExist(id:number):boolean{
        if(this._managers == null){
            return false;
        }
        return this._managers.isExist(id);
    }

    public getOpenParam(id:number):any{
        var manager:BaseUIManager = this.getManager(id);
        if(manager != null){
            return manager.getOpenParam();
        }
        return null;
    }

    public isOpen(id:number):boolean{
        var manager:BaseUIManager = this.getManager(id);
        if(manager != null){
            return manager.isOpened;
        }
        return true;
    }

    public openUI(id:number):void{
        var manager:BaseUIManager = this.getManager(id);
        if(manager != null){
            manager.open(this.onUIinitCallBack);
        }        
    }    

    public closeUI(id:number):void{
        var manager:BaseUIManager = this.getManager(id);
        if(manager != null){
            manager.close();
            var index:number = this._openingUI.indexOf(id);
            if(index != -1){
                this._openingUI.splice(index,1);
            }
        }
    }

    private onUIinitCallBack(id:number):void{
        if(this._openingUI != null){
            this._openingUI.push(id);
        }else{            
            this._openingUI = new Array();
            this._openingUI.push(id);            
        }
        
    }

    public dispose():void{
        if(this._managers != null){
            for(var i:number = 0;i < this._managers.length;i++){
                var manager:BaseUIManager = this._managers.getValueByIndex(i);
                if(manager != null){
                    manager.dispose();
                    manager = null;
                }
            }
            this._managers.dispose();
            this._managers = null;
        }

        if(this._openingUI != null){
            this._openingUI.splice(0,this._openingUI.length);
            this._openingUI = null;
        }
    }
}