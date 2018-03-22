/**
* name 
*/
module gameObject{
	export class Bullet extends GameObjectTexture{
	
		private readonly OFFSET_X:number = 35;
		private readonly OFFSET_Y:number = 20;
		/*宿主对象*/
		private _host:gameObject.GameObject = null;
		
		constructor(){
			super();		
		}

		/*初始化*/
		public initialize():void{
			super.initialize();	
			if(this._varsData["operationID"] == null){
				console.assert(false,"子弹未注册operationID");
			}
			if(this._varsData["host"] == null){
				console.assert(false,"子弹宿主对象为空");
			}
			this._host = this._varsData["host"];		
			this.setBulletInitPos();
			this.registerOperation(this._varsData["operationID"]);	
		}

		/*设置子弹的初始位置位置*/
		private setBulletInitPos():void{
			if(this._host != null){
				if(this._teamID == TEAM.MASTER){
					this.pos(this._host.x, this._host.y - this.OFFSET_Y);
				}
				else if(this._teamID == TEAM.ENEMY){
					this.pos(this._host.x, this._host.y + this.OFFSET_Y);
				}
			}		
			this.rotation = this._host.rotation;
		}

		/*反初始化*/
		public uninitialize():void{
			super.uninitialize();
		} 

		public dispose():void{
			this._host = null;
			super.dispose();
		}
	}
}