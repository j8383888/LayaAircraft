/**
* name 
*/
module gameData{
	/**玩家信息 */
	export class Master{
		private static MASTER_STORAGE:string = "master_data";

		public static CONF_PATH:string = "res/config/master.json";

		public static MONEY:string = "money";
		public static ENERGY:string = "energy";
		public static NAME:string = "name";
		public static DEFAULT_PANEL_NUM:string = "default_panel_num";

		private static _instance:Master = null;
				 
		constructor(){
			
		}

		public static get instance():Master{
			if(this._instance == null){
				this._instance = new Master();
			}
			return this._instance;
		}

		public getDataByType(type:string):any{
			var localData:string = localStorage.getItem(Master.MASTER_STORAGE);
			if(localData != undefined){
				var jsonData:any = JSON.parse(localData);
				return jsonData[type];
			}
			return null;
		}		

		/**覆盖旧值，更新值 */
		public updateDataByType(value:any,type:string,isCoverOldValue:boolean = false):void{
			var localData:string = localStorage.getItem(Master.MASTER_STORAGE);
			if(localData != undefined){
				var jsonData:any = JSON.parse(localData);
				if(isCoverOldValue){
					jsonData[type] = value;
				}
				else{
					if(typeof value == "number"){
						var oldValue = jsonData[type];
						var newValue = oldValue + value;
						jsonData[type] = newValue;
					}
				}
				var jsonStr:string = JSON.stringify(jsonData);

				localStorage.setItem(Master.MASTER_STORAGE,jsonStr);
			}
		}		

		/**利用localstorage存储 */
		public initData(data:any):void{
			var localData:string = localStorage.getItem(Master.MASTER_STORAGE);
			if(localData == undefined){
				var jsonStr:string = JSON.stringify(data);
				localStorage.setItem(Master.MASTER_STORAGE,jsonStr);
			}			
		}
	}
}