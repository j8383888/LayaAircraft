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
			this._objClassDic.set(GAME_OBJ_TYPE.BULLET,gameObject.Bullet);
			this._objClassDic.set(GAME_OBJ_TYPE.PANEL,gameObject.Panel);
			this._objClassDic.set(GAME_OBJ_TYPE.STONE,gameObject.Stone);
		}


		public static get instance(): GameObjectFactory {
			if (this._instance == null) {
				this._instance = new GameObjectFactory();
			}
			return this._instance;
		}

		public creatGameObject(typeID:number,kindID:number,statusID:number,teamID:number):any{
			var gameObj:gameObject.GameObject = null;
			gameObj = gameObject.GameObjectPool.instance.tryGetGameObjInPool(typeID,kindID,statusID);
			/*资源池无此资源*/
			if(gameObj == null){
				var className:any = this._objClassDic.get(typeID);
				gameObj = new className();
				gameObj.setData(typeID,kindID,statusID,teamID,this._orderIndex);
			}
			else{
				//待添加
			}
			gameObj.initialize();
			this._orderIndex ++;
			return gameObj;
		}

		public disposeGameObject(gameObj:gameObject.GameObject):void{
			GameObjectPool.instance.disposeGameObject(gameObj);
		}
	}
}