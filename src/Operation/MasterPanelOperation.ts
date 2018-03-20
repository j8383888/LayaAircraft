/**
* name 
*/
module operation{
	export class MasterPanelOperation extends BaseOperation{

		private _dragRect:Laya.Rectangle;

		constructor(){
			super();
			this._dragRect = new Laya.Rectangle(0,0,Laya.stage.width,Laya.stage.height);
		}

		public register(gameObj:gameObject.GameObject):void { 
			super.register(gameObj);
			gameObj.texture
			this._gameObj.on(Laya.Event.MOUSE_DOWN,this,this.mouseDownHandler)
        }

		private mouseDownHandler(e:Laya.Event):void{
			this._gameObj.startDrag(this._dragRect);
		}

        public unregister():void{		
			this._gameObj.off(Laya.Event.MOUSE_DOWN,this,this.mouseDownHandler);
			this._dragRect = null;
			super.unregister();
        }
	}
}