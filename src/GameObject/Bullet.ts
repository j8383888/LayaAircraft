/**
* name 
*/
module gameObject{
	export class Bullet extends GameObjectEx{
	
		private readonly OFFSET_X:number = 5;
		private readonly OFFSET_Y:number = 40;
		/*宿主对象*/
		public host:gameObject.GameObject = null;
		
		constructor(){
			super();		
		}

		/*初始化*/
		public initialize():void{
			super.initialize();	
			this.registerOperation(OPERATION_TYPE.BULLET);	
		}
		/*设置位置*/
		public setPos():void{
			if(this.host != null){
				if(this._teamID == TEAM.MASTER){
					this.pos(this.host.x , this.host.y - this.OFFSET_Y);
				}
				else if(this._teamID == TEAM.ENEMY){
					this.pos(this.host.x , this.host.y + this.OFFSET_Y);
				}
			}
			this.rotation = this.host.rotation;
		}

		/*反初始化*/
		public uninitialize():void{
			super.uninitialize();
		} 

		public dispose():void{
			super.dispose();
		}
	}
}