/**
* name 
*/
module manager{
	import Animation = Laya.Animation;
	export class AnimationManager{
		/*键为动画名枚举，值为动画的长度*/
		private AnimationDic:Dictionary;
		private static _instance:AnimationManager;
		private animation:Animation;

		constructor(){
			this.animation = new Animation();
			this.AnimationDic = new Dictionary();
			this.AnimationDic.set(ANIMATION_TYPE.BURST,{aniName:"burst",aniLength:5})
		}

		public static get instance():AnimationManager{
			if(this._instance == null){
				this._instance = new AnimationManager();
			}
			return this._instance;
		}

		public play(ANIMATION_TYPE:number,posX:number,posY:number){
			var aniName = this.AnimationDic.get(ANIMATION_TYPE).aniName;
			var aniLength:number = this.AnimationDic.get(ANIMATION_TYPE).aniLength;
			AtlasLoadManager.instance.tryGetAnimation(aniName, aniLength, posX, posY,new laya.utils.Handler(this,this.playAni));
		}

		private playAni(data:any):void{
			var ani:Animation = new Animation();
			ani.autoSize = true;
			ani.play(0,false,data["name"],true);			
			ani.pivot(ani.width/2,ani.height/2);
			ani.pos(data["x"],data["y"]);
			ani.on(Laya.Event.COMPLETE,this,this.playOver,[ani]);
			manager.LayerManager.instance.addToLayer(ani,LAYER.BATTLE);
		}

		private playOver(data:any):void{
			data.off(Laya.Event.COMPLETE);
			data.destroy();
			manager.LayerManager.instance.removeFromLayer(data ,LAYER.BATTLE);
		}
	}
}