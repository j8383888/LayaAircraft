/**
* 所有飞机物体的基类
*/
module gameObject{
	export class Panel extends GameObjectTexture{

		/*当前飞机已经有子弹数据*/
		private bulletDataAry:Array<Object> = null;

		constructor(){		
			super();
		}

		/*初始化*/
		public initialize():void{
			super.initialize();
		}

		public setPos(x:number,y:number):void{
			this.pos(x,y);			
		}

		/*反初始化*/
		public uninitialize():void{	
			if(this.bulletDataAry != null){
				for(var i:number; i<this.bulletDataAry.length; i++)
				{
					this.bulletDataAry[i] = null;				
				}
				this.bulletDataAry.slice(0,this.bulletDataAry.length);
				this.bulletDataAry = null;
			}		
			this.removeAllBullets();
			super.uninitialize();	
		} 

		public dispose():void{		
			super.dispose();	
		}

		/*添加一种子弹 intervalFrame间隔几帧发射一颗子弹*/
		/*	bulletKind bulletState(前两个控制美术资源) 
			operationID(子弹行动路径)
			intervalFrame(每波子弹间隔帧数)
			bulletNumPerWave(每波子弹的数量)
			totalWaveNum(总共子弹的波数)
		*/
		public addBullet(bulletKind:number,bulletState:number,operationID:number,intervalFrame:number,bulletNumPerWave:number = 1,totalWaveNum:number = -1):void{
			if(this.bulletDataAry == null){
				this.bulletDataAry = new Array<Object>();
			}
			/*比对是否有相同类型的子弹*/
			var bulletData:Object = {kind:bulletKind,status:bulletState,team:this._teamID,operation:operationID,
										interval:intervalFrame,bulletNumPerWave:bulletNumPerWave,totalWaveNum:totalWaveNum}
			var len = this.bulletDataAry.length;
			if(len != 0){				
				for(var i:number = 0; i<len; i++){
					if(this.bulletDataAry[i] == bulletData){
						return;
					}
				}
			}
			this.bulletDataAry.push(bulletData);
            Laya.timer.frameLoop(bulletData["interval"],this,this.startCreatBullet,[{host:this,bulletData:bulletData}]);		
		}

		/*开始制造子弹*/
		private startCreatBullet(data:Array<any>):void{
			var len:number = data["bulletData"]["bulletNumPerWave"];
			for(var i:number = 0; i<len; i++){
				var bullet:gameObject.Bullet = gameObject.GameObjectFactory.instance.creatGameObject
											(GameObjectEnum.TEXTURE_FLAG,GameObjectEnum.BULLET,data["bulletData"]["kind"],
											data["bulletData"]["status"],data["bulletData"]["team"],{host:data["host"],operationID:data["bulletData"]["operation"]});
				manager.BulletManager.instance.writeIn(this,bullet); 	
			}	     
        }

		/*移除飞机上的所有子弹*/
        public removeAllBullets(){
			Laya.timer.clearAll(this);
			manager.BulletManager.instance.removeHostToBulletsByKey(this);
        }

        // /*移出飞机上的指定子弹*/
        // public removeTargetBullet(host:gameObject.GameObject,kindID:number,statusID:number){
        //     var obj:Object = new laya.utils.Pool();
        //     if(this.bulletDataAry.indexOf(host) != -1){
        //         var bulletDataAry:Array<Object> = this.bulletDataAry.get(host);
        //         var len:number = bulletDataAry.length;
        //         for(var i:number = 0; i<len; i++){
        //             if(bulletDataAry[i]["kind"] == kindID && bulletDataAry[i]["status"] == statusID){
        //                 bulletDataAry.splice(bulletDataAry.indexOf(i),1);
        //                 this.bulletDataAry.set(host,bulletDataAry);
        //                 break;
        //             }
        //         }
                
        //     }
        //     else{
        //         console.assert(false,"宿主对象为空！请检查！")
        //     }
        // }

	}
}