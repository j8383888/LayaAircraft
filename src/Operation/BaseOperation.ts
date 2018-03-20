/**
* name 
*/
module operation{
	export class BaseOperation{

        protected _gameObj:gameObject.GameObject;

		constructor(){

		}
        /*父类必须调用super.register()*/
        public register(gameObj:gameObject.GameObject):void {
            this._gameObj = gameObj;
        }
        /*父类必须调用super.unregister()*/
        public unregister():void{
            this._gameObj = null;
        }
	}
}