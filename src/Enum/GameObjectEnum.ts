/**游戏物体类型 */
const enum GAME_OBJ_TYPE{
    BULLET,
    PANEL,
    STONE,
    BURST
}

/*子弹类型枚举*/
const enum BULLET_KIND{
    BULLET_KIND_0,
    BULLET_KIND_1,
    BULLET_KIND_2,
    BULLET_KIND_3,
    BULLET_KIND_4,
    BULLET_KIND_5
}

/*飞机种类枚举*/
const enum PANEL_KIND{
    PANEL_KIND_0,
    PANEL_KIND_1,
    PANEL_KIND_2
}

/*陨石种类枚举*/
const enum STONE_KIND{

}

/*游戏物体状态1-100为通用状态，101开始为自定义状态*/
const enum COMMON_STATUS{
    ALIVE,
    DIE    
}

/*自定义玩MASTER机状态 枚举*/
const enum MASTER_STATUS{
    FIRE = 100
}

/*自定义ENEMY_SINGLE飞机状态 枚举*/
const enum ENEMY_SINGLE_STATUS{
    FIRE = 100
}

class GameObjectEnum
{
    public enumDic:Dictionary = new Dictionary();
    private BULLET:string = "bullet";
    private PANEL:string = "panel";
    private STONE:string = "stone";
    private static _instance:GameObjectEnum;

    constructor(){
        this.enumDic.set(GAME_OBJ_TYPE.BULLET,this.BULLET);
        this.enumDic.set(GAME_OBJ_TYPE.PANEL,this.PANEL);
        this.enumDic.set(GAME_OBJ_TYPE.STONE,this.STONE);
    }

    public static get instance():GameObjectEnum
    {
        if(this._instance == null)
        {
           this._instance = new GameObjectEnum();
        }
        return this._instance;
    }
}

