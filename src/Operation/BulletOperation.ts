
    
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
            super.unregister();
            Laya.timer.clear(this,this.update);
        }

        private update():void{
            if(UIUtil.inBorder(this._gameObj.x,this._gameObj.y)){
                if(this._gameObj.teamID == TEAM.MASTER){
                    this._gameObj.y -= this.BULLET_SPEED;
                    this.checkHit();
                }
                else if(this._gameObj.teamID == TEAM.ENEMY){
                    this._gameObj.y += this.BULLET_SPEED;
                }
            }
            else{
                this.destorySelf();
            }
        }

        private checkHit():void{
            var enemys:Dictionary = manager.BattleLogicManager.instance.inViewEnemyPanels;
            for(var i:number = 0; i<enemys.values.length; i++){
				var enemyPanel:gameObject.Panel = enemys.values[i];
                if(this._gameObj.getBounds().intersects(enemyPanel.getBounds())){
                    manager.BattleLogicManager.instance.dispatchEvent(manager.BattleLogicManager.ENEMY_ON_DESTORY,enemyPanel);
                    this.destorySelf();
                    break;
                }
			}
        }

        private destorySelf():void{
            Laya.timer.clear(this,this.update);
            gameObject.GameObjectFactory.instance.disposeGameObject(this._gameObj);
        }
    }
}