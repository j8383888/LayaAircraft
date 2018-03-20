/**
* name 
*/
module gameObject{
	import Texture = laya.resource.Texture;
	import Sprite = laya.display.Sprite;
	export class Bullet extends gameObject.GameObject{

		public registerOprID:number = -1;
		private _curTexture:Texture;
		
		private readonly OFFSET_X:number = 5;
		private readonly OFFSET_Y:number = 40;
		/*宿主对象*/
		public host:gameObject.GameObject = null;
		
		constructor(){
			super();
		}

		/*初始化*/
		public initialize():void{
			manager.AtlasLoadManager.instance.tryGetTexture(gameObject.GameObject.ATLAS_FLAG,
			this._typeID,this._kindID,this._statusID,new laya.utils.Handler(this,this.setRenderTexture));
			
			this.registerOprID = manager.OperationManager.instance.registerOperation(this,OPERATION_TYPE.BULLET);		
			manager.LayerManager.instance.addToLayer(this,this._layerType);
		}

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
			manager.OperationManager.instance.unregisterOperation(this.registerOprID);
			this.registerOprID = -1;
			manager.LayerManager.instance.removeFromLayer(this,this._layerType);
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
	}
}