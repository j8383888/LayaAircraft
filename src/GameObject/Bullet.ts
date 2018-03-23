/**
* name 
*/
module gameObject{
	export class Bullet extends GameObjectTexture{
	
		private readonly OFFSET_X:number = 35;
		private readonly OFFSET_Y:number = 20;
		/*宿主对象*/
		private _host:gameObject.GameObject = null;
		
		constructor(){
			super();
		}

		/*初始化*/
		public initialize():void{
			super.initialize();	
			if(this._varsData["operationID"] == null){
				console.assert(false,"子弹未注册operationID");
			}
			if(this._varsData["host"] == null){
				console.assert(false,"子弹宿主对象为空");
			}
			this._host = this._varsData["host"];		
			this.setBulletInitPos();
			this.registerOperation(this._varsData["operationID"]);
			Laya.timer.frameLoop(1,this,this.update)	
		}

		/*设置子弹的初始位置位置*/
		private setBulletInitPos():void{
			if(this._host != null){
				if(this._teamID == TEAM.MASTER){
					this.pos(this._host.x, this._host.y - this.OFFSET_Y);
					this.rotation = 0;
				}
				else if(this._teamID == TEAM.ENEMY){
					this.pos(this._host.x, this._host.y + this.OFFSET_Y);
					this.rotation = 180;
				}
			}		
		}

		/*反初始化*/
		public uninitialize():void{
			Laya.timer.clear(this,this.update);
			manager.BulletManager.instance.removeAllBulletsDicByKey(this._uID);
			super.uninitialize();		
		} 

		public dispose():void{
			this._host = null;
			super.dispose();
		}

		private update():void{
            this.checkHit();
        }

		private checkHit():void{
            if(this.teamID == TEAM.MASTER){
                var enemys:Dictionary = manager.BattleLogicManager.instance.inViewEnemyPanels;
                for(var i:number = 0; i<enemys.values.length; i++){
                    var enemyPanel:gameObject.EnemyPanel = enemys.values[i];
                    if(Math.abs(this.x - enemyPanel.x) < 30 && Math.abs(this.y - enemyPanel.y) < 30){
                        manager.EventManager.instance.dispatchEvent(manager.EventManager.ENEMY_ON_DESTORY,enemyPanel);
                        this.destorySelf();
                        break;
                    }
                }
            }
            else if(this.teamID == TEAM.ENEMY){
                var masterPanel:gameObject.MasterPanel = manager.BattleLogicManager.instance.masterPanel;
                if(masterPanel == null){
                    return;
                }
                if(Math.abs(this.x - masterPanel.x) < 10 && Math.abs(this.y - masterPanel.y) < 10){
                    manager.EventManager.instance.dispatchEvent(manager.EventManager.MASTER_ON_HIT,masterPanel);
                    this.destorySelf();
                }
            }
        }

		private destorySelf():void{
            Laya.timer.clear(this,this.update);
            gameObject.GameObjectFactory.instance.disposeGameObject(this);
        }
	}
}