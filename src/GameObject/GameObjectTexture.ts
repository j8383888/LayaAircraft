/*
* 自动加载纹理并放置在舞台上（并可以注册一种行为）多种行为 待添加
*/
    
module gameObject{
	import Texture = laya.resource.Texture;
    import Sprite = laya.display.Sprite;
	export class GameObjectTexture extends GameObject{

		protected _curTexture:Texture = null;
        /*渲染对象*/
        protected _render:Sprite = null;
        protected _registerOprID:number = -1;

		constructor(){
			super();
            this._render = new Sprite();
            this._render.autoSize = true;
            this._render.cacheAs = "none";
            this.addChild(this._render);     
		}
        
		/*初始化*/
        public initialize():void{
            if(this._curTexture == null) {
                manager.AtlasLoadManager.instance.tryGetAtlas(GameObjectEnum.TEXTURE_FLAG,
                this._typeStr,this._kindID,this._statusID,-1,new laya.utils.Handler(this,this.setRenderTexture)); 
            }
            else{

            }
            manager.LayerManager.instance.addToLayer(this,this._layerType);        
        }
 
        /*反初始化*/
        public uninitialize():void{	
            manager.OperationManager.instance.unregisterOperation(this._registerOprID);
            this._registerOprID = -1;
            manager.LayerManager.instance.removeFromLayer(this,this._layerType);
        } 

        /*小写render就报错 真烦*/
        public get Render():Sprite{
            return this._render;
        }

        public dispose():void{          
            this._curTexture = null;
            if(this._render != null){
                this._render.destroy();
                this._render = null; 
            }
            super.dispose();
        }

        /*渲染纹理*/
        private setRenderTexture(tex:Texture):void{
            if(tex == null){
                console.assert(false,"Texture为空！");
            }	
            //避免高频DC
            if (this._curTexture == null || (this._curTexture.url != tex.url)){
                //不知道为什么会报错 先return
                if(this._render == null)
                    return;
                this._render.graphics.drawTexture(tex);
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
