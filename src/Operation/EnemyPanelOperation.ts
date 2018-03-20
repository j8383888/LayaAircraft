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
            manager.BattleLogicManager.instance.addEventListener(manager.BattleLogicManager.ENEMY_ON_DESTORY,this,this.onDestroy);
            
        }

        private update():void{
            if(UIUtil.inBorder(this._gameObj.x,this._gameObj.y)){
                 this._gameObj.y += 1;
            }
            else{
                this.destorySelf();
            }
        }

        public unregister():void{
            super.unregister();
            Laya.timer.clearAll(this);
        }

        private onDestroy(panel:gameObject.Panel):void{
            if(panel.uID == this._gameObj.uID){
                this.destorySelf();
            }
        }

        private destorySelf():void{
            Laya.timer.clear(this,this.update);
            manager.BattleLogicManager.instance.inViewEnemyPanels.remove(this._gameObj.uID);
            manager.BattleLogicManager.instance.removeEventListener(manager.BattleLogicManager.ENEMY_ON_DESTORY,this,this.onDestroy);
            gameObject.GameObjectFactory.instance.disposeGameObject(this._gameObj);      
        }
    }
}