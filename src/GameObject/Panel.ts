/**
* name 
*/
module gameObject{
	import Texture = laya.resource.Texture;
	import Sprite = laya.display.Sprite;
	export class Panel extends gameObject.GameObject{
	
		private _registerOprID:number = -1;
		private _curTexture:Texture;

		constructor(){
			super();
		}

		/*初始化*/
		public initialize():void{
			manager.AtlasLoadManager.instance.tryGetTexture(gameObject.GameObject.ATLAS_FLAG,
			this._typeID,this._kindID,this._statusID,new laya.utils.Handler(this,this.setRenderTexture));
			
			this._registerOprID = manager.OperationManager.instance.registerOperation(this,this._teamID);		
			manager.LayerManager.instance.addToLayer(this,this._layerType);
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
			manager.OperationManager.instance.unregisterOperation(this._registerOprID);
			this._registerOprID = -1;
			manager.LayerManager.instance.removeFromLayer(this,this._layerType);
			manager.BulletManager.instance.removeBullets(this);		
		} 

		public dispose():void{
			
			this._curTexture = null;
			super.dispose();
		}

		/*渲染纹理*/
		private setRenderTexture(tex:Texture):void{
			if(tex == null){
				console.assert(false,"Texture为空！");
			}	
			//避免高频DC
			if (this._curTexture == null || (this._curTexture.url != tex.url)){
				this.graphics.drawTexture(tex);
				this._curTexture = tex;
				this.pivot(this.width/2,this.height/2);
			}
		}

		/*添加一种子弹*/
		public addBullet(bulletKind:number,bulletState:number):void{
			manager.BulletManager.instance.addBullet(this,bulletKind,bulletState,this._teamID);
		}

	}
}