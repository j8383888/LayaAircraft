/**
* name 
*/
module gameObject{
	export class Panel extends GameObjectTexture{

		private bulletDataAry:Array<Object> = null;

		constructor(){		
			super();
			this.bulletDataAry = new Array<Object>();
		}

		/*初始化*/
		public initialize():void{
			super.initialize();
			// var len = this.bulletDataAry.length;
			// if(len != 0){				
			// 	for(var i:number = 0; i<len; i++){
			// 		manager.BulletManager.instance.addBullet(this,this.bulletDataAry[i]);
			// 	}
			// }
			this.setRotation();
		}

		private setRotation():void{
			switch(this._teamID){
				case TEAM.MASTER:
					break;
				case TEAM.ENEMY:		
					this.rotation = 180;
					break;
				case TEAM.FRIEND:
					break;
			}
		}

		public setPos(x:number,y:number):void{
			this.pos(x,y);			
		}

		/*反初始化*/
		public uninitialize():void{	
			manager.BulletManager.instance.removeBullets(this);
			super.uninitialize();	
		} 

		public dispose():void{
			var len = this.bulletDataAry.length;
			for(var i:number = 0; i<len; i++){
				this.bulletDataAry[i] = null;
			}
			this.bulletDataAry.slice(0,len);
			this.bulletDataAry = null;
			super.dispose();
		}

		/*添加一种子弹*/
		public addBullet(bulletKind:number,bulletState:number,operationID:number):void{
			var bulletData:Object = {kind:bulletKind,status:bulletState,team:this._teamID,operation:operationID}
			var len = this.bulletDataAry.length;
			if(len != 0){				
				for(var i:number = 0; i<len; i++){
					if(this.bulletDataAry[i] == bulletData){
						return;
					}
				}
			}
			this.bulletDataAry.push(bulletData);
			manager.BulletManager.instance.addBullet(this,bulletData);
		}

	}
}