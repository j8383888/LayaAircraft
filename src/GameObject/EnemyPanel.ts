/**
* name 
*/
module gameObject{
	export class EnemyPanel extends Panel{
		constructor(){
			super();
		}
		/*初始化*/
		public initialize():void{
			super.initialize();
			this.rotation = 180;
			manager.EventManager.instance.addEventListener(manager.EventManager.ENEMY_ON_DESTORY,this,this.onDestroy);
		}

		/*反初始化*/
		public uninitialize():void{	
			manager.EventManager.instance.removeEventListener(manager.EventManager.ENEMY_ON_DESTORY,this,this.onDestroy);
			super.uninitialize();	
		} 

		private onDestroy(panel:gameObject.EnemyPanel):void{
            if(panel.uID == this.uID){
                manager.AnimationManager.instance.aniPlayOnce(GameObjectEnum.BURST,this.x,this.y);
				manager.BattleLogicManager.instance.inViewEnemyPanels.remove(this.uID);
				gameObject.GameObjectFactory.instance.disposeGameObject(this); 
            }
        }
	}
}