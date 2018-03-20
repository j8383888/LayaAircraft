/**
* name 
*/
module gameObject{
	export class Panel extends GameObjectEx{
		constructor(){
			super();
		}

		/*初始化*/
		public initialize():void{
			super.initialize();
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
			super.dispose();
		}

		/*添加一种子弹*/
		public addBullet(bulletKind:number,bulletState:number):void{
			manager.BulletManager.instance.addBullet(this,bulletKind,bulletState,this._teamID);
		}

	}
}