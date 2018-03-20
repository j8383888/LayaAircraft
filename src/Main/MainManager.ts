/**
* name 
*/
module commonUI{
	export class MainManager extends BaseUIManager{
		constructor() {
			super();
			
			this.addControl(commonUI.MainControl);
			this.addView(commonUI.MainView);
			this.addResData(new ResData("res/atlas/Main.atlas", Laya.Loader.ATLAS))
		}
	}
}