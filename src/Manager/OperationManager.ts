/**
* name 
*/
module manager{
	export class OperationManager{

		/**广义操作管理器  不光包括战机 还包括子弹轨迹 存在注册具体操作方式不一样而已 */
		private static _instance:OperationManager;
		private _ALLRegisterOprDic:Dictionary;
		private _operationClsDiC:Dictionary;
		private _registerID:number = -1;
		constructor(){
			this._ALLRegisterOprDic = new Dictionary();
			this._operationClsDiC = new Dictionary();
			this._operationClsDiC.set(OPERATION_TYPE.MASTER,operation.MasterPanelOperation);
			this._operationClsDiC.set(OPERATION_TYPE.ENEMY,operation.EnemyPanelOperation);
			this._operationClsDiC.set(OPERATION_TYPE.FRIEND,operation.FiendPanelOperation);
			this._operationClsDiC.set(OPERATION_TYPE.BULLET,operation.BulletOperation);
			this._operationClsDiC.set(OPERATION_TYPE.BULLET_X,operation.BulletOperationX);
		
		}

		public static get instance():OperationManager{
			if(this._instance == null){
				this._instance = new OperationManager();
			}
			return this._instance;
		}
		/*对某个对象 注册操作方式 返回注册id用于反注册*/
		public registerOperation(gameObj:gameObject.GameObject,opeartionType:number):number{
			if(gameObj == null){
                console.assert(false,"注册对象为空！")
            }
			var cls;
			cls = this._operationClsDiC.get(opeartionType);
			if(cls == null)
			{
				console.assert(false,"TeamID 未被注册！")
			}
			var registerOperation:operation.BaseOperation = new cls();
			registerOperation.register(gameObj);
			this._registerID++;
			this._ALLRegisterOprDic.set(this._registerID,registerOperation);
			return this._registerID;
		}

		/*反注册 操作*/
		public unregisterOperation(registerID:number):void{
			if(registerID == -1){
				return;
			}
			var registerOperation:operation.BaseOperation = this._ALLRegisterOprDic.get(registerID);
			if(registerOperation == null){
				console.assert(false,"registerID不存在！")
			}
			registerOperation.unregister();
			registerOperation = null;

			this._ALLRegisterOprDic.remove(registerID);
		}
	}
}