/*
* name;
*/
module operation{
    export class EnemyPanelOperation extends BaseOperation{
        constructor(){
            super();
        }

        public register(gameObj:gameObject.GameObject):void {
            super.register(gameObj);
            Laya.timer.frameLoop(1,this,this.update);
        }

        private update():void{
            if(UIUtil.inBorder(this._gameObj.x,this._gameObj.y)){
                 this._gameObj.y += 1;
            }
            else{
                this.removeView();
            }
        }

        public unregister():void{
            super.unregister();
            Laya.timer.clearAll(this);
        }

        
        /*从视野中移除*/
        private removeView():void{
            Laya.timer.clear(this,this.update);
            gameObject.GameObjectFactory.instance.disposeGameObject(this._gameObj);     
        }
    }
}