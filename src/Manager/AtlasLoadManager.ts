/**
* name 
*/
module manager{
	import Texture = laya.resource.Texture;
	import Handler = laya.utils.Handler;
	export class AtlasLoadManager{
		
		private static _instance:AtlasLoadManager;
		/*已加载图集的名称（不带后缀）*/
		private _loadedAtlasAry:Array<string>;

		private _atlasName:string;


		constructor(){
			this._loadedAtlasAry = new Array<string>();
		}

		public static get instance():AtlasLoadManager{
			if(this._instance == null){
				this._instance = new AtlasLoadManager();
			}
			return this._instance;
		}

		//try获取纹理
		private tryGetTextureInCache(flagName:string,typeID:number,kindID:number,statusID:number = 0):Texture
		{
			var tex:Texture = null;
			var typeStr:string = GameObjectEnum.instance.enumDic.get(typeID);
			this._atlasName = flagName + "_" + typeStr;
		
			/*未加载*/
			if(this._loadedAtlasAry.indexOf(this._atlasName) == -1){
				return null;
			}
			/*已加载图集*/
			else{
				var texURL:string = flagName + "_" + typeID + "_" + kindID + "_" + statusID;
				var URLAry:Array<string> = Laya.Loader.getAtlas("res/atlas/" + this._atlasName + ".atlas");
				if(URLAry.length <= 0){
					console.assert(false,"图集url错误");
				}

				for (var i:number = 0; i<URLAry.length; i++){
					var url:string = URLAry[i]
					if(url.indexOf(texURL) != -1){
						tex = Laya.loader.getRes(url);
						break;
					}
				}
			}	
			return tex;
		}
		
		//try加载图集
		private tryLoadAtals(flagName:string,typeID:number,kindID:number,statusID:number = 0,callBack:Handler = null):void{
			if(this._loadedAtlasAry.indexOf(this._atlasName) == -1){
				var url:string = "res/atlas/" + this._atlasName + ".atlas";
				Laya.loader.load(url,laya.utils.Handler.create(this,this.onLoadComplete,[flagName,typeID,kindID,statusID,callBack]),null,Laya.Loader.ATLAS)
			}
		}

		//加载完毕
		private onLoadComplete(flagName:string,typeID:number,kindID:number,statusID:number,callBack:Handler):void{
			var tex:Texture = null;
			this._loadedAtlasAry.push(this._atlasName);
			tex = this.tryGetTextureInCache(flagName,typeID,kindID,statusID);
			if(tex == null){
				console.assert(false,"Texture为空！");
			}
			if(callBack != null){
				callBack.runWith(tex);
			}
		}

		//try获取纹理,自动识别缓存中是否有此纹理，无则加载，有则从缓存中获取（对tryGetTextureInCache，tryLoadAtals进行封装）
		public tryGetTexture(flagName:string,typeID:number,kindID:number,statusID:number = 0,callBack:Handler = null):void
		{
			var tex:Texture = null;
			tex = this.tryGetTextureInCache(flagName,typeID,kindID,statusID);
			if(tex == null){
				this.tryLoadAtals(flagName,typeID,kindID,statusID,callBack);
			}
			else{
				if(callBack != null){
					callBack.runWith(tex);
				}
			}
		}
	}
}