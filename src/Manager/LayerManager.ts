/**
* name 
*/
module manager{
	import Sprite = laya.display.Sprite;
	export class LayerManager{
		private static _instance:LayerManager
		private _layerMap:Map = null;
		constructor(){
			this._layerMap = new Map();
			this._layerMap.addValue(LAYER.MAIN,new Sprite());
			this._layerMap.addValue(LAYER.BATTLE,new Sprite());
			this._layerMap.addValue(LAYER.POP,new Sprite());

			this.initLayer();
		}
		
		public static get instance():LayerManager{
			if(this._instance == null){
				this._instance = new LayerManager();
			}
			return this._instance;
		}
		
		private initLayer():void{
			for(var i:number = 0; i<this._layerMap.length; i++){
				var sp:Sprite = this._layerMap.getValueByIndex(i)
				sp.mouseEnabled = true;
				sp.mouseThrough = true;
				Laya.stage.addChild(sp);
			}
		}

		public addToLayer(source:Sprite,layerType:number):void{
			if(this._layerMap == null){
				return;
			}
			var layer:Sprite = this._layerMap.getValueByKey(layerType);
			if(layer != null){
				layer.addChild(source);
			}
		}

		public removeFromLayer(source:Sprite,layerType:number):void{
			if(this._layerMap == null){
				return;
			}
			var layer:Sprite = this._layerMap.getValueByKey(layerType);
			if(layer != null){
				layer.removeChild(source);				
			}
		}
	}
}