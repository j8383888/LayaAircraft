
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.GameScene {
    export class GameSceneUI extends View {
		public bg:Laya.Image;
		public closeBtn:Laya.Button;
		public life:laya.display.Text;

        public static  uiView:any ={"type":"View","props":{"width":480,"height":800},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg","skin":"GameScene/img_systemimg.png"}},{"type":"Button","props":{"y":7,"x":446,"var":"closeBtn","skin":"comp/btn_close.png","rotation":0}},{"type":"Text","props":{"y":9,"x":216,"width":77,"var":"life","text":"415646","height":29,"fontSize":20,"font":"Arial","color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.GameScene.GameSceneUI.uiView);

        }

    }
}

module ui.Main {
    export class MainUI extends View {
		public btnStart:Laya.Button;
		public aircraftAni:Laya.Animation;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":480,"height":800},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"Main/back_of_about.jpg"}},{"type":"Image","props":{"y":6,"x":16,"skin":"Main/img_main_logo.png"}},{"type":"Button","props":{"y":567,"x":145,"var":"btnStart","stateNum":1,"skin":"Main/btn_main_Btn_pressed8.png"}},{"type":"Animation","props":{"y":369,"x":216,"var":"aircraftAni","source":"Main/Aircraft.ani"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Main.MainUI.uiView);

        }

    }
}
