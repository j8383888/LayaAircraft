/**
* name 
*/
module manager{
	import stage = Laya.stage;
	export class BattleLogicManager{

		/*一关中所有的敌人字典*/
		public allEnemyPanels:Dictionary;
		/*在屏幕内的敌人字典*/
		public inViewEnemyPanels:Dictionary;
		/*单例*/
		private static _instance:BattleLogicManager = null;
		/*玩家飞机*/
		public masterPanel:gameObject.MasterPanel;

		private enemyBulletKindAry:Array<number> = [10,12,14,16]
		

		constructor(){
			this.allEnemyPanels = new Dictionary();
			this.inViewEnemyPanels = new Dictionary();
		}

		public static get instance():BattleLogicManager{
			if(this._instance == null){
				this._instance = new BattleLogicManager();
			}
			return this._instance;
		}

		public initBattleLogic():void{
			this.creatMaster();
			this.creatEnemys();
			manager.BulletManager.instance.initBulletManager();
		}

		public uninitBattleLogic():void{
			this.dispose();
		}

		private dispose():void{
			manager.BulletManager.instance.uninitBulletManager();
			this.destroyMaster();
			this.destroyEnemys();			
			this.allEnemyPanels.clear();
			this.inViewEnemyPanels.clear();
			this.masterPanel = null;
		}

		private destroyMaster():void{
			gameObject.GameObjectFactory.instance.disposeGameObject(this.masterPanel);	
		}

		private destroyEnemys():void{
			Laya.timer.clear(this,this.creatEnemyAry);
			var len:number = this.inViewEnemyPanels.values.length;
			for(var i:number = 0; i<len; i++){
				var enemy:gameObject.Panel = this.inViewEnemyPanels.values[i];
				gameObject.GameObjectFactory.instance.disposeGameObject(enemy);
			}			
		}

		private creatMaster():void{
			this.masterPanel = gameObject.GameObjectFactory.instance.creatGameObject(GameObjectEnum.TEXTURE_FLAG,GameObjectEnum.MASTER_PANEL,
													PANEL_KIND.PANEL_KIND_0, COMMON_STATUS.ALIVE, TEAM.MASTER);
			this.masterPanel.registerOperation(OPERATION_TYPE.MASTER);										
			this.masterPanel.setPos((Laya.stage.width - 88) / 2,Laya.stage.height - 100);
			this.masterPanel.addBullet(BULLET_KIND.BULLET_KIND_0,0,OPERATION_TYPE.BULLET,10);
		}

		private creatEnemys():void{	
			// Laya.timer.frameLoop(20,this,this.creatEnemyAry);
			this.creatEnemyAry();
		}

		private creatEnemyAry():void{
			var randomPos:number = MathUtil.randomToInt(0,400);	
			var randomEnemyPanelType:number = MathUtil.randomToInt(1,4);
			var randomEnemyBulletKind:number = MathUtil.randomToInt(0,3);

			var enemyPanel:gameObject.EnemyPanel = gameObject.GameObjectFactory.instance.creatGameObject(GameObjectEnum.TEXTURE_FLAG,GameObjectEnum.ENEMY_PANEL,
													randomEnemyPanelType, COMMON_STATUS.ALIVE, TEAM.ENEMY);	
			enemyPanel.setPos(randomPos,50);
			enemyPanel.registerOperation(OPERATION_TYPE.ENEMY);
			enemyPanel.addBullet(this.enemyBulletKindAry[randomEnemyBulletKind],0,OPERATION_TYPE.BULLET_CIRCLE,1,3);
			// enemyPanel.addBullet(randomEnemyBulletType,0,OPERATION_TYPE.BULLET);						
			this.allEnemyPanels.set(enemyPanel.uID,enemyPanel);
			this.inViewEnemyPanels.set(enemyPanel.uID,enemyPanel);
		}

	}
	
}