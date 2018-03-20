/**
* name 
*/
module operation{
	export class FiendPanelOperation extends BaseOperation{

		constructor(){
			super();
		}

		public register(gameObj:gameObject.GameObject):void {
			super.register(gameObj);
        }

        public unregister():void{
			super.unregister();
        }
	}
}