/*
* name;
*/
module manager{
    export class BulletManager{
        private static _instance:BulletManager;
        /*场景内所有子弹数据字典 key宿主对象 value子弹数组*/
        private _hostToBulletsDic:Dictionary;
        /*场景内所有的子弹 跟表现绑定 key 子弹ID value子弹*/
        private _allBulletsDic:Dictionary;
        
        constructor(){
            this._hostToBulletsDic = new Dictionary();
            this._allBulletsDic = new Dictionary();
        }

       /*获取单例*/
        public static get instance():BulletManager{
            if(this._instance == null){
                this._instance = new BulletManager();
            }
            return this._instance;
        }

        public initBulletManager():void{         
        }

        public uninitBulletManager():void{
            for(var i:number = 0; i<this._allBulletsDic.values.length; i++){    
                gameObject.GameObjectFactory.instance.disposeGameObject(this._allBulletsDic.values[i]);
            }
            this._hostToBulletsDic.clear();
            this._allBulletsDic.clear();
            Laya.timer.clearAll(this);
        }

        /*写入*/
        public writeIn(key:gameObject.GameObject,value:gameObject.GameObject):void{
            var bulletAry:Array<gameObject.GameObject> = this._hostToBulletsDic.get(key)
            if(bulletAry == null){
                bulletAry = new Array<gameObject.GameObject>();          
            }
            bulletAry.push(value);
            this._hostToBulletsDic.set(key,bulletAry);
            this._allBulletsDic.set(value.uID,value);
        }

        /*移除*/
        public removeHostToBulletsByKey(key:gameObject.GameObject):void{
            this._hostToBulletsDic.remove(key);
        }

        public removeAllBulletsDicByKey(key:number):void{
            this._hostToBulletsDic.remove(key);
        }
    }
}