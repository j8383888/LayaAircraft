// /*
// * 自动加载纹理并放置在舞台上（并可以注册一种行为）多种行为 待添加
// */
    
module gameObject{
	import Texture = laya.resource.Texture;
	export class GameObjectEx extends GameObject{

		private _curTexture:Texture;
        private _registerOprID:number = -1;
		constructor(){
			super();
		}
		/*初始化*/
        public initialize():void{
            manager.AtlasLoadManager.instance.tryGetTexture(gameObject.GameObject.ATLAS_FLAG,
            this._typeID,this._kindID,this._statusID,new laya.utils.Handler(this,this.setRenderTexture));  
            manager.LayerManager.instance.addToLayer(this,this._layerType);        
        }
 
        /*反初始化*/
        public uninitialize():void{	
            manager.OperationManager.instance.unregisterOperation(this._registerOprID);
            this._registerOprID = -1;
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
        
        /*注册一种行为*/
        public registerOperation(operationID:number):void{
			this._registerOprID = manager.OperationManager.instance.registerOperation(this,operationID);		
		}
	}
}
