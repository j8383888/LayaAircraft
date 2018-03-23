/**
* name 
*/
module operation{
	export class BulletOperationCircle extends BaseOperation{

		private static ANGLE:number = 0.5;
		private _curAngle:number = 0
		private _radius:number = 0;
		private _bornX:number = 0;
		private _bornY:number = 0;

		constructor(){
			super();
		}

		public register(gameObj:gameObject.GameObject):void {
            super.register(gameObj);
			BulletOperationCircle.ANGLE++;
			this._curAngle = BulletOperationCircle.ANGLE;
			this._gameObj.rotation += this._curAngle;
			this._bornX = this._gameObj.x;
			this._bornY = this._gameObj.y;
			Laya.timer.frameLoop(1,this,this.update);		         
        }

		private update():void{
			if(UIUtil.inBorder(this._gameObj.x, this._gameObj.y)){			
				this._radius += 3; 			
				this._gameObj.x = this._bornX + Math.cos(this._curAngle) * this._radius;
				this._gameObj.y = this._bornY + Math.sin(this._curAngle) * this._radius;
			}
			else{
				Laya.timer.clear(this,this.update);
                gameObject.GameObjectFactory.instance.disposeGameObject(this._gameObj);
			}
		}

        public unregister():void{
			Laya.timer.clear(this,this.update);
            super.unregister();       
        }
	}
}