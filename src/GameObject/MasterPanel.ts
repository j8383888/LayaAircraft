/**
* name 
*/
module gameObject{
	export class MasterPanel extends Panel{
		constructor(){
			super();
		}

		/*初始化*/
		public initialize():void{
			super.initialize();
			master.Master.instance.masterPanel = this;
			manager.EventManager.instance.addEventListener(manager.EventManager.MASTER_ON_HIT,this,this.onHit);
		}

		/*反初始化*/
		public uninitialize():void{
			manager.EventManager.instance.removeEventListener(manager.EventManager.MASTER_ON_HIT,this,this.onHit);
			super.uninitialize();			
		} 

		private onHit(panel:gameObject.Panel):void{
			if(this.uID == panel.uID){
                master.Master.instance.life --;
            }
		}
	}
}