// 程序入口
class GameEntry{

    constructor()
    {
        this.checkPlatform();

        Laya.init(480,800);
        Laya.stage.frameRate = "fast";
        Laya.stage.bgColor = ColorUtil.HTML_BLACK;
        Laya.stage.scaleMode = "noscale";
        Laya.stage.alignH = "center";
        Laya.stage.alignV = "middle";
        Laya.Stat.show();

        this.loadCommonAsset();
    }

    private checkPlatform():void
    {
        if(laya.utils.Browser.onPC || laya.utils.Browser.onAndriod){
           //待添加
        }
        else{
            console.log("不支持当前平台");
        }  
    }

    private loadCommonAsset():void
    {
        Laya.loader.load([{url:"res/atlas/comp.atlas",type:Laya.Loader.ATLAS}],new laya.utils.Handler(this,this.GameStart));
    }
    
    //游戏开始
    private GameStart():void{ 
        alert("hello world")
        UICenter.instance.openUI(UI.Main);
    }
}
new GameEntry();