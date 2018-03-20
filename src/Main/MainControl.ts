/*
* name;
*/
module commonUI{
    export class MainControl extends BaseUIControl{
        constructor(){
           super();
        }

        public onShow():void
        {
            var view:MainView = this._viewCenter.getView(MainView);
            view.btnStart.clickHandler = laya.utils.Handler.create(null,this.onClick);
            view.aircraftAni.play(0,true);
        }

        private onClick(e:MouseEvent):void
        {
            UICenter.instance.closeUI(UI.Main);
            UICenter.instance.openUI(UI.GameScene);
        }
    }
}