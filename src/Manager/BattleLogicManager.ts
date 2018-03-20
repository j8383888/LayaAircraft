/**
* name 
*/
module manager{
	import stage = Laya.stage;
	export class BattleLogicManager extends laya.events.EventDispatcher{

		public static ENEMY_ON_DESTORY:string = "enemy_on_destory";
		/*一关中所有的敌人字典*/
		public allEnemyPanels:Dictionary;
		/*在屏幕内的敌人字典*/
		public inViewEnemyPanels:Dictionary;
		/*单例*/
		private static _instance:BattleLogicManager = null;
		/*玩家飞机*/
		private _selfPanel:gameObject.Panel;
		

		constructor(){
			super();
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
			this.destroyMaster();
			this.destroyEnemys();	
			manager.BulletManager.instance.uninitBulletManager();
			this.offAll();
			this.allEnemyPanels.clear();
			this.inViewEnemyPanels.clear();
			this._selfPanel = null;
		}

		private destroyMaster():void{
			gameObject.GameObjectFactory.instance.disposeGameObject(this._selfPanel);	
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
			this._selfPanel = gameObject.GameObjectFactory.instance.creatGameObject(GAME_OBJ_TYPE.PANEL,
													PANEL_KIND.PANEL_KIND_0, COMMON_STATUS.ALIVE, TEAM.MASTER);
			this._selfPanel.setPos((Laya.stage.width - 88) / 2,Laya.stage.height - 100);
			this._selfPanel.addBullet(BULLET_KIND.BULLET_KIND_0,0);
		}

		private creatEnemys():void{	
			Laya.timer.frameLoop(50,this,this.creatEnemyAry);			
		}

		private creatEnemyAry():void{
			var randomPos:number = MathUtil.random(0,400);	
			var randomEnemyPanelType:number = MathUtil.random(1,4);
			var randomEnemyBulletType:number = MathUtil.random(1,4);

			var enemyPanel:gameObject.Panel = gameObject.GameObjectFactory.instance.creatGameObject(GAME_OBJ_TYPE.PANEL,
													randomEnemyPanelType, COMMON_STATUS.ALIVE, TEAM.ENEMY);	
			enemyPanel.setPos(randomPos,60);
			enemyPanel.addBullet(randomEnemyBulletType,0);								
			this.allEnemyPanels.set(enemyPanel.uID,enemyPanel);
			this.inViewEnemyPanels.set(enemyPanel.uID,enemyPanel);
		}

		public dispatchEvent(event:string,data:any):void{
			this.event(event,data);
		}

		public addEventListener(event:string,caller: any, listener: Function, args?: Array<any>):void{
			this.on(event, caller, listener, args);
		}

		public removeEventListener(event:string,caller: any, listener: Function, onceOnly?: boolean):void{
			this.off(event, caller, listener, onceOnly);
		}
	}
	
}