/**
* name 
*/
module operation{
	export class BulletOperationX extends BaseOperation{

		private readonly Duration_Time:number = 2000;
		constructor(){
			super();
		}

		public register(gameObj:gameObject.GameObject):void {
            super.register(gameObj);
			var masterPanel:gameObject.Panel = manager.BattleLogicManager.instance.masterPanel;
			var targetX:number = masterPanel.x;
			var targetY:number = masterPanel.y;
			// while(UIUtil.inBorder(targetX,targetY)){
			// 	targetX += 1;
			// 	targetY += 1;
			// }
			laya.utils.Tween.to(gameObj,{x:targetX,y:targetY},this.Duration_Time,Laya.Ease.linearNone,new laya.utils.Handler(this,this.onTweenComplete),0,true);          
        }

        public unregister():void{
			laya.utils.Tween.clearAll(this._gameObj);
            super.unregister();       
        }

		private onTweenComplete():void{
			gameObject.GameObjectFactory.instance.disposeGameObject(this._gameObj);
		}
	}
}