/**
* name 
*/
module manager{
	import Texture = laya.resource.Texture;
	import Handler = laya.utils.Handler;
	import Animation = Laya.Animation;
	export class AtlasLoadManager{
		
		private static _instance:AtlasLoadManager;
		/*已加载图集的名称（不带后缀）*/
		private _loadAtlasAry:Array<string>;
		/*已加载动画的名称（不带后缀）*/
		private _loadAniAry:Array<string>;
		/*临时资源名字*/
		private _assetName:string;

		constructor(){
			this._loadAtlasAry = new Array<string>();
			this._loadAniAry = new Array<string>();
		}

		public static get instance():AtlasLoadManager{
			if(this._instance == null){
				this._instance = new AtlasLoadManager();
			}
			return this._instance;
		}

		//try获取纹理
		private tryGetTextureInCache(flagName:string,typeID:number,kindID:number,statusID:number):Texture
		{
			var tex:Texture = null;
			var typeStr:string = GameObjectEnum.instance.enumDic.get(typeID);
			this._assetName = flagName + "_" + typeStr;
		
			/*未加载*/
			if(this._loadAtlasAry.indexOf(this._assetName) == -1){
				return null;
			}
			/*已加载图集*/
			else{
				var texURL:string = flagName + "_" + typeID + "_" + kindID + "_" + statusID;
				var URLAry:Array<string> = Laya.Loader.getAtlas("res/atlas/" + this._assetName + ".atlas");
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
		private tryLoadAtals(flagName:string,typeID:number,kindID:number,statusID:number = 0,callBack:Handler):void{
			if(this._loadAtlasAry.indexOf(this._assetName) == -1){
				var url:string = "res/atlas/" + this._assetName + ".atlas";
				Laya.loader.load(url,laya.utils.Handler.create(this,this.onLoadAtlasComplete,[flagName,typeID,kindID,statusID,callBack]),null,Laya.Loader.ATLAS)
			}
		}

		//加载完毕
		private onLoadAtlasComplete(flagName:string,typeID:number,kindID:number,statusID:number,callBack:Handler):void{
			var tex:Texture = null;
			this._loadAtlasAry.push(this._assetName);
			tex = this.tryGetTextureInCache(flagName,typeID,kindID,statusID);
			if(tex == null){
				console.assert(false,"Texture为空！");
			}
			if(callBack != null){
				callBack.runWith(tex);
			}
		}

		//try获取纹理,自动识别缓存中是否有此纹理，无则加载，有则从缓存中获取（对tryGetTextureInCache，tryLoadAtals进行封装）
		public tryGetTexture(flagName:string,typeID:number,kindID:number,statusID:number = 0,callBack:Handler = null):void{
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

		//try获得动画 资源名字("ani_"+aniName)与动画模板名字保持一致
		public tryGetAnimation(aniName:string, length:number, posX:number, posY:number, callBack:Handler):void{
			this._assetName = "ani_" + aniName;
			if(this._loadAniAry.indexOf(this._assetName) == -1){
				this.tryLoadAniAtals(this._assetName, length, posX, posY, callBack);
			}
			else{
				if(callBack != null){
					callBack.runWith({name:this._assetName, x:posX, y:posY});
				}
			}
		}

		//try加载动画图集
		private tryLoadAniAtals(assetName:string,length:number, posX:number, posY:number,callBack:Handler):void{
			var url:string = "res/atlas/" + assetName + ".atlas";
			Laya.loader.load(url,laya.utils.Handler.create(this,this.onLoadAniComplete,[assetName,length,posX,posY,callBack]),null,Laya.Loader.ATLAS)
		}

		//动画加载完毕 
		private onLoadAniComplete(assetName:string,length:number, posX:number, posY:number,callBack:Handler):void{
			this._loadAniAry.push(assetName);
			//打包图集放置在缓存内
			Laya.Animation.createFrames(this.aniUrls(assetName,length),assetName);
			if(callBack != null){
				callBack.runWith({name:this._assetName, x:posX, y:posY});
			}		
		}

		//获得动画路径
		private aniUrls(assetName:string,length:number):any{
			var urls:any = [];
			for(var i:number = 1; i < length+1; i++){
				urls.push(assetName + "/" + assetName + "_" + i +".png");
			}
			return urls;
    	}
	}
}