/**
* name 
*/
module gameObject{
	export class GameObjectFactory{

		private static _instance: GameObjectFactory = null;
		private _objClassDic: Dictionary = null;
		private _orderIndex:number = 0;
		constructor(){
			this._objClassDic = new Dictionary();
			this._objClassDic.set(GameObjectEnum.TEXTURE_FLAG + GameObjectEnum.PANEL,gameObject.Panel);
			this._objClassDic.set(GameObjectEnum.TEXTURE_FLAG + GameObjectEnum.STONE,gameObject.Stone);
			this._objClassDic.set(GameObjectEnum.TEXTURE_FLAG + GameObjectEnum.BULLET,gameObject.Bullet);
			this._objClassDic.set(GameObjectEnum.ANIMATION_FLAG + GameObjectEnum.BURST,gameObject.Burst);
		}


		public static get instance(): GameObjectFactory {
			if (this._instance == null) {
				this._instance = new GameObjectFactory();
			}
			return this._instance;
		}

		/*创建一个GameObject*/
		public creatGameObject(flagName:string,typeStr:string,kindID:number,statusID:number,teamID:number,varsData:Object = null):any{
			var gameObj:gameObject.GameObject = null;
			/*将美术资源一样的对象 视为同一个对象*/
			gameObj = gameObject.GameObjectPool.instance.tryGetGameObjInPool(flagName,typeStr,kindID,statusID);
			/*资源池无此资源*/
			if(gameObj == null){
				var className:any = this._objClassDic.get(flagName + typeStr);
				gameObj = new className();	
				gameObj.setData(flagName,typeStr,kindID,statusID,teamID,this._orderIndex,varsData);		
			}
			else{
				/*但由于携带参数可能不同 所以要重新赋值 比如子弹 宿主对象一直在变*/
				if(varsData != null){
					gameObj.varsData = varsData;
				}
			}	
			// gameObj.teamID = teamID;
			gameObj.initialize();
			this._orderIndex ++;
			return gameObj;
		}

		public disposeGameObject(gameObj:gameObject.GameObject):void{
			GameObjectPool.instance.disposeGameObject(gameObj);
		}
	}
}