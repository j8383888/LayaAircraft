/**
* name 
*/
module commonUI{
	export class MainView extends ui.Main.MainUI implements BaseUIView{
		constructor(){
			super();
		}

		public dispose():void{
			super.destroy();
		}

		public clear():void{

		}

		public onInit():void{
			manager.LayerManager.instance.addToLayer(this,LAYER.MAIN);
		}

		public onShow():void{
			
		}

		public onHide():void{
			manager.LayerManager.instance.removeFromLayer(this,LAYER.MAIN);
		}
	}
}