/*
* name;
*/
module manager{
    export class BulletManager{
        private static _instance:BulletManager;

        private _hostBulletDataDic:Dictionary;
        /*场景内所有子弹字典*/
        public allBulletDic:Dictionary;

        constructor(){
            this._hostBulletDataDic = new Dictionary();
            this.allBulletDic = new Dictionary();
        }

        public initBulletManager():void{
            Laya.timer.frameLoop(20,this,this.startCreatBullet);	
        }

        public uninitBulletManager():void{
            Laya.timer.clear(this,this.startCreatBullet);
            this._hostBulletDataDic.clear();
            var len:number = this.allBulletDic.values.length;
            for(var i:number = 0; i<len; i++){
                gameObject.GameObjectFactory.instance.disposeGameObject(this.allBulletDic.values[i]);
            }
            this.allBulletDic.clear();
        }

        private startCreatBullet():void{
            if(this._hostBulletDataDic == null || this._hostBulletDataDic.values.length <= 0){
                return;
            }

                this._hostBulletDataDic.keys.forEach(function(key:gameObject.GameObject){
                    var bulletDataAry:Array<Object> = this._hostBulletDataDic.get(key)
                    if(key == null){
                        console.assert(false,"key值错误！");
                    }
                    
                    for(var i:number = 0; i<bulletDataAry.length; i++){
                        var bullet:gameObject.Bullet = gameObject.GameObjectFactory.instance.creatGameObject(GAME_OBJ_TYPE.BULLET,bulletDataAry[i]["kind"],
                                                                                bulletDataAry[i]["status"],bulletDataAry[i]["team"]);   
                        bullet.host = key;
                        bullet.setPos();
                        this.allBulletDic.set(bullet.uID,bullet);
                    }
            
                },this);
        }
     

        public static get instance():BulletManager{
            if(this._instance == null){
                this._instance = new BulletManager();
            }
            return this._instance;
        }

        /*添加子弹*/
        public addBullet(host:gameObject.GameObject,kindID:number,statusID:number,teamID:number):void{
            var bulletDataAry:Array<Object> = null; 
            bulletDataAry = this._hostBulletDataDic.get(host);
            if(bulletDataAry == null){
                bulletDataAry = new Array<gameObject.GameObject>();
            }            
            var data:Object = {kind:kindID,status:statusID,team:teamID}; 
            bulletDataAry.push(data);
            this._hostBulletDataDic.set(host, bulletDataAry);
        }

        /*移出飞机上的所有子弹*/
        public removeBullets(host:gameObject.GameObject){
            if(this._hostBulletDataDic.indexOf(host) != -1){
                this._hostBulletDataDic.remove(host);
            }
        }

        /*移出飞机上的指定子弹*/
        public removeTargetBullet(host:gameObject.GameObject,kindID:number,statusID:number){
            var obj:Object = new laya.utils.Pool();
            if(this._hostBulletDataDic.indexOf(host) != -1){
                var bulletDataAry:Array<Object> = this._hostBulletDataDic.get(host);
                var len:number = bulletDataAry.length;
                for(var i:number = 0; i<len; i++){
                    if(bulletDataAry[i]["kind"] == kindID && bulletDataAry[i]["status"] == statusID){
                        bulletDataAry.splice(bulletDataAry.indexOf(i),1);
                        this._hostBulletDataDic.set(host,bulletDataAry);
                        break;
                    }
                }
                
            }
            else{
                console.assert(false,"宿主对象为空！请检查！")
            }
        }
    }
}