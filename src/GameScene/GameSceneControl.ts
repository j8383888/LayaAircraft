/*
* name;
*/
module commonUI{
    import Sprite = laya.display.Sprite;
    import Image = laya.ui.Image;
    export class GameSceneControl extends BaseUIControl{
        
        private view:GameSceneView;
        private bgAry:Array<Image>;
        private bgHight:number;
        private BG_MOVE_SPEED:number = 2;

        constructor(){
           super();
        }
        
        public onInit():void
        {
            this.view = this._viewCenter.getView(GameSceneView); 
            
        }

        public onShow():void{     
            this.view.closeBtn.clickHandler = laya.utils.Handler.create(this,this.onClick);

            this.bgHight = this.view.bg.height;
            this.bgAry = new Array<Image>();
            this.bgAry.push(new Image(),new Image());
            this.creatBg();
            this.startMoveBg();
            this.masterDataInit();

            manager.BattleLogicManager.instance.initBattleLogic();
        }
        /*玩家数据初始化*/
        private masterDataInit():void{
            manager.LayerManager.instance.addToLayer(this.view.life,LAYER.POP);
            this.view.life.text = "生命值:" + master.Master.instance.life;
        }

        public dispose():void{
            this.bgAry.forEach(function (element:Sprite){
                element = null;
            });
            this.bgAry.slice(0,this.bgAry.length);
            this.bgAry = null;

            Laya.timer.clear(this,this.moveBg);
            this.view = null;
            super.dispose();
        }

        private startMoveBg(){
            Laya.timer.frameLoop(1,this,this.moveBg);
        }

        private onClick():void{
             manager.LayerManager.instance.removeFromLayer(this.view.life,LAYER.POP);
            manager.BattleLogicManager.instance.uninitBattleLogic();
            UICenter.instance.closeUI(UI.GameScene);
            UICenter.instance.openUI(UI.Main);
            
        }

        private moveBg():void{
            for(var i:number = 0; i<this.bgAry.length; i++){
                this.bgAry[i].y += this.BG_MOVE_SPEED;
                if(this.bgAry[i].y >= this.bgHight){
                    this.bgAry[i].y = -this.bgHight;
                }
            }
            this.view.life.text = "生命值:" + master.Master.instance.life;
        }

        private creatBg():void
        {           
            for(var i:number = 0; i<this.bgAry.length; i++)
            {
                this.bgAry[i].skin = this.view.bg.skin;
                this.bgAry[i].y = -i * this.bgHight;
                this.view.addChild(this.bgAry[i]);
            }

            this.view.removeChild(this.view.bg);
        }
    }
}