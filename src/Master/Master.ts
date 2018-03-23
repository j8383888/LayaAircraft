/*
* name;
*/
module master{
    export class Master{

        private static _instance:Master = null;
        private _masterPanel:gameObject.Panel;
        public life:number = 10;
        public score:number = 0;

        constructor(){

        }

        public static get instance():Master{
			if(this._instance == null){
				this._instance = new Master();
			}
			return this._instance;
		}

        /*获得玩家飞机*/
        public get masterPanel():gameObject.Panel{
            return this._masterPanel;
        }
        
        public set masterPanel(value:gameObject.Panel){
             this._masterPanel = value;
        }
    }
}