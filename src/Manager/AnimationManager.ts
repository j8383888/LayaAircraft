/**
* name 
*/
module manager{
	import Animation = Laya.Animation;
	export class AnimationManager{
		/*键为动画名枚举，值为动画的长度*/
		private animationTempletDic:Dictionary;
		private static _instance:AnimationManager;
		private animation:Animation;

		constructor(){
			this.animation = new Animation();
			this.animationTempletDic = new Dictionary();
			this.animationTempletDic.set(GameObjectEnum.BURST,{typeStr:"burst",kindID:0,statusID:0,teamID:-1,varsData:{aniLength:5}})
		}

		public static get instance():AnimationManager{
			if(this._instance == null){
				this._instance = new AnimationManager();
			}
			return this._instance;
		}

		public aniPlayOnce(animationTempletName:string,posX:number,posY:number){
			var flagName:string = GameObjectEnum.ANIMATION_FLAG;
			var typeStr:string = this.animationTempletDic.get(animationTempletName).typeStr;
			var kindID:number = this.animationTempletDic.get(animationTempletName).kindID;
			var statusID:number = this.animationTempletDic.get(animationTempletName).statusID;
			var teamID:number = this.animationTempletDic.get(animationTempletName).teamID;
			var varsData:Object = this.animationTempletDic.get(animationTempletName).varsData;
			
			var gameObj:gameObject.GameObject = gameObject.GameObjectFactory.instance.creatGameObject(flagName,typeStr,kindID,statusID,teamID,varsData);
			gameObj.x = posX;
			gameObj.y = posY;
		}
	}
}