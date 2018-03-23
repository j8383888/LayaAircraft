/**
* name 
*/
module operation{
	export class MasterPanelOperation extends BaseOperation{

		private _dragRect:Laya.Rectangle;

		constructor(){
			super();			
		}

		public register(gameObj:gameObject.GameObject):void { 
			super.register(gameObj);
			this._dragRect = new Laya.Rectangle(0,0,Laya.stage.width,Laya.stage.height);
			this._gameObj.on(Laya.Event.MOUSE_DOWN,this,this.mouseDownHandler)
			this._gameObj.on(Laya.Event.MOUSE_UP,this,this.mouseUpHandler)
        }

		private mouseDownHandler(e:Laya.Event):void{
			this._gameObj.startDrag(this._dragRect);
		}

		private mouseUpHandler(e:Laya.Event):void{
			this._gameObj.stopDrag();
		}

        public unregister():void{		
			this._gameObj.off(Laya.Event.MOUSE_DOWN,this,this.mouseDownHandler);
			this._gameObj.off(Laya.Event.MOUSE_UP,this,this.mouseUpHandler)
			this._dragRect = null;
			super.unregister();
        }
	}
}