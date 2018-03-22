/**
* name 
*/
module gameObject{
	import Sprite = laya.display.Sprite;
	export class GameObject extends Sprite{
		/*flagName_typeStr 对应图集的名字
			flagName_typeStr_kindID_statusID 对应 GameObjectEnum.ts枚举 对应美术资源*/
		protected _flagName:string;
		protected _typeStr:string;
		protected _kindID:number;
		protected _statusID:number;
		//队伍ID：0为玩家 1为敌人 2为队友
		protected _teamID:number;
		protected _uID:number = 0;
		
		protected _layerType:number = LAYER.BATTLE;
		protected _varsData:Object;
		/*引用计数*/
		public refCount:number = 0;
		
		constructor(){	
			super();
			this.autoSize = true;
		}

		public setData(flagName:string,typeStr:string,kindID:number,statusID:number,teamID:number,uID:number,varsData:Object):void
		{
			this._flagName = flagName;
			this._typeStr = typeStr;
			this._kindID = kindID;
			this._statusID = statusID;

			this._teamID = teamID;
			this._uID = uID;

			this._varsData = varsData;
		}

		public initialize():void{
			console.assert(false,"initialize必须被重写")
		}

		public uninitialize():void{
			console.assert(false,"uninitialize必须被重写")
		}

		public dispose():void{
			this._typeStr = null;
			this._kindID = -1;
			this._statusID = -1;
			this._teamID = -1;
			this._uID = -1;
			this._varsData = null;
			this.destroy();
		}

		public get uID():number{
			return this._uID;
		}

		public get kindID():number{
			return this._kindID;
		}

		public get typeID():string{
			return this._typeStr;
		}

		public get statusID():number{
			return this._statusID;
		}

		public get varsData():Object{
			return this._varsData;
		}

		public get layerType():number{
			return this._layerType;
		}

		public get teamID():number{
			return this._teamID;
		}

		public get flagName():string{
			return this._flagName;
		}

		public set varsData(value:Object){
			this._varsData = value;
		}

		public set teamID(value:number){
			this._teamID = value
		}
	}
}