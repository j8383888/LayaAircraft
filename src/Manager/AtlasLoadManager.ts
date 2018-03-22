/**
* name 
*/
module manager{
	import Texture = laya.resource.Texture;
	import Handler = laya.utils.Handler;
	import Animation = Laya.Animation;
	export class AtlasLoadManager{
		/*单例*/
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
		private tryGetTextureInCache(assetName:string,kindID:number,statusID:number):Texture{
			var tex:Texture = null;
			/*未加载*/
			if(this._loadAtlasAry.indexOf(this._assetName) == -1){
				return null;
			}
			/*已加载图集*/
			else{
				var texURL:string = assetName + "_" + kindID + "_" + statusID;
				var URLAry:Array<string> = Laya.Loader.getAtlas("res/atlas/" + assetName + ".atlas");
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
		private tryLoadAtals(assetName:string,kindID:number,statusID:number = 0,callBack:Handler):void{
			if(this._loadAtlasAry.indexOf(assetName) == -1){
				var url:string = "res/atlas/" + assetName + ".atlas";
				Laya.loader.load(url,laya.utils.Handler.create(this,this.onLoadAtlasComplete,[assetName,kindID,statusID,callBack]),null,Laya.Loader.ATLAS)
			}
		}

		//加载完毕
		private onLoadAtlasComplete(assetName:string,kindID:number,statusID:number,callBack:Handler):void{
			var tex:Texture = null;
			this._loadAtlasAry.push(this._assetName);
			tex = this.tryGetTextureInCache(assetName,kindID,statusID);
			if(tex == null){
				console.assert(false,"Texture为空！");
			}
			if(callBack != null){
				callBack.runWith(tex);
			}
		}

		//try获取纹理,自动识别缓存中是否有此纹理，无则加载，有则从缓存中获取
		public tryGetAtlas(flagName:string,typeStr:string,kindID:number = -1,statusID:number = -1, varsData:Object = null, callBack:Handler = null):void{
			this._assetName = flagName + "_" +typeStr;
			if(flagName == GameObjectEnum.TEXTURE_FLAG){
				var tex:Texture = null;
				tex = this.tryGetTextureInCache(this._assetName,kindID,statusID);
				if(tex == null){
					this.tryLoadAtals(this._assetName,kindID,statusID,callBack);
				}
				else{
					if(callBack != null){
						callBack.runWith(tex);
					}
				}
			}
			else if(flagName == GameObjectEnum.ANIMATION_FLAG){			
				if(this._loadAniAry.indexOf(this._assetName) == -1){
					if(varsData == null){
						console.assert(false,"动画参数未设置！")
					}
					this.tryGetAnimation(this._assetName,kindID,statusID,varsData["aniLength"],callBack);
				}else{
					if(callBack != null){
						// Laya.Animation.createFrames(this.aniUrls(this._assetName,kindID,statusID,length),this._assetName);
						callBack.runWith(this._assetName);
					}
				}
				
			}
			else{
				console.assert(false,flagName + "不存在")
			}
		}

		//try获得动画 资源名字(assetName)与动画模板名字保持一致
		private tryGetAnimation(assetName:string,kindID:number,statusID:number,length:number,callBack:Handler):void{		
			if(this._loadAniAry.indexOf(assetName) == -1){
				this.tryLoadAniAtals(assetName, kindID, statusID,length, callBack);
			}
			else{
				if(callBack != null){
					callBack.runWith(assetName);
				}
			}
		}

		//try加载动画图集
		private tryLoadAniAtals(assetName:string,kindID:number,statusID:number,length:number,callBack:Handler):void{
			var url:string = "res/atlas/" + assetName + ".atlas";
			Laya.loader.load(url,laya.utils.Handler.create(this,this.onLoadAniComplete,[assetName,kindID,statusID,length,callBack]),null,Laya.Loader.ATLAS)
		}

		//动画加载完毕 
		private onLoadAniComplete(assetName:string,kindID:number,statusID:number,length:number,callBack:Handler):void{
			this._loadAniAry.push(assetName);
			//打包图集放置在缓存内
			Laya.Animation.createFrames(this.aniUrls(assetName,kindID,statusID,length),assetName);
			if(callBack != null){
				callBack.runWith(assetName);
			}		
		}

		//获得动画路径(目前只支持png 待添加...)
		private aniUrls(assetName:string,kindID:number,statusID:number,length:number):any{
			var urls:any = [];
			for(var i:number = 1; i < length+1; i++){
				urls.push(assetName + "/" + assetName + "_" + kindID+ "_" + statusID + "_" + i +".png");
			}
			return urls;
    	}
	}
}