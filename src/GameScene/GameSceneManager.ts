/**
* name 
*/
module commonUI{
	export class GameSceneManager extends BaseUIManager{
	constructor() {
			super();
			
			this.addControl(commonUI.GameSceneControl);
			this.addView(commonUI.GameSceneView);
			this.addResData(new ResData("GameScene/img_systemimg.png", Laya.Loader.IMAGE))
		}
	}
}