/**
* name 
*/
module commonUI{
	export class GameSceneView extends ui.GameScene.GameSceneUI implements BaseUIView{
		constructor(){
			super();
		}

		public dispose():void{
			super.destroy();
		}

		public clear():void{

		}

		public onInit():void{
			manager.LayerManager.instance.addToLayer(this,LAYER.BATTLE);
		}

		public onShow():void{
			
		}

		public onHide():void{
			manager.LayerManager.instance.removeFromLayer(this,LAYER.BATTLE);
		}
	}
}