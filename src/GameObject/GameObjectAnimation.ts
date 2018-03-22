/**
* 自动加载动画资源并放置在舞台上（并可以注册一种行为）多种行为 待添加   
*/
module gameObject{
	import Texture = laya.resource.Texture;
    import Sprite = laya.display.Sprite;
	import Animation = Laya.Animation;
	export class GameObjectAnimation extends GameObject{
        /*一个动画模板 对应一个varsData*/
		private _animationName:string = null;
        /*渲染对象*/
        private _render:Animation = null;
        private _registerOprID:number = -1;
        // private _aniData:Object = null;

		constructor(){
			super();
            this._render = new Animation();
            this._render.autoSize = true;   
            this.addChild(this._render);    
		}
        

		/*初始化*/
        public initialize():void{
            if(this._varsData == null){
                console.assert(false,"动画参数未设置！")
            }
			if(this._animationName == null){
                manager.AtlasLoadManager.instance.tryGetAtlas(GameObjectEnum.ANIMATION_FLAG,
                this._typeStr,this._kindID,this._statusID,this._varsData,new laya.utils.Handler(this,this.setRenderAnimation));  
            }
            else{
                this.playAniOnce();
            }
            manager.LayerManager.instance.addToLayer(this,this._layerType);        
        }
 
        /*反初始化*/
        public uninitialize():void{	
            manager.OperationManager.instance.unregisterOperation(this._registerOprID);
            this._registerOprID = -1;
            manager.LayerManager.instance.removeFromLayer(this,this._layerType);
        } 

        public dispose():void{          
            this._animationName = null;
            if(this._render != null){
                this._render.destroy();
                this.render = null;
            }
            super.dispose();
        }

        /*渲染纹理*/
        private setRenderAnimation(animationName:string):void{
			if(animationName == null){
				console.assert(false,"动画模板名字为空!")
			}
            if (this._animationName == null || (this._animationName != animationName)){
                this._animationName = animationName;                
            }
            this.playAniOnce();
        }

        private playAniOnce(){
            this._render.play(0,false,this._animationName,true);           
            this._render.on(Laya.Event.COMPLETE,this,this.playOver);    
        }

		private playOver():void{
            // this._render.pivot(this._render.width/2,this._render.height/2); 
            this.pivot(this.width/2,this.height/2);
			this._render.off(Laya.Event.COMPLETE,this,this.playOver);
			GameObjectFactory.instance.disposeGameObject(this);
		}
        
        /*注册一种行为*/
        public registerOperation(operationID:number):void{
			this._registerOprID = manager.OperationManager.instance.registerOperation(this,operationID);		
		}
	}
}