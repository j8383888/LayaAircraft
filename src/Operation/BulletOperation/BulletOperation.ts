
    
module operation{
    export class BulletOperation extends BaseOperation{

        private readonly BULLET_SPEED:number = 3;

        constructor(){
            super();
        }

        public register(gameObj:gameObject.GameObject):void {
            super.register(gameObj);
            Laya.timer.frameLoop(1,this,this.update)
        }

        public unregister():void{           
            Laya.timer.clearAll(this);
            super.unregister();
        }

        private update():void{
            if(UIUtil.inBorder(this._gameObj.x,this._gameObj.y)){
                if(this._gameObj.teamID == TEAM.MASTER){
					this._gameObj.y -= 5;
				}
				else if(this._gameObj.teamID  == TEAM.ENEMY){
					this._gameObj.y += 5;
				}              
            }
            else{
                Laya.timer.clearAll(this);
                gameObject.GameObjectFactory.instance.disposeGameObject(this._gameObj);
            }
        }
    }
}